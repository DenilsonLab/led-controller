# Technical Documentation - LED SYNC

Read this in Spanish: see `DOCUMENTACION.md`.

## 1. Overview

`index.html` is a monolithic web app (HTML + CSS + JS) that converts YouTube tab audio into RGB values and streams them in real time to a BLE LED controller.

Main architecture blocks:

1. **UI/UX**: cards, controls, visualizer, and logs.
2. **BLE**: protocol discovery, GATT connection, command writing.
3. **Audio**: tab capture, `AudioContext`, `AnalyserNode`.
4. **Color engine**: per-tick RGB computation by mode.
5. **Diagnostics**: manual hex command tests for unsupported controllers.

## 2. End-to-end flow

1. User connects BLE (`connectBLE`).
2. App probes service/characteristic pairs from `PROTOCOLS`.
3. User captures audio (`captureAudio`) using `getDisplayMedia`.
4. `setupAnalyser` configures FFT (`fftSize = 2048`).
5. Worker triggers a tick every 50 ms and calls `animate`.
6. `animate` reads bins, computes bands, updates RGB, updates UI/canvas, and writes BLE color with throttling.

## 3. UI structure

Key sections:

- **01 - Connection** (`#card-connect`)
- **02 - Real-time spectrum** (`#card-vis`)
- **03 - Color mode** (`#card-mode`)
- **04 - Settings**
- **Log** (`#log`)
- **Diagnostics** (`#card-cmdtest`)

Important visual behavior:

- CSS variables `--r --g --b` drive glow/theme synchronization.
- `#beat-flash` renders a short beat overlay.
- `#support-warn` shows capability warnings.

## 4. Runtime state

- BLE: `bleDevice`, `bleChar`, `activeProtocol`
- Audio: `audioCtx`, `analyser`, `sourceNode`
- Timing: worker tick, `lastSendTime`
- Controls: `mode`, `sensitivity`, `brightness`, `beatThreshold`
- Beat tracking: `beatHistory`, `beatIdx`, `lastBeatTime`
- Color state: `currentR`, `currentG`, `currentB`, `hueAngle`

No persistent storage is used by default.

## 5. BLE layer

### 5.1 Protocol discovery

`connectBLE()`:

- validates Web Bluetooth support
- opens device chooser
- connects GATT server
- probes each protocol in `PROTOCOLS`
- stores successful `bleChar` + `activeProtocol`

Each protocol entry contains:

- `name`
- `service` UUID
- `char` UUID
- `cmd(r,g,b)` returning a `Uint8Array`

### 5.2 Color writing

`sendColor(r,g,b,withResponse=false)`:

- clamps values to `[0..255]`
- builds command payload from active protocol
- prefers `writeValueWithoutResponse`
- falls back to `writeValue` when unsupported

### 5.3 Disconnect handling

`gattserverdisconnected` clears characteristic state and updates status UI/log.

## 6. Audio layer

### 6.1 Capture

`captureAudio()` requests display media with audio enabled.

If no audio track is available, it logs an error and stops captured tracks.

### 6.2 Analyzer setup

`setupAnalyser(stream)`:

- recreates `AudioContext` if needed
- creates `AnalyserNode`
- sets `fftSize = 2048`
- sets `smoothingTimeConstant = 0.75` (user-adjustable)
- connects source to analyzer

## 7. Color engine and beat detection

### 7.1 Tick source

An inline Web Worker posts `tick` every 50 ms (~20 FPS).

### 7.2 Per-frame compute (`animate`)

1. Read frequency data (`getByteFrequencyData`).
2. Compute energy bands with `avg`.
3. Detect dominant frequency (`peakHz`).
4. Compute RGB based on mode.
5. Apply brightness scalar.
6. Update UI/CSS state.
7. Write BLE color every ~80 ms.
8. Draw spectrum bars.

### 7.3 Modes

- `spectrum`: maps bass/mids/treble to RGB.
- `beat`: thresholded beat detection with dynamic color flashes.
- `hue`: HSL hue rotation from bass/overall energy.
- `ambient`: smooth warmth/energy color mapping.

### 7.4 Beat logic

`detectBeat` compares current bass energy against moving average history, threshold multiplier, minimum energy, and cooldown.

## 8. Spectrum renderer

`drawSpectrum(data,r,g,b)`:

- scales canvas by `devicePixelRatio`
- draws 80 gradient bars from current LED color
- adds a top highlight for active bars

## 9. Command diagnostics

`CMD_FORMATS` defines candidate command packet structures.

Flow:

- `buildCmdTester` renders test buttons
- `testCmdFormat` sends pure red command
- `sendRawBytes` writes raw payload with fallback
- `showCmdHex` prints sent bytes in UI

## 10. Compatibility requirements

- Secure context (`HTTPS`)
- Web Bluetooth (`navigator.bluetooth`)
- Display capture (`getDisplayMedia`)
- Web Audio API (`AudioContext`, `AnalyserNode`)

## 11. Suggested improvements

1. Add stronger cleanup for tracks/audio context.
2. Persist user settings in `localStorage`.
3. Split monolithic file into modules.
4. Improve typed error handling and recovery.
5. Add manual protocol selection UI.
6. Add true custom UUID form (currently only messaging references it).
7. Extend accessibility and keyboard support.

## 12. File references

- `index.html`: complete application implementation.
- `README.md`: user-facing English guide.
- `README.es.md`: user-facing Spanish guide.
- `DOCUMENTATION.md`: this English technical document.
- `DOCUMENTACION.md`: Spanish technical document.
