# TODO — DI promptų biblioteka e-komercijai (Spin-off Nr. 8)

**Atnaujinta:** 2026-04-06

## Aktyvus produktas (šis repo)

- **Stack:** HTML + CSS + vanilla JS ([`assets/js/app.js`](assets/js/app.js)), duomenys [`assets/data/prompts.{lt,en,et,lv}.json`](assets/data/)
- **Įėjimas:** šaknies [`index.html`](index.html) → `lt/` \| `en/` \| `et/` \| `lv/`
- **archyve** ([`docs/archive/`](docs/archive/)): senesni P2 bandymai (Fuse, favorites, `app-enhanced.js`, `dept--loaded` animacija ir kt.) — **neprodukciniai**

## UI / UX (backlog)

| Prioritetas | Užduotis | Pastaba |
| ----------- | -------- | ------- |
| P2 | Nuoroda į konkretų promptą dalijimuisi dokumentuoti viešai README / hero | Palaiko `?prompt=ID` ir `#prompt-ID` |
| P3 | Web Share / „Open in ChatGPT“ nuorodos | Privatumas ir produkto sprendimas |
| P3 | E2E / regresijos testai (Playwright) | Po didelių JS pakeitimų |
| Tech | Build minifikacija be architektūros lūžimo | Pasirinktinai vėliau |

## Uždaryta (2026-04-06)

- **P1 ET/LV turinio QA** (ilgi **102–107**, keywords pagal copy auditą, **68** EE tekstas): žr. [CHANGELOG.md](CHANGELOG.md) `[Unreleased]` ir [docs/COPY_UX_AUDIT_LT_EN_LV_ET_2026-04-05.md](docs/COPY_UX_AUDIT_LT_EN_LV_ET_2026-04-05.md) §„Liko“.

## Nebetinka (pasenę įrašai)

Ankstesnis šio failo turinys apie `index-refactored.html`, monolitinį `index.html` klaidų lenteles ir „P2 užbaigta“ su UserProgress/Favorites **šiuo produktu** — pakeistas archyvu. Detalėms: [`docs/archive/`](docs/archive/).

## QA

- [`npm run verify`](package.json)
- Rankinis: [`docs/UI_UX_AUDIT_CHECKLIST.md`](docs/UI_UX_AUDIT_CHECKLIST.md)
