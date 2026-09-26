// Encrypts ../georges_fire_sale_src into ../georges_fire_sale (index.html gate + payload.bin).
// Usage: node georges_fire_sale_tools/build.js [password]   (case-insensitive; default "george")
// Payload = JSON { "index.html": <text>, "img/x.webp": <base64>, ... } so export.js can round-trip it.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'georges_fire_sale_src'), OUT = path.join(ROOT, 'georges_fire_sale');
const PASSWORD = (process.argv[2] || 'george').toLowerCase();

const files = { 'index.html': fs.readFileSync(path.join(SRC, 'index.html'), 'utf8') };
for (const dir of ['img', 'fonts', 'vendor']) {
  if (!fs.existsSync(path.join(SRC, dir))) continue;
  for (const f of fs.readdirSync(path.join(SRC, dir)))
    files[`${dir}/${f}`] = fs.readFileSync(path.join(SRC, dir, f)).toString('base64');
}

const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12);
const key = crypto.pbkdf2Sync(PASSWORD, salt, 200000, 32, 'sha256');
const c = crypto.createCipheriv('aes-256-gcm', key, iv);
const ct = Buffer.concat([c.update(JSON.stringify(files), 'utf8'), c.final(), c.getAuthTag()]);
fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'payload.bin'), Buffer.concat([salt, iv, ct]));
fs.copyFileSync(path.join(__dirname, 'gate.html'), path.join(OUT, 'index.html'));
console.log(`Wrote ${OUT} (${Object.keys(files).length} files, ${(ct.length / 1e6).toFixed(1)} MB encrypted)`);
