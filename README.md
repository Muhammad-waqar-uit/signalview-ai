# SignalView AI

Your personal market researcher. Live market data, clean charts, and clear answers in plain words.

A landing page for a market-research product: a full-bleed sky hero with a floating glass nav, animated word-by-word headline, and a "how it works" section showing ask → pull → chart.

## Two ways to view it

### 1. Open `index.html` (no build, no dependencies)

Just open the file in a browser, or host it anywhere:

```bash
# from this directory
python3 -m http.server 8000
# then visit http://localhost:8000
```

React 18 + Babel load from CDN. Works offline-ish, no install.

### 2. Next.js 14 source (`nextjs/signalview/`)

The same page as a Next.js App Router app, for when you want to ship it for real:

```bash
cd nextjs/signalview
npm install
npm run dev
```

## What's on the page

- **Glass nav** that collapses to a pill on scroll; tap the pill to expand it again.
- **Hero** with a word-by-word rising headline over a CSS sky (gradients, blurred clouds, leaves, bokeh, grain) that drifts slower than the page.
- **How it works** — three steps (Ask in plain words → We pull live data → Read a clean answer) with sample illustrations and a scroll-reveal.
- **Closing** CTA: "Start with one question."

## Edit the copy

All text lives in `nextjs/signalview/components/` and `index.html`. The standalone HTML is a single-file build of the same components — change one and rebuild the other with the same edit.

## GitHub Pages

Enable **Pages → Source: main, / (root)** in the repo settings. `index.html` is served at the root, so the page is live at `https://muhammad-waqar-uit.github.io/signalview-ai/` once enabled.