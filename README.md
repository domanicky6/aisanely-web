# aisanely.com

Website of the Instagram account **AI Sanely** (@aisanely): AI in plain English.
English version of [ludskyoai.sk](https://ludskyoai.sk): same design, same code, English content.

- `index.html` – home page (Vue 3 from `assets/vue.global.prod.js`, content from `data.json`)
- `games.html` – Play and learn: 12 games, no dependencies (plain JS). Direct links: `games.html#nauc`, `#slovo`, `#prezradit`, `#robot`, `#podvod`, `#halu`, `#senior`, `#vrchol`, `#chyby`, `#pexeso`, `#riskuj`, `#pas`
- `start.html`, `parents.html`, `schools.html`, `seniors.html`, `privacy.html`, `corrections.html`, `404.html`
- `assets/schools/*.pdf` – 11 lessons (lesson plan + worksheet), `assets/cheat-sheet-seniors.pdf`
- `news/` – archive of published posts. **Don’t edit by hand**: `node tools/news-build.mjs` (inputs `tools/news-data/posts/**.json` in the generator structure + `tools/news-data/published.json` from Zernio). It also updates `sitemap.xml` and can be run repeatedly.
- `data.json` – **content that changes**: latest three posts, The Week in AI, quiz questions, corrections.
- `assets/stats.js` – GoatCounter visit counting, **off** until `KOD` is filled in (privacy page switches its texts automatically).

No external resources, no cookies. Hosting: GitHub Pages (branch `main`, root), domain in `CNAME`.
