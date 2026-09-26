# George's Fire Sale — password-protected build

`georges_fire_sale/` is published publicly (GitHub Pages) but its content is encrypted.
Password: **george** (case-insensitive — it is lowercased before key derivation).

## Layout
| Path | Tracked in git? | What |
| --- | --- | --- |
| `georges_fire_sale/index.html` | yes | Password gate (copied from `gate.html`) |
| `georges_fire_sale/payload.bin` | yes | The encrypted site |
| `georges_fire_sale_src/` | **no** (gitignored) | Readable source: `index.html`, `img/`, `fonts/`, `vendor/` |
| `georges_fire_sale_tools/` | yes | `build.js`, `export.js`, `gate.html`, this README |

## How it works
- `payload.bin` = `salt(16) | iv(12) | AES-256-GCM ciphertext | tag(16)`.
  Key = PBKDF2-SHA256(lowercase(password), salt, 200000 iterations, 32 bytes).
- Plaintext is JSON: `{ "index.html": "<html text>", "img/foo.webp": "<base64>", ... }`
  covering every file in `img/`, `fonts/`, `vendor/`.
- `gate.html` fetches `payload.bin`, decrypts with WebCrypto, swaps each relative path
  (e.g. `img/foo.webp`) in the HTML for a `data:` URI, then `document.write`s the page.
  The password is cached in `sessionStorage` so refreshes don't re-prompt.

## Workflow for editing the site
1. **Export readable source** (needed on a fresh clone, since the source is gitignored):
   `node georges_fire_sale_tools/export.js` → writes `georges_fire_sale_src/`
2. Edit files in `georges_fire_sale_src/`. New assets must live under `img/`, `fonts/` or
   `vendor/` and be referenced by relative path (`img/x.webp`). For a new file extension,
   add its MIME type to the `mime` map in `gate.html`.
3. **Re-encrypt:** `node georges_fire_sale_tools/build.js` → rewrites `georges_fire_sale/`
4. Never commit or copy readable source/images into `georges_fire_sale/`.

Both scripts accept an optional password argument (`node build.js newpass`); pass the same
one to `export.js` later. This is obfuscation, not strong security: a short password can be
brute-forced offline from `payload.bin`.
