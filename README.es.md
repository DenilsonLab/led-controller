# LED SYNC - YouTube Music Controller (Espanol)

Read this in English: see `README.md`.

Aplicacion web de un solo archivo (`index.html`) para sincronizar una tira/controlador LED Bluetooth con el audio de una pestana de YouTube en tiempo real.

## Que hace

- Se conecta por Web Bluetooth a controladores LED BLE comunes.
- Captura audio del navegador con `getDisplayMedia` (compartir pestana con audio).
- Analiza espectro de frecuencias con Web Audio API (FFT).
- Convierte energia de bandas de frecuencia a color RGB en distintos modos.
- Envia comandos al LED con limitacion de tasa para no saturar BLE.
- Incluye panel de diagnostico para probar formatos de comandos hex.

## Requisitos

- Google Chrome (recomendado).
- Sitio servido en HTTPS (o contexto seguro equivalente).
- Dispositivo con Bluetooth compatible.
- Controlador LED BLE soportado por alguno de los protocolos incluidos.

## Inicio rapido

1. Abri `index.html` en un entorno HTTPS.
2. En **01 - Conexion**, hace clic en **Auto-conectar LED**.
3. Selecciona tu dispositivo BLE en el dialogo del navegador.
4. Hace clic en **Capturar Audio**.
5. En el selector de pantalla, elegi la pestana de YouTube y activa compartir audio.
6. Reproduce musica y elige modo de color.

## Modos de color

- `Spectrum`: mapea graves/medios/agudos a R/G/B.
- `Beat`: detecta golpes y hace flashes cromaticos.
- `Hue cycle`: rota el tono segun energia/bass.
- `Ambient`: color suave segun calidez y energia general.

## Ajustes

- **Sensibilidad**: multiplica la respuesta del color al audio.
- **Brillo max**: limita salida global RGB.
- **Suavizado**: ajusta `smoothingTimeConstant` del analizador.
- **Umbral beat**: define cuan fuerte debe ser un golpe para detectarlo.

Tambien podes fijar color manual con el selector y enviar ese color directo al LED.

## Protocolos BLE incluidos

Auto-descubrimiento sobre estos perfiles:

- Magic Blue / LED LAMP (`FFF0 + FFF3`)
- ELK-BLEDOM (`FFF0 + FFF3`)
- Triones / Happy Lighting (`FFD0 + FFD9`)
- LEDBLE (`FFE0 + FFE1`)
- SP110E (`FFE5 + FFE9`)
- BLE UART Nordic NUS TX

## Diagnostico integrado

Si el LED no responde, usa la tarjeta **Diagnostico - Encontrar comando correcto**:

- Prueba cada formato para enviar rojo puro.
- Observa el LED y el comando hex mostrado.
- Si funciona uno, ya sabes el formato compatible con tu controlador.
- Tambien puedes enviar bytes custom en hexadecimal.

## Solucion de problemas

- **No aparece Bluetooth**
  - Verifica Chrome + HTTPS.
  - Asegura permisos de Bluetooth en el sistema.

- **Conecta BLE pero no cambia color**
  - Usa el panel de diagnostico y prueba formatos manuales.
  - Revisa que el dispositivo seleccionado sea el controlador correcto.

- **No captura audio**
  - Debes compartir una pestana (no solo ventana) y activar audio.
  - Si se corta la captura, vuelve a iniciar desde **Capturar Audio**.

- **No hay reaccion o reacciona lento**
  - Sube sensibilidad.
  - Baja suavizado.
  - Verifica que la musica tenga energia en graves/medios.

## Limitaciones conocidas

- Depende de APIs de navegador no disponibles en todos los entornos.
- El soporte BLE varia segun firmware del controlador LED.
- No persiste configuracion entre recargas.
- Es una app cliente sin backend ni almacenamiento.

## Archivo principal

- `index.html`: contiene estilos, interfaz y toda la logica JavaScript.
