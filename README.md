# LED SYNC - YouTube Music Controller

Read this in Spanish: see `README.es.md`.

Single-file web app (`index.html`) that syncs a Bluetooth LED strip/controller with YouTube tab audio in real time.

## What it does

- Connects to common BLE LED controllers through Web Bluetooth.
- Captures browser audio using `getDisplayMedia` (tab sharing with audio).
- Analyzes frequency spectrum using Web Audio API (FFT).
- Maps band energy to RGB colors across multiple modes.
- Sends LED commands with rate limiting to avoid BLE saturation.
- Includes a diagnostic panel to test raw hex command formats.

## Requirements

- Google Chrome (recommended).
- HTTPS hosting (or another secure context).
- Bluetooth-capable device.
- BLE LED controller compatible with one of the included protocols.

## Quick start

1. Open `index.html` in an HTTPS context.
2. In **01 - Connection**, click **Auto-connect LED**.
3. Pick your BLE device in the browser dialog.
4. Click **Capture Audio**.
5. In the share dialog, choose the YouTube tab and enable tab audio sharing.
6. Play music and select a color mode.

## Color modes

- `Spectrum`: maps bass/mids/treble to R/G/B.
- `Beat`: detects kicks and flashes dynamic colors.
- `Hue cycle`: rotates hue based on bass/energy.
- `Ambient`: smooth color response based on warmth and total energy.

## Controls

- **Sensitivity**: scales color response to audio energy.
- **Max brightness**: limits global RGB output.
- **Smoothing**: adjusts analyzer `smoothingTimeConstant`.
- **Beat threshold**: sets how strong a beat must be to trigger.

You can also pick a fixed manual color and send it directly to the LED.

## Included BLE protocols

Auto-discovery attempts these profiles:

- Magic Blue / LED LAMP (`FFF0 + FFF3`)
- ELK-BLEDOM (`FFF0 + FFF3`)
- Triones / Happy Lighting (`FFD0 + FFD9`)
- LEDBLE (`FFE0 + FFE1`)
- SP110E (`FFE5 + FFE9`)
- BLE UART Nordic NUS TX

## Built-in diagnostics

If your LED does not react, use **Diagnostics - Find correct command**:

- Test each format by sending pure red.
- Check LED response and the hex payload shown.
- If one works, you found your controller format.
- You can also send custom bytes in hexadecimal.

## Troubleshooting

- **Bluetooth is not available**
  - Use Chrome + HTTPS.
  - Check system-level Bluetooth permissions.

- **BLE connects but color does not change**
  - Use the diagnostics panel and test manual formats.
  - Confirm you selected the right controller.

- **No audio captured**
  - Share a browser tab (not only a window) and enable audio.
  - If capture stops, start again with **Capture Audio**.

- **Slow or weak response**
  - Increase sensitivity.
  - Reduce smoothing.
  - Use audio content with stronger bass/mid energy.

## Known limitations

- Depends on browser APIs not available in every environment.
- BLE support varies by controller firmware.
- Settings are not persisted across page reloads.
- Client-only app (no backend, no storage).

## Main file

- `index.html`: contains all styles, UI, and JavaScript logic.
