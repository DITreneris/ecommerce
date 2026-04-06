# Memo: Estonian & Latvian locale — golden standard and migration workflow

> **Šis repo (Spin-off Nr. 8)** naudoja **`assets/data/prompts.{lt,en,et,lv}.json` + `assets/js/app.js`**, ne žemiau minimą `generate-et-lv-pages.cjs` / `library.js` porų pipeline. Memo lieka gairėms (UX, hreflang, `localStorage`), techninis įgyvendinimas — žr. [`docs/MULTILINGUAL_STRUCTURE.md`](docs/MULTILINGUAL_STRUCTURE.md).

**Project:** DI Promptų Biblioteka (static library)  
**Scope:** Multilingual UI/UX, ET (`ee` / `et` in code) and LV, alignment with EN canonical source.  
**Related:** [MULTILINGUAL_STRUCTURE.md](MULTILINGUAL_STRUCTURE.md), [CHANGELOG.md](../CHANGELOG.md) (release **1.1.0**), [AGENTS.md](../AGENTS.md).

---

## 1. What “ET/LV migration” means here

This is one static site with four locale folders, not separate apps.

| Concern | LT | EN | ET | LV |
|--------|----|----|----|-----|
| Library | `/lt/` | `/en/` | `/et/` | `/lv/` |
| Privacy | `lt/privatumas.html` | `en/privacy.html` | `et/privacy.html` | `lv/privacy.html` |
| Privacy filename | `privatumas.html` | `privacy.html` | same as EN | same as EN |
| Source of truth | Manual (`lt/`, sync with EN intent) | **Canonical** (`en/index.html`, `js/library.js`) | **Generated** from EN | **Generated** from EN |

**Rule:** After changes to EN library HTML or canonical `js/library.js`, run `npm run generate:et-lv`, commit outputs. CI uses `git diff --exit-code` on generated files; drift fails the build.

---

## 2. Multilingual UI/UX standard

1. **`<html lang>`** — `lt` | `en` | `et` | `lv` per locale.
2. **Language switcher** — `<nav class="lang-switcher">` → `<ul class="lang-switcher-list">`. Current: `<span class="lang-current" aria-current="page">`. Others: `<a class="lang-link" data-lang="…">` + `localStorage.setItem('lang', …)` on click. Labels: **Lietuvių**, **English**, **Eesti**, **Latviešu** (no flags).
3. **Root `/`** — `index.html` redirects: `localStorage` (`lt`|`en`|`et`|`lv`) first; else `navigator.language` (`et`/`ee` → ET, `lv` → LV, `lt` → LT, default EN). Manual links also set `lang`.
4. **`hreflang`** — Shared `js/hreflang.js`; `<html data-hreflang-suite="library"|"privacy">`; `x-default` → EN. Base path must work on GitHub Pages project sites (pathname strips `/(lt|en|et|lv)(/…|$)`).
5. **CSS** — Single `css/library.css`. Per-locale **only** inline `:root { --codeblock-copy-hint: '…' }` (applied via generator pairs).
6. **A11y** — Same patterns on library and privacy (touch targets, focus); CI pa11y includes ET/LV pages.

---

## 3. Technical pipeline (generator contract)

Implemented in `scripts/generate-et-lv-pages.cjs` with bodies in `scripts/prompt-bodies-et-lv.cjs`.

1. Read `en/index.html` (normalize U+2019 → `'`, LF).
2. Replace each `<pre class="code-text" id="promptN">` with `ET_PROMPTS` / `LV_PROMPTS`.
3. Replace language `<nav>` with `ET_NAV` / `LV_NAV` (`aria-label`: Keel / Valoda).
4. `applyPairs` with `ET_PAIRS` / `LV_PAIRS` — substring replacements for all visible EN UI.
5. Swap script reference to `../js/library.et.js` or `../js/library.lv.js`.
6. Build `library.et.js` / `library.lv.js` (and `library.lt.js` via `LT_JS_PAIRS`) by applying JS pair lists to `js/library.js`.

**Constraints:**

- Every new or changed EN string needs matching `from` entries in ET and LV pair lists (and JS pairs if it lives in `library.js`).
- **Order:** longest/most specific pairs first where documented.
- **`Copied` replacements:** apply `button.innerHTML` before toast `<span>Copied</span>` so `applyPairs` does not break a single JS line.

---

## 4. Placeholder tokens (parity with LT/EN)

| Locale | Company / org | Role | Prompt 7 table headers |
|--------|----------------|------|-------------------------|
| EN | `[COMPANY]` | `[MY ROLE]` | `[PROMPT]` \| `[WHEN I USE IT]` \| `[PROBLEM IT SOLVES]` |
| ET | `[ETTEVÕTE]` | `[MINU ROLL]` | `[KÜSITIS]` \| `[MILLAL KASUTAN]` \| `[MILLISE PROBLEEMI LAHENDAB]` |
| LV | `[UZŅĒMUMS]` | `[MANA LOMA]` | `[PROMPTTEKSTS]` \| `[KAD LIETOJU]` \| `[KĀDU PROBLĒMU RISINA]` |

See [MULTILINGUAL_STRUCTURE.md](MULTILINGUAL_STRUCTURE.md) §3b.

---

## 5. Changelog-backed decisions and challenges (1.1.0 summary)

- **Generated ET/LV:** EN remains the single structural template; ET/LV maintained via pairs + prompt modules for deterministic HTML and CI.
- **LT exceptional:** `privatumas.html` path and manual LT HTML; `library.lt.js` still generated from `LT_JS_PAIRS` alongside ET/LV.
- **Privacy:** `et/privacy.html` and `lv/privacy.html` may need **manual** updates when EN privacy changes are not driven through the generator.
- **Microcopy parity:** Pass aligned with `MICROCOPY_AUDIT_EN.md` §7 — code-block hints, “What you get”, footer, Copied toast/button, user-facing errors (not technical).
- **Estonian:** Register and typos fixed (e.g. tehisintellekt terminology; polite plural “teie” style; progress strings aligned HTML ↔ JS).
- **Latvian:** Second “What to do” pair added so prompts 2–8 do not retain English blocks; wording fixes in `LV_PROMPTS` and JS errors.
- **Product URL:** Canonical `https://www.promptanatomy.app/en` everywhere; brand name “Prompt Anatomy” often kept in English in UI.
- **Tooling:** `.gitattributes` + `writeUtf8Lf` for stable `git diff`; hreflang centralized in `hreflang.js` (incl. `/repo/lt` without trailing slash).

---

## 6. Operational checklist (adding or updating ET/LV)

1. Edit **EN** first: `en/index.html` and/or `js/library.js`.
2. Update **`ET_PAIRS` / `LV_PAIRS`**, **`ET_JS_PAIRS` / `LV_JS_PAIRS`**, and **`ET_PROMPTS` / `LV_PROMPTS`** as needed.
3. Run **`npm run generate:et-lv`**.
4. **Manually** sync `lt/` if EN microcopy or structure changed.
5. **Privacy:** Update `et/privacy.html` / `lv/privacy.html` by hand if not generated.
6. Run **`npm test`** (structure tests cover ET/LV `lang`, hreflang, switcher, key strings, `library.*.js` references).
7. **Commit** all generated files; CI regenerates and diffs.

---

## 7. Risks and limitations

- **Substring fragility:** EN copy edits without pair updates break `applyPairs` (throws on missing substring).
- **Ambiguous EN duplicates:** `split/join` replaces all occurrences; use specific strings and ordering.
- **Leftover English:** Regressions appear as untranslated blocks (historically LV “What to do” short variant).
- **Privacy split workflow:** Legal text can desync across locales if only EN is edited.

---

## 8. One-line golden standard

**EN defines structure and behaviour; ET/LV (and LT JS) string deltas live in the generator and prompt-body modules; always run `npm run generate:et-lv`, keep privacy, hreflang, language switcher, tokens, and a11y consistent across all eight HTML surfaces.**

---

*Last aligned with repo state and CHANGELOG [1.1.0] (2026-03-29). Update this memo when the generator contract or locale list changes.*
