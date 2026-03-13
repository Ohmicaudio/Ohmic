#ifdef DEVICE_DSP_CTRL

#include "dsp_ctrl.hpp"

static const char* NVS_NS         = "dsp_ctrl";
static const char* NVS_ACTIVE     = "active";
static const char* NVS_NAME_FMT   = "name%d";  // name0 … name7

// ─── Default preset names ────────────────────────────────────────────────────
static const char* kDefaultNames[DSP_MAX_PRESETS] = {
    "Flat",
    "Bass Boost",
    "Vocal Clarity",
    "Stage",
    "Preset 5",
    "Preset 6",
    "Preset 7",
    "Preset 8",
};

// ─────────────────────────────────────────────────────────────────────────────

void DspCtrl::begin(AsyncWebServer& server, AsyncWebSocket* ws) {
    _ws = ws;

    // Initialise presets array with defaults
    for (uint8_t i = 0; i < DSP_MAX_PRESETS; i++) {
        _presets[i].index  = i;
        _presets[i].active = false;
        strlcpy(_presets[i].name, kDefaultNames[i], DSP_PRESET_NAME_LEN);
    }

    _loadFromNvs();

    // Probe chip
    _detected = _dsp.detect();
    if (_detected) {
        Serial.printf("[DSP] ADAU1701 detected at 0x%02X\n", _dsp.address());
        // The main SigmaStudio init array is injected via dsp_program.h (generated
        // by SigmaStudio export).  If present, replay it now.
        // #include "dsp_program.h"
        // _dsp.initFromArray(dsp_program_data, sizeof(dsp_program_data));
    } else {
        Serial.printf("[DSP] ADAU1701 NOT found at 0x%02X (wire err %d)\n",
                      _dsp.address(), _dsp.lastWireError());
    }

    _presets[_activeSlot].active = true;
    _registerRoutes(server);
    Serial.printf("[DSP] DspCtrl ready — active preset: %d (%s)\n",
                  _activeSlot, _presets[_activeSlot].name);
}

bool DspCtrl::activatePreset(uint8_t slot) {
    if (slot >= DSP_MAX_PRESETS) return false;
    _presets[_activeSlot].active = false;
    _activeSlot = slot;
    _presets[_activeSlot].active = true;
    _saveToNvs();

    // TODO: write preset-specific parameter block to ADAU1701 via safeload.
    // When SigmaStudio exports per-preset param arrays, call:
    //   _dsp.writeParam(addr, value);  for each changed param.
    Serial.printf("[DSP] Preset activated: %d (%s)\n", slot, _presets[slot].name);
    _broadcastStatus();
    return true;
}

void DspCtrl::renamePreset(uint8_t slot, const char* name) {
    if (slot >= DSP_MAX_PRESETS || !name) return;
    strlcpy(_presets[slot].name, name, DSP_PRESET_NAME_LEN);
    _saveToNvs();
}

void DspCtrl::statusJson(JsonObject& obj) const {
    obj["detected"]      = _detected;
    obj["i2c_addr"]      = _dsp.address();
    obj["active_preset"] = _activeSlot;
    obj["active_name"]   = _presets[_activeSlot].name;
    obj["max_presets"]   = DSP_MAX_PRESETS;
}

void DspCtrl::presetsJson(JsonArray& arr) const {
    for (uint8_t i = 0; i < DSP_MAX_PRESETS; i++) {
        JsonObject p = arr.add<JsonObject>();
        p["index"]  = i;
        p["name"]   = _presets[i].name;
        p["active"] = _presets[i].active;
    }
}

// ─── Private ─────────────────────────────────────────────────────────────────

void DspCtrl::_loadFromNvs() {
    Preferences prefs;
    prefs.begin(NVS_NS, true);  // read-only
    _activeSlot = prefs.getUChar(NVS_ACTIVE, 0);
    if (_activeSlot >= DSP_MAX_PRESETS) _activeSlot = 0;
    char key[8];
    for (uint8_t i = 0; i < DSP_MAX_PRESETS; i++) {
        snprintf(key, sizeof(key), NVS_NAME_FMT, i);
        String n = prefs.getString(key, "");
        if (n.length() > 0) {
            strlcpy(_presets[i].name, n.c_str(), DSP_PRESET_NAME_LEN);
        }
    }
    prefs.end();
}

void DspCtrl::_saveToNvs() {
    Preferences prefs;
    prefs.begin(NVS_NS, false);  // read-write
    prefs.putUChar(NVS_ACTIVE, _activeSlot);
    char key[8];
    for (uint8_t i = 0; i < DSP_MAX_PRESETS; i++) {
        snprintf(key, sizeof(key), NVS_NAME_FMT, i);
        prefs.putString(key, _presets[i].name);
    }
    prefs.end();
}

void DspCtrl::_broadcastStatus() {
    if (!_ws) return;
    JsonDocument doc;
    doc["type"] = "dsp_preset";
    doc["slot"] = _activeSlot;
    doc["name"] = _presets[_activeSlot].name;
    char buf[128];
    serializeJson(doc, buf, sizeof(buf));
    _ws->textAll(buf);
}

void DspCtrl::_registerRoutes(AsyncWebServer& server) {
    // GET /dsp/info
    server.on("/dsp/info", HTTP_GET, [this](AsyncWebServerRequest* req) {
        JsonDocument doc;
        JsonObject obj = doc.to<JsonObject>();
        statusJson(obj);
        String out;
        serializeJson(doc, out);
        req->send(200, "application/json", out);
    });

    // GET /dsp/presets
    server.on("/dsp/presets", HTTP_GET, [this](AsyncWebServerRequest* req) {
        JsonDocument doc;
        JsonArray arr = doc.to<JsonArray>();
        presetsJson(arr);
        String out;
        serializeJson(doc, out);
        req->send(200, "application/json", out);
    });

    // POST /dsp/preset  body: {"slot":0}  or {"slot":2,"name":"My Tune"}
    server.on("/dsp/preset", HTTP_POST,
        [](AsyncWebServerRequest* req) {},
        nullptr,
        [this](AsyncWebServerRequest* req, uint8_t* data, size_t len, size_t, size_t) {
            JsonDocument doc;
            DeserializationError err = deserializeJson(doc, data, len);
            if (err) {
                req->send(400, "application/json", "{\"error\":\"bad json\"}");
                return;
            }
            int slot = doc["slot"] | -1;
            if (slot < 0 || slot >= DSP_MAX_PRESETS) {
                req->send(400, "application/json", "{\"error\":\"invalid slot\"}");
                return;
            }
            const char* name = doc["name"] | (const char*)nullptr;
            if (name) renamePreset(static_cast<uint8_t>(slot), name);
            bool ok = activatePreset(static_cast<uint8_t>(slot));
            JsonDocument resp;
            resp["ok"]   = ok;
            resp["slot"] = _activeSlot;
            resp["name"] = _presets[_activeSlot].name;
            String out;
            serializeJson(resp, out);
            req->send(ok ? 200 : 500, "application/json", out);
        }
    );

    // POST /dsp/rename  body: {"slot":0,"name":"My Label"}
    server.on("/dsp/rename", HTTP_POST,
        [](AsyncWebServerRequest* req) {},
        nullptr,
        [this](AsyncWebServerRequest* req, uint8_t* data, size_t len, size_t, size_t) {
            JsonDocument doc;
            if (deserializeJson(doc, data, len)) {
                req->send(400, "application/json", "{\"error\":\"bad json\"}");
                return;
            }
            int slot = doc["slot"] | -1;
            const char* name = doc["name"] | (const char*)nullptr;
            if (slot < 0 || slot >= DSP_MAX_PRESETS || !name) {
                req->send(400, "application/json", "{\"error\":\"invalid args\"}");
                return;
            }
            renamePreset(static_cast<uint8_t>(slot), name);
            req->send(200, "application/json", "{\"ok\":true}");
        }
    );
}

#endif  // DEVICE_DSP_CTRL
