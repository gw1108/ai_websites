// Decrypts ../georges_fire_sale/payload.bin back into readable files in ../georges_fire_sale_src.
// Usage: node georges_fire_sale_tools/export.js [password]   (case-insensitive; default "george")
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'georges_fire_sale_src');
const PASSWORD = (process.argv[2] || 'george').toLowerCase();

const b = fs.readFileSync(path.join(ROOT, 'georges_fire_sale', 'payload.bin'));
const key = crypto.pbkdf2Sync(PASSWORD, b.subarray(0, 16), 200000, 32, 'sha256');
const d = crypto.createDecipheriv('aes-256-gcm', key, b.subarray(16, 28));
d.setAuthTag(b.subarray(-16));
const files = JSON.parse(Buffer.concat([d.update(b.subarray(28, -16)), d.final()]).toString('utf8'));
for (const [rel, data] of Object.entries(files)) {
  const p = path.join(OUT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, rel === 'index.html' ? data : Buffer.from(data, 'base64'));
}
console.log(`Exported ${Object.keys(files).length} files to ${OUT}`);
