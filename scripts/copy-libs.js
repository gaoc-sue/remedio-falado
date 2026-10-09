// Copia bibliotecas para dentro do app, para funcionar sem internet.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const copy = (from, to) => { fs.mkdirSync(path.dirname(path.join(root, to)), { recursive: true }); fs.copyFileSync(path.join(root, from), path.join(root, to)); console.log('copiado', to); };
copy('node_modules/@zxing/library/umd/index.min.js', 'www/lib/zxing.min.js');
for (const w of ['400', '700']) copy(`node_modules/@fontsource/atkinson-hyperlegible/files/atkinson-hyperlegible-latin-${w}-normal.woff2`, `www/fonts/atkinson-${w}.woff2`);
