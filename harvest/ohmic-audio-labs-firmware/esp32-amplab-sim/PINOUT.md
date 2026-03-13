# Ohmic AmpLab — ESP32-S3 Pin Reference

Two pinouts are maintained:
- **Protoboard** — ESP32-S3-DevKitC-1-N16R8, matches current `[env:esp32s3_n16r8]` firmware flags
- **Production PCB** — Custom board design target, all node types

---

## Hard Rules (both boards)

| Rule | Detail |
|------|--------|
| GPIO 26–37 **RESERVED** | Octal flash (26–32) + OPI PSRAM (33–37) on N16R8 — physically inaccessible |
| GPIO 19 = USB D− | Available as GPIO if USB host not used |
| GPIO 20 = USB D+ | Available as GPIO if USB host not used |
| GPIO 45 = VDD_SPI strapping | Usable post-boot; pull-down resistor required |
| GPIO 46 = ROM msgs strapping | Usable post-boot; pull-down resistor required |
| GPIO 43 = UART0 TX | Reserved for serial monitor on all dev builds |
| GPIO 44 = UART0 RX | Reserved for serial monitor on all dev builds |
| GPIO 0 = BOOT button | Strapping — do not drive HIGH at power-on |
| GPIO 3 = JTAG_SEL | Strapping — avoid for driven outputs |

---

## Protoboard — ESP32-S3-DevKitC-1-N16R8

> Matches `[env:esp32s3_n16r8]` in platformio.ini.
> Verify these against your physical wiring before flashing.

### Display — GC9A01 (SPI2)

| Signal  | GPIO | Wire colour / note                       |
|---------|------|------------------------------------------|
| SCLK    | 14   |                                          |
| MOSI    | 15   |                                          |
| CS      | 5    |                                          |
| DC      | 6    |                                          |
| RST     | 12   |                                          |
| BL      | —    | Tied to 3.3V directly on module          |

### RGB LED (onboard WS2812)

| Signal   | GPIO |
|----------|------|
| NEOPIXEL | 48   |

> GPIO 48 is the DevKitC-1 onboard LED. Do not wire an external device here on the protoboard.

### DSP — ADAU1701 (I2C, Wire bus 0)

| Signal     | GPIO | Note                          |
|------------|------|-------------------------------|
| SDA        | 8    |                               |
| SCL        | 9    |                               |
| I2C addr   | 0x34 | ADDR0=GND, ADDR1=GND          |
| SELFBOOT   | —    | Tie LOW for I2C boot (no EEPROM) |

> ADAU1701 RESET and INT are not wired on the protoboard — pulled externally.

### CAN — TJA1050 or SN65HVD230 (TWAI)

| Signal  | GPIO | Note                                 |
|---------|------|--------------------------------------|
| TX      | 38   | To transceiver TXD pin               |
| RX      | 39   | From transceiver RXD pin             |

> GPIO 20/21 NOT used for CAN on this board — 20 reserved for USB-OTG, 21 reserved for AD7606 CONVST.
> Transceiver required — bare GPIO to CAN bus will not work.

### AD7606 — 8ch 16-bit ADC (SPI3) — **not yet wired on protoboard**

| Signal        | GPIO | AD7606 pin |
|---------------|------|------------|
| SCLK          | 17   | SCLK       |
| MISO (DOUTA)  | 16   | DOUTA      |
| CS            | 18   | /CS        |
| CONVST        | 21   | /CONVSTAB  |
| BUSY          | 47   | BUSY       |
| RESET         | 22   | RESET      |

> RESET moved to GPIO 22 on protoboard (GPIO 48 is occupied by RGB LED).
> SER/PAR pin on AD7606 module: tie HIGH for SPI mode.

### Shunt Module EEPROMs — AT24C32 (I2C, Wire bus 1) — **not yet wired**

| Signal | GPIO | Note                                 |
|--------|------|--------------------------------------|
| SDA    | 1    | Wire1 instance                       |
| SCL    | 2    | Wire1 instance                       |

> Addresses 0x50–0x53 for slots 0–3.

### Currently free on protoboard

```
GPIO 0  (boot button — do not drive)
GPIO 6, 7
GPIO 10, 11, 13
GPIO 23, 24, 25
GPIO 40, 41, 42
GPIO 45, 46  (strapping — post-boot only)
```

---

## Production PCB

> Custom board. All node types share this pin map.
> Populate only the peripherals relevant to each node variant.

### Fixed (all nodes)

| Function   | GPIO | Note                                    |
|------------|------|-----------------------------------------|
| CAN TX     | 21   |                                         |
| CAN RX     | 20   | OR GPIO 2 on USB-host-capable nodes     |
| I2C SDA    | 18   | Shared bus (ADAU1701 addr 0x34, shunts 0x50–0x53) |
| I2C SCL    | 19   | OR GPIO 6/7 on USB-host-capable nodes  |
| SYNC_IN    | 23   | Sample sync pulse between nodes         |
| NEOPIXEL   | 5    | Status WS2812                           |

### Display — GC9A01 (SPI2)

| Signal | GPIO |
|--------|------|
| SCLK   | 14   |
| MOSI   | 15   |
| CS     | 16   |
| DC     | 17   |
| RST    | 1    |
| BL     | 4    |

### Audio DSP — ADAU1701 (I2S + I2C control)

| Function     | GPIO | Note                                         |
|--------------|------|----------------------------------------------|
| I2S BCLK     | 6    | Moved off GPIO 45 (strapping)                |
| I2S LRCLK    | 7    | Moved off GPIO 46 (strapping)                |
| I2S DOUT     | 47   | ESP32 → DSP                                  |
| I2S DIN      | 48   | DSP → ESP32                                  |
| DSP RESET    | 22   |                                              |
| DSP INT/IRQ  | 24   |                                              |
| DSP SELFBOOT | 25   | Tie LOW = I2C boot, HIGH = EEPROM self-boot  |
| I2C SDA      | 18   | Shared with fixed I2C bus                    |
| I2C SCL      | 19   | Shared with fixed I2C bus                    |

### AD7606 — 8ch 16-bit ADC (SPI3, SPI mode)

| Signal        | GPIO | AD7606 pin  |
|---------------|------|-------------|
| SCLK          | 12   | SCLK        |
| MISO (DOUTA)  | 13   | DOUTA       |
| CS            | 11   | /CS         |
| CONVST        | 8    | /CONVSTAB   |
| BUSY          | 9    | BUSY        |
| RESET         | 10   | RESET       |

> SER/PAR: tie HIGH for SPI mode.
> RANGE: tie GND for ±10V input range.
> OS[0:2]: tie GND for no oversampling.

### SD Card (SPI)

| Signal  | GPIO |
|---------|------|
| SCLK    | 40   |
| MOSI    | 41   |
| MISO    | 42   |
| CS      | 44   |

> GPIO 43 = UART TX, not used here.

### User Interface

| Function    | GPIO | Note                            |
|-------------|------|---------------------------------|
| BTN1        | 0    | Pull-up, active LOW             |
| BTN2        | 2    | Pull-up, active LOW             |
| ENC_A       | 38   |                                 |
| ENC_B       | 39   |                                 |
| ENC_SW      | 3    | Strapping — pull-down, post-boot only |

### Node Variants

| Node            | Populate                          | CAN RX | I2C/USB note                  |
|-----------------|-----------------------------------|--------|-------------------------------|
| AmpLab          | AD7606 + shunts + display         | GPIO 20 | I2C on 18/19                 |
| DSP Controller  | ADAU1701 + I2S + display          | GPIO 20 | I2C on 18/19                 |
| RTA Node        | I2S ADC + display                 | GPIO 20 | I2C on 18/19                 |
| USB Mic Node    | USB-A host port + display         | GPIO 2  | USB on 19/20; I2C → 6/7      |
| Bare Sensor     | Nothing — WS hub forwarding only  | GPIO 20 | I2C on 18/19                 |

### Free on production PCB

```
GPIO 7  (if I2S not used)
GPIO 23 (SYNC_IN — doubles as free if sync unused)
GPIO 45, 46  (strapping — post-boot, with pull-downs)
GPIO 47, 48  (if I2S DIN not used / no second I2S)
```

---

## Firmware Env vs Pinout Cross-Reference

| Env | Board | Display CS/DC | DSP I2C | CAN TX/RX | ADC |
|-----|-------|--------------|---------|-----------|-----|
| `esp32s3_n16r8` | DevKitC-1 N16R8 (proto) | 5 / 6 | 8 / 9 | 38 / 39 | SPI 17/16/18 |
| `dsp_ctrl` | DevKitC-1 N16R8 | 5 / 4 | 8 / 9 | 20 / 21 | — |
| Production PCB | Custom | 16 / 17 | 18 / 19 | 21 / 20 | SPI 12/13/11 |
