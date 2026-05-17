let currentLang = 'en';

const I18N = {
  en: {
    supportWarn: 'This app requires Chrome over HTTPS. Web Bluetooth and audio capture may be unavailable in this environment.',
    titleConnect: '01 - Connection',
    titleSpectrum: '02 - Real-time Spectrum',
    titleMode: '03 - Color Mode',
    titleSettings: '04 - Settings',
    titleDiagnostics: 'Diagnostics - Find correct command',
    statusDisconnected: 'Disconnected',
    labelLed: 'LED Strip (Bluetooth)',
    bleHelp: 'Tries 6 protocols automatically until one works.',
    labelAudio: 'YouTube Audio',
    audioHelp: 'Share the YouTube tab with audio enabled.',
    btnBleConnect: 'Auto-connect LED',
    btnBleReconnect: 'Reconnect',
    btnAudioCapture: 'Capture Audio',
    btnAudioRecapture: 'Recapture',
    step1: 'Connect LED -> browser will show nearby BT devices',
    step2: 'Capture Audio -> choose the YouTube tab -> enable tab audio sharing',
    step3: 'Select mode and press play on YouTube',
    idleText: 'Waiting for audio...',
    visLabel: 'FREQ SPECTRUM',
    peakPrefix: 'peak',
    modeNameSpectrum: 'Spectrum',
    modeNameBeat: 'Beat',
    modeNameHue: 'Hue cycle',
    modeNameAmbient: 'Ambient',
    descSpectrum: 'R=bass G=mids B=treble',
    descBeat: 'Flash on each kick beat',
    descHue: 'Color spin by BPM',
    descAmbient: 'Smooth color by energy',
    labelSens: 'Sensitivity',
    labelBright: 'Max Brightness',
    labelSmooth: 'Smoothing',
    labelBeat: 'Beat Threshold',
    manualTitle: 'Manual Control',
    manualLabel: 'Pick a fixed LED color',
    btnSend: 'Send',
    readyLog: '[ LED SYNC ] Ready. Connect your device and capture audio.',
    diagHelp: 'If LED does not respond, click each button one by one. When LED turns <strong style="color:#f87171;">red</strong>, that is the correct format.',
    sentHexTitle: 'Sent hex command',
    customHexDesc: 'Enter your own bytes',
    promptCustomHex: 'Enter hex bytes separated by spaces (example: 56 FF 00 00 00 F0 AA):',
    statusSearching: 'Searching...',
    statusNoProtocol: 'No protocol',
    statusLedConnected: 'LED Connected',
    statusError: 'Error',
    logBtUnavailable: 'Web Bluetooth unavailable. Use Chrome over HTTPS.',
    logOpenSelector: 'Opening BLE device selector...',
    logDeviceSelected: 'Selected device: "{name}"',
    logGattConnecting: 'Connecting to GATT server...',
    logGattConnected: 'GATT connected. Testing protocols...',
    logTestingProto: '  -> Testing: {name}',
    logNoProtocol1: 'No known protocol worked.',
    logNoProtocol2: 'Install "nRF Connect" on your phone and read device UUIDs.',
    logNoProtocol3: 'Then use the Custom UUID option below.',
    logProtocolFound: 'Protocol found: {name}',
    logLedDisconnected: 'LED disconnected.',
    logSelectionCancelled: 'Device selection cancelled.',
    logBleError: 'BLE Error: {msg}',
    logRequestCapture: 'Requesting screen capture with audio...',
    logNoAudioCaptured: 'No audio captured. Did you enable tab audio sharing?',
    logAudioCaptured: 'Audio captured: {label}',
    logCaptureStopped: 'Audio capture stopped by user.',
    logCaptureCancelled: 'Capture cancelled.',
    logAudioError: 'Audio Error: {msg}',
    logAudioContext: 'AudioContext: {state}, sampleRate: {rate}Hz',
    logManualColorSent: 'Manual color sent: rgb({r},{g},{b})',
    logConnectFirst: 'Connect LED first.',
    logTestingFmt: 'Testing "{label}": [{bytes}]',
    logSendBytesError: 'Error sending bytes: {msg}',
    logBtHttpsWarn: 'Web Bluetooth requires HTTPS. Host this file on GitHub Pages or similar.',
    logDisplayMediaWarn: 'getDisplayMedia unavailable in this context.',
    logBrowserChrome: 'Browser: {status}',
    browserChromeOk: 'Chrome detected',
    browserChromeWarn: 'Use Chrome'
  },
  es: {
    supportWarn: 'Este app requiere Chrome en HTTPS. Web Bluetooth y captura de audio pueden no estar disponibles en este entorno.',
    titleConnect: '01 - Conexion',
    titleSpectrum: '02 - Espectro en tiempo real',
    titleMode: '03 - Modo de color',
    titleSettings: '04 - Ajustes',
    titleDiagnostics: 'Diagnostico - Encontrar comando correcto',
    statusDisconnected: 'Desconectado',
    labelLed: 'Tira LED (Bluetooth)',
    bleHelp: 'Prueba automaticamente 6 protocolos hasta encontrar el correcto.',
    labelAudio: 'Audio de YouTube',
    audioHelp: 'Comparti la pestana de YouTube con audio activado.',
    btnBleConnect: 'Auto-conectar LED',
    btnBleReconnect: 'Reconectar',
    btnAudioCapture: 'Capturar Audio',
    btnAudioRecapture: 'Recapturar',
    step1: 'Conecta el LED -> el navegador mostrara dispositivos BT cercanos',
    step2: 'Capturar Audio -> elegi la pestana de YouTube -> activa compartir audio del tab',
    step3: 'Selecciona el modo y dale play en YouTube',
    idleText: 'Esperando audio...',
    visLabel: 'ESPECTRO DE FRECUENCIA',
    peakPrefix: 'pico',
    modeNameSpectrum: 'Espectro',
    modeNameBeat: 'Beat',
    modeNameHue: 'Ciclo de tono',
    modeNameAmbient: 'Ambiente',
    descSpectrum: 'R=graves G=medios B=agudos',
    descBeat: 'Flash en cada golpe de bombo',
    descHue: 'Giro de color por BPM',
    descAmbient: 'Color suave por energia',
    labelSens: 'Sensibilidad',
    labelBright: 'Brillo max',
    labelSmooth: 'Suavizado',
    labelBeat: 'Umbral beat',
    manualTitle: 'Control manual',
    manualLabel: 'Elegi un color fijo para el LED',
    btnSend: 'Enviar',
    readyLog: '[ LED SYNC ] Listo. Conecta el dispositivo y captura el audio.',
    diagHelp: 'Si el LED no responde, hace click en cada boton uno por uno. Cuando el LED cambie a <strong style="color:#f87171;">rojo</strong>, ese es el formato correcto.',
    sentHexTitle: 'Comando hex enviado',
    customHexDesc: 'Ingresa tus propios bytes',
    promptCustomHex: 'Ingresa los bytes en hex separados por espacios (ej: 56 FF 00 00 00 F0 AA):',
    statusSearching: 'Buscando...',
    statusNoProtocol: 'Sin protocolo',
    statusLedConnected: 'LED Conectado',
    statusError: 'Error',
    logBtUnavailable: 'Web Bluetooth no disponible. Necesitas Chrome en HTTPS.',
    logOpenSelector: 'Abriendo selector de dispositivos BLE...',
    logDeviceSelected: 'Dispositivo seleccionado: "{name}"',
    logGattConnecting: 'Conectando al servidor GATT...',
    logGattConnected: 'GATT conectado. Probando protocolos...',
    logTestingProto: '  -> Probando: {name}',
    logNoProtocol1: 'Ningun protocolo conocido funciono.',
    logNoProtocol2: 'Instala "nRF Connect" en el celular y lee los UUIDs del dispositivo.',
    logNoProtocol3: 'Luego usa la opcion Custom UUID mas abajo.',
    logProtocolFound: 'Protocolo encontrado: {name}',
    logLedDisconnected: 'LED desconectado.',
    logSelectionCancelled: 'Seleccion de dispositivo cancelada.',
    logBleError: 'BLE Error: {msg}',
    logRequestCapture: 'Solicitando captura de pantalla con audio...',
    logNoAudioCaptured: 'No se capturo audio. Activaste compartir audio del tab?',
    logAudioCaptured: 'Audio capturado: {label}',
    logCaptureStopped: 'Captura de audio detenida por el usuario.',
    logCaptureCancelled: 'Captura cancelada.',
    logAudioError: 'Audio Error: {msg}',
    logAudioContext: 'AudioContext: {state}, sampleRate: {rate}Hz',
    logManualColorSent: 'Color manual enviado: rgb({r},{g},{b})',
    logConnectFirst: 'Conecta el LED primero.',
    logTestingFmt: 'Probando "{label}": [{bytes}]',
    logSendBytesError: 'Error enviando bytes: {msg}',
    logBtHttpsWarn: 'Web Bluetooth necesita HTTPS. Hostea este archivo en GitHub Pages o similar.',
    logDisplayMediaWarn: 'getDisplayMedia no disponible en este contexto.',
    logBrowserChrome: 'Navegador: {status}',
    browserChromeOk: 'Chrome detectado',
    browserChromeWarn: 'Usa Chrome'
  }
};

function t(key, vars) {
  const table = I18N[currentLang] || I18N.en;
  let value = table[key] || I18N.en[key] || key;
  if (vars) {
    Object.keys(vars).forEach((k) => {
      value = value.replace(new RegExp(`\\{${k}\\}`, 'g'), String(vars[k]));
    });
  }
  return value;
}

function setLanguage(lang) {
  currentLang = I18N[lang] ? lang : 'en';
  localStorage.setItem('led-sync-lang', currentLang);
  document.documentElement.lang = currentLang;
  applyTranslations();
  if (typeof buildCmdTester === 'function') {
    buildCmdTester();
  }
}

function applyTranslations() {
  const byIdText = [
    ['support-warn', 'supportWarn'], ['title-connect', 'titleConnect'], ['title-spectrum', 'titleSpectrum'],
    ['title-mode', 'titleMode'], ['title-settings', 'titleSettings'], ['title-diagnostics', 'titleDiagnostics'],
    ['label-led', 'labelLed'], ['ble-help', 'bleHelp'], ['label-audio', 'labelAudio'], ['audio-help', 'audioHelp'],
    ['step-1', 'step1'], ['step-2', 'step2'], ['step-3', 'step3'], ['idle-text', 'idleText'], ['vis-label', 'visLabel'],
    ['name-spectrum', 'modeNameSpectrum'], ['name-beat', 'modeNameBeat'], ['name-hue', 'modeNameHue'], ['name-ambient', 'modeNameAmbient'],
    ['desc-spectrum', 'descSpectrum'], ['desc-beat', 'descBeat'], ['desc-hue', 'descHue'], ['desc-ambient', 'descAmbient'],
    ['label-sens', 'labelSens'], ['label-bright', 'labelBright'], ['label-smooth', 'labelSmooth'], ['label-beat', 'labelBeat'],
    ['manual-title', 'manualTitle'], ['manual-label', 'manualLabel'], ['btn-send', 'btnSend'], ['sent-hex-title', 'sentHexTitle']
  ];
  byIdText.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t(key);
  });

  const diagHelpEl = document.getElementById('diag-help');
  if (diagHelpEl) diagHelpEl.innerHTML = t('diagHelp');
  const readyEl = document.getElementById('log-ready');
  if (readyEl) readyEl.textContent = t('readyLog');
  const statusEl = document.getElementById('status-badge');
  if (statusEl && !bleChar) statusEl.textContent = t('statusDisconnected');
  const peakEl = document.getElementById('peak-label');
  if (peakEl && peakEl.textContent.includes('Hz')) {
    const hzMatch = peakEl.textContent.match(/(\d+)\s*Hz/);
    peakEl.textContent = `${t('peakPrefix')}: ${hzMatch ? hzMatch[1] : '-'} Hz`;
  }

  const bleBtn = document.getElementById('btn-ble');
  if (bleBtn) bleBtn.textContent = bleChar ? t('btnBleReconnect') : t('btnBleConnect');
  const audioBtn = document.getElementById('btn-audio');
  if (audioBtn) audioBtn.textContent = analyser ? t('btnAudioRecapture') : t('btnAudioCapture');
}
