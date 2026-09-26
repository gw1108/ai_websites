# Notes for agents

- `georges_fire_sale/` is **encrypted** (password-gated). Never edit it directly or commit readable
  content there. To change it: `node georges_fire_sale_tools/export.js` → edit
  `georges_fire_sale_src/` (gitignored) → `node georges_fire_sale_tools/build.js`.
  Details: `georges_fire_sale_tools/README.md`.
