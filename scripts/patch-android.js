// Ajusta o projeto Android gerado pelo Capacitor:
// permissão de câmera, ícone da notificação e consulta ao motor de voz.
const fs = require('fs'), path = require('path');
const res = path.join(__dirname, '..', 'android', 'app', 'src', 'main');
const manifestPath = path.join(res, 'AndroidManifest.xml');
let m = fs.readFileSync(manifestPath, 'utf8');
const perms = [
  'android.permission.CAMERA',
  'android.permission.POST_NOTIFICATIONS',
  'android.permission.SCHEDULE_EXACT_ALARM',
  'android.permission.RECEIVE_BOOT_COMPLETED',
  'android.permission.WAKE_LOCK'
];
for (const p of perms) {
  if (!m.includes(`"${p}"`)) m = m.replace('</manifest>', `    <uses-permission android:name="${p}" />\n</manifest>`);
}
if (!m.includes('android.hardware.camera')) m = m.replace('</manifest>', '    <uses-feature android:name="android.hardware.camera" android:required="false" />\n</manifest>');
if (!m.includes('android.intent.action.TTS_SERVICE')) {
  m = m.replace('</manifest>', '    <queries>\n        <intent>\n            <action android:name="android.intent.action.TTS_SERVICE" />\n        </intent>\n    </queries>\n</manifest>');
}
fs.writeFileSync(manifestPath, m);
// ícone simples (pílula) para a barra de notificação
const draw = path.join(res, 'res', 'drawable');
fs.mkdirSync(draw, { recursive: true });
fs.writeFileSync(path.join(draw, 'ic_stat_icon.xml'),
`<vector xmlns:android="http://schemas.android.com/apk/res/android" android:width="24dp" android:height="24dp" android:viewportWidth="24" android:viewportHeight="24">
  <path android:fillColor="#FFFFFFFF" android:pathData="M8,6h8a6,6 0,0 1,0 12h-8a6,6 0,0 1,0 -12zM8,8a4,4 0,0 0,0 8h3v-8z"/>
</vector>
`);
console.log('Android ajustado: permissões, ícone de notificação e voz.');
