# AI Websites

A workspace for creating, visualizing, and refining website variations with AI — for both personal and professional use.

## Purpose

This project is a sandbox for rapidly exploring web design ideas. Instead of committing to a single design up front, the goal is to:

- **Create** multiple variations of a website concept quickly using AI-assisted design and development
- **Visualize** each variation side by side to compare layouts, styles, color palettes, and typography
- **Refine** the most promising directions iteratively until they're ready for real-world use

## How It Works

Websites are built and iterated on with [Claude Code](https://claude.com/claude-code), leveraging a set of installed design skills that guide aesthetic direction, styling, and UI/UX decisions:

| Skill | What it provides |
| --- | --- |
| `frontend-design` | Distinctive, intentional visual design direction (avoiding templated defaults) |
| `ui-ux-pro-max` | Searchable design database: 84 styles, 192 color palettes, 74 font pairings, UX guidelines, and more |
| `ui-styling` | shadcn/ui components, Tailwind CSS patterns, accessible layouts, dark mode |
| `design` / `design-system` | Brand identity, design tokens, logos, banners, icons |
| `brand` | Brand voice, messaging, and visual consistency |
| `banner-design` / `slides` | Supporting assets — hero banners, social images, presentations |

## Typical Workflow

1. Describe the website concept (purpose, audience, vibe). Or look to http://www.awwwards.com/ or https://dribbble.com/ for inspiration and functionality.
2. Generate one or more design variations
3. Preview them in the browser and compare
4. Pick a direction, then refine — tweak layout, colors, copy, and components
5. Repeat until the design is production-ready

Example prompt:
Build me a website for COMPANY [here in LOCATION or pure online company]. I'd like this website to use this referene image as inspiration, but using my own branding, colors, and logos. I'd also like to include a few specific sections on my website. work back and forth with me, starting with your open questions and concerns before implementation. 

## Structure

Each website (and its variations) lives in its own directory as the project grows.

### Tech Stack & Deployment

Most subfolder projects should use one of two setups:

1. **Plain HTML/CSS** — served directly as a GitHub Page. No build step; what's committed is what's deployed.
2. **React (Vite)** — built and deployed to GitHub Pages via a GitHub Action that runs on every push, but only when that project's code actually changes (use a `paths` filter scoped to the project's directory).

Both keep the reviewer experience the same: every site variation is reachable at a simple URL that non-technical people can open in a browser.

## License

[MIT](LICENSE) © 2026 George Wang
