# SourceArt — Araba's Shea brand & product assets

Downloaded 2026-07-22 from the Amazon storefront and the four product listings.
All images are the full-resolution originals (Amazon size/crop modifiers stripped from the CDN URLs).

## Sources

- Storefront: https://www.amazon.com/stores/ArabasShea/page/DFD14977-FFA0-47B3-BEB5-BDD6D15E4E22
- Products:
  - `B0DFV4QMK1` — Raw Batana Oil 4oz → `products/batana-oil-4oz/`
  - `B0FHBFMXBH` — Raw Batana Oil 2oz → `products/batana-oil-2oz/`
  - `B0FT34CHBW` — Traditional African Black Soap → `products/african-black-soap/`
  - `B0GFFK3TBD` — Raw Shea Butter → `products/raw-shea-butter/`

## Layout

- `storefront/` — 18 images from the brand store page: the logo, hero/section banners,
  and lifestyle/category tiles. Key named files:
  - `logo_arabas-shea_orange-bg.jpg` — full brand logo, white script on orange, 3000×2296
  - `banner_who-we-are_3000x900.jpg` — "Who We Are" hero (tan/stone, batana jar, monstera leaf)
  - `banner_empowering-your-beauty_3000x600.jpg` — "Empowering Your Beauty" hero (green, batana + black soap)
  - Remaining files keep the first 8 chars of their Amazon CDN UUID as the name.
- `products/<name>/NN_<amazon-image-id>.jpg` — the listing's main gallery, in Amazon's
  display order, 1254–1500px square.
- `products/african-black-soap/aplus/` and `products/raw-shea-butter/aplus/` — A+ brand
  content modules from below the fold (ingredient callouts, story panels, banners).
  The Batana Oil listings had no A+ content.

83 images total. Scrape intermediates (raw page HTML/markdown) live in `.firecrawl/`.

## Brand notes (from the assets)

- Logo: "Araba's" in white script with "SHEA" in caps tucked into the descender loop.
- Brand orange (logo background) ≈ #E8531F; packaging uses a sage/leaf green with
  black lids and coral/orange accent bars.
- Taglines seen: "Empowering Your Beauty", "More than just pure goodness for your body".
