# Documentacion Tecnica - LED SYNC

Read this in English: see `DOCUMENTATION.md`.

## 1. Vision general

`index.html` implementa una aplicacion web monolitica (HTML + CSS + JS) para convertir audio de YouTube en color RGB y enviarlo en tiempo real a un controlador LED por BLE.

La arquitectura se divide en 5 bloques:

1. **UI/UX**: tarjetas, controles, visualizador y logs.
2. **BLE**: descubrimiento de protocolo, conexion GATT y envio de comandos.
3. **Audio**: captura de tab, `AudioContext`, `AnalyserNode`.
4. **Motor de color**: calculo RGB por modo en cada tick.
5. **Diagnostico**: prueba de formatos de comando hex para controladores no estandar.

---

## 2. Flujo end-to-end

1. Usuario conecta BLE (`connectBLE`).
2. App prueba servicios/caracteristicas definidos en `PROTOCOLS`.
3. Usuario captura audio (`captureAudio`) usando `getDisplayMedia`.
4. `setupAnalyser` crea `AnalyserNode` (FFT 2048).
5. Worker dispara ticks cada 50 ms y ejecuta `animate`.
6. `animate`:
   - lee bins de frecuencia;
   - calcula bandas energeticas;
   - detecta beat (si aplica);
   - genera RGB segun modo;
   - actualiza UI y canvas;
   - envia color por BLE (throttle ~80 ms).

---

## 3. Estructura de UI

Secciones principales en el DOM:

- **01 - Conexion** (`#card-connect`): estado BLE/audio y acciones de conexion.
- **02 - Espectro en tiempo real** (`#card-vis`): canvas, pico Hz y preview de color.
- **03 - Modo de color** (`#card-mode`): selector de 4 modos.
- **04 - Ajustes**: sliders y color manual.
- **Log** (`#log`): eventos y errores.
- **Diagnostico** (`#card-cmdtest`): prueba de paquetes hex.

Elementos visuales importantes:

- Variables CSS `--r --g --b` sincronizan tema, glow y swatch con color actual.
- `#beat-flash` aplica overlay breve al detectar beat.
- `#support-warn` alerta falta de soporte de APIs.

---

## 4. Estado global (JavaScript)

Variables de sesion relevantes:

- BLE: `bleDevice`, `bleChar`, `activeProtocol`.
- Audio: `audioCtx`, `analyser`, `sourceNode`.
- Render/timing: `animFrame`, `lastSendTime`, worker de metronomo.
- Configuracion: `mode`, `sensitivity`, `brightness`, `beatThreshold`.
- Beat: `beatHistory`, `beatIdx`, `lastBeatTime`.
- Color actual: `currentR`, `currentG`, `currentB`, `hueAngle`.

No existe persistencia en `localStorage`; toda configuracion vive en memoria.

---

## 5. BLE: conexion y envio

### 5.1 Descubrimiento de protocolo

`connectBLE()`:

- valida `navigator.bluetooth`.
- solicita dispositivo con `acceptAllDevices: true` y `optionalServices` unicos de `PROTOCOLS`.
- conecta GATT y prueba cada entrada de `PROTOCOLS` hasta encontrar service+characteristic validos.
- guarda `bleChar` y `activeProtocol` cuando hay match.

`PROTOCOLS` define por entrada:

- `name`
- `service` UUID
- `char` UUID
- `cmd(r,g,b)` -> `Uint8Array`

### 5.2 Envio de color

`sendColor(r,g,b,withResponse=false)`:

- clampa valores a `[0..255]`.
- construye payload con `activeProtocol.cmd`.
- intenta `writeValueWithoutResponse` para menor latencia.
- hace fallback a `writeValue` si el firmware no soporta escritura sin respuesta.

### 5.3 Desconexion

Listener `gattserverdisconnected`:

- limpia referencia de caracteristica.
- actualiza estado visual y log.

---

## 6. Audio: captura y analisis FFT

### 6.1 Captura

`captureAudio()` usa `navigator.mediaDevices.getDisplayMedia` con audio habilitado.

Comportamientos:

- si no hay `audioTracks`, notifica error y detiene tracks.
- detiene video track (solo se necesita audio).
- inicia analizador y loop de animacion.
- registra evento `ended` en track para detener animacion si el usuario corta captura.

### 6.2 Configuracion del analizador

`setupAnalyser(stream)`:

- recrea `AudioContext` si ya existia.
- crea `AnalyserNode` con `fftSize = 2048`.
- setea `smoothingTimeConstant = 0.75` (ajustable por slider).
- conecta `MediaStreamSource -> AnalyserNode`.

---

## 7. Motor de color y beat detection

### 7.1 Ticker

Se crea un Worker inline (`workerCode`) que envia `tick` cada 50 ms (~20 FPS).

Ventajas:

- clock mas estable que depender de intervalos del main thread.
- separa temporizacion del render de UI.

### 7.2 Calculo por frame (`animate`)

Pasos:

1. `getByteFrequencyData` -> array espectral.
2. calcula bandas por promedio (`avg`) en rangos de bins.
3. calcula frecuencia dominante (`peakHz`) con maximo de amplitud.
4. genera RGB por modo.
5. aplica `brightness`.
6. actualiza CSS/labels (`updateColorUI`).
7. envia BLE cada >80 ms (aprox 12.5 FPS).
8. dibuja barras del espectro (`drawSpectrum`).

### 7.3 Modos

- `spectrum`: mezcla bandas bajas/medias/altas a R/G/B.
- `beat`: `detectBeat(bass)` contra promedio historico y umbral dinamico.
- `hue`: rota tono HSL segun bass + energia total.
- `ambient`: estima calidez (`bass/(treble+10)`) y energia para color suave.

### 7.4 Beat detection

`detectBeat` usa:

- buffer circular `beatHistory` (43 muestras).
- condicion: `bassEnergy > avg * beatThreshold`, `bassEnergy > 30`, cooldown > 200 ms.
- en beat: dispara `flashBeat()` y actualiza `lastBeatTime`.

---

## 8. Render de espectro

`drawSpectrum(data,r,g,b)`:

- adapta canvas a `devicePixelRatio`.
- dibuja 80 barras con gradiente vertical basado en color actual.
- agrega highlight superior para barras con energia visible.

Nota: usa `ctx.roundRect`, por lo que requiere soporte moderno de Canvas 2D.

---

## 9. Diagnostico de comandos

`CMD_FORMATS` define formatos alternativos para prueba manual.

Flujo:

- `buildCmdTester` crea botones dinamicamente.
- `testCmdFormat` envia rojo (`255,0,0`) en el formato seleccionado.
- `sendRawBytes` intenta escritura sin respuesta y fallback.
- `showCmdHex` refleja bytes enviados en UI.

Objetivo: identificar rapidamente el framing correcto para dispositivos no detectados por `PROTOCOLS`.

---

## 10. Helpers y utilidades

- `hslToRgb`: conversion HSL->RGB para modos dinamicos.
- `setBadge` y `setDot`: estado visual de conexion/captura.
- `log(type,msg)`: traza con timestamp en UI.
- `bandToHz`: traduce indice de bin a Hz segun `sampleRate/fftSize`.

---

## 11. Compatibilidad y precondiciones

APIs requeridas:

- `navigator.bluetooth` (Web Bluetooth).
- `window.isSecureContext` (HTTPS).
- `navigator.mediaDevices.getDisplayMedia`.
- Web Audio API (`AudioContext`, `AnalyserNode`).

El script ya hace chequeos en `window.load` y muestra advertencias en UI/log.

---

## 12. Riesgos tecnicos y mejoras sugeridas

1. **Cleanup de recursos**
   - cerrar `AudioContext` y detener tracks tambien al reconectar o al salir.

2. **Persistencia de ajustes**
   - guardar sliders, modo y ultimo protocolo valido en `localStorage`.

3. **Modularizacion**
   - separar CSS/JS en archivos y encapsular modulos (BLE, audio, render, UI).

4. **Manejo de errores**
   - normalizar mensajes segun tipo de excepcion BLE/audio.

5. **Selector de protocolo manual**
   - permitir fijar protocolo sin auto-scan para conexiones mas rapidas.

6. **Custom UUID real**
   - el texto de ayuda menciona custom UUID, pero no hay UI dedicada aun.

7. **Accesibilidad/UX**
   - atajos de teclado, foco visible, labels ARIA, estados de carga.

---

## 13. Guia rapida para extender protocolos

Para agregar un controlador nuevo:

1. Obtener UUID de servicio y caracteristica (por ejemplo, con nRF Connect).
2. Agregar entrada en `PROTOCOLS` con `name`, `service`, `char` y `cmd(r,g,b)`.
3. Probar conexion con `Auto-conectar LED`.
4. Validar respuesta con color manual y diagnostico hex.

Ejemplo base:

```js
{
  name: 'Mi Controlador',
  service: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  char:    'yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy',
  cmd: (r,g,b) => new Uint8Array([/* bytes */])
}
```

---

## 14. Referencia de archivos

- `index.html`: implementacion completa de app, estilos y logica.
- `README.md`: guia funcional para usuario final.
- `DOCUMENTACION.md`: este documento tecnico.
