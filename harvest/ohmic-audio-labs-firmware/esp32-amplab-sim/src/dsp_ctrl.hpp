#pragma once
// ─────────────────────────────────────────────────────────────────────────────
// dsp_ctrl.hpp — ADAU1701 DSP preset manager + HTTP API
//
// Provides:
//  - Up to 8 named preset slots (stored in NVS)
//  - Active preset index, recall, and push-to-DSP
//  - HTTP REST routes:  GET /dsp/info  GET /dsp/presets  POST /dsp/preset
//  - WebSocket broadcast on preset change (uses same AsyncWS server as AmpLab)
//
// Only compiled when DEVICE_DSP_CTRL=1.
// ─────────────────────────────────────────────────────────────────────────────

#ifndef DSP_CTRL_HPP
#define DSP_CTRL_HPP

#ifdef DEVICE_DSP_CTRL

#include <Arduino.h>
#include <Preferences.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include "adau1701.hpp"

static constexpr uint8_t DSP_MAX_PRESETS     = 8;
static constexpr uint8_t DSP_PRESET_NAME_LEN = 24;

struct DspPreset {
    char    name[DSP_PRESET_NAME_LEN];  // user-visible label
    uint8_t index;                       // 0-based slot number
    bool    active;
};

class DspCtrl {
public:
    explicit DspCtrl(Adau1701& dsp) : _dsp(dsp) {}

    // Call once in setup — reads NVS, inits ADAU1701, registers HTTP routes.
    void begin(AsyncWebServer& server, AsyncWebSocket* ws = nullptr);

    // Load and apply a preset by slot index (0–DSP_MAX_PRESETS-1).
    bool activatePreset(uint8_t slot);

    // Return active slot index.
    uint8_t activePreset() const { return _activeSlot; }

    // Rename a preset slot.
    void renamePreset(uint8_t slot, const char* name);

    // Fill JSON object with current status (for /dsp/info).
    void statusJson(JsonObject& obj) const;

    // Dump all preset names to JSON array (for /dsp/presets).
    void presetsJson(JsonArray& arr) const;

    // Return true if ADAU1701 was detected on the bus.
    bool dspDetected() const { return _detected; }

private:
    Adau1701&       _dsp;
    AsyncWebSocket* _ws      = nullptr;
    uint8_t         _activeSlot = 0;
    bool            _detected   = false;
    DspPreset       _presets[DSP_MAX_PRESETS];

    void _loadFromNvs();
    void _saveToNvs();
    void _broadcastStatus();
    void _registerRoutes(AsyncWebServer& server);
};

#endif  // DEVICE_DSP_CTRL
#endif  // DSP_CTRL_HPP
