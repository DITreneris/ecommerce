# TODO — DI promptų biblioteka e-komercijai (Spin-off Nr. 8)

**Atnaujinta:** 2026-04-06 (post–UI planas)

## Aktyvus produktas (šis repo)

- **Stack:** HTML + CSS + vanilla JS ([`assets/js/app.js`](assets/js/app.js)), duomenys [`assets/data/prompts.{lt,en,et,lv}.json`](assets/data/)
- **Įėjimas:** šaknies [`index.html`](index.html) → `lt/` \| `en/` \| `et/` \| `lv/`
- **archyve** ([`docs/archive/`](docs/archive/)): senesni P2 bandymai (Fuse, favorites, `app-enhanced.js`, `dept--loaded` animacija ir kt.) — **neprodukciniai**

## UI / UX (backlog)

**Struktūrizuotas ciklas ir eilė:** [docs/UI_UX_ITERATION_PLAN.md](docs/UI_UX_ITERATION_PLAN.md) · **detalė ir 8 iteracijos:** [docs/UI_UX_ITERATION_BACKLOG.md](docs/UI_UX_ITERATION_BACKLOG.md)

| Prioritetas | Užduotis                                                                                                                                                 | Pastaba                                   |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| P1          | UI plano [docs/UI_UX_ITERATION_PLAN.md](docs/UI_UX_ITERATION_PLAN.md) §2 etapai **1–8 uždaryti** (2026-04-06); tolesnės iteracijos — §1 ciklas + backlog | Nauji etapai tik su nauju PR ir checklist |
| P2          | ~~Nuoroda į konkretų promptą dokumentuoti README / footer~~ — įgyvendinta 2026-04-06                                                                     | `?prompt=<id>`, `#prompt-<id>`            |
| P3          | Web Share / „Open in ChatGPT“ nuorodos                                                                                                                   | Privatumas ir produkto sprendimas         |
| P3          | E2E / regresijos testai (Playwright)                                                                                                                     | Po didelių JS pakeitimų                   |
| Tech        | Build minifikacija be architektūros lūžimo                                                                                                               | Pasirinktinai vėliau                      |

## Uždaryta (2026-04-06)

- **P1 ET/LV turinio QA** (ilgi **102–107**, keywords pagal copy auditą, **68** EE tekstas): žr. [CHANGELOG.md](CHANGELOG.md) **4.3.0** ir [docs/COPY_UX_AUDIT_LT_EN_LV_ET_2026-04-05.md](docs/COPY_UX_AUDIT_LT_EN_LV_ET_2026-04-05.md) §„Liko“.

## Nebetinka (pasenę įrašai)

Ankstesnis šio failo turinys apie `index-refactored.html`, monolitinį `index.html` klaidų lenteles ir „P2 užbaigta“ su UserProgress/Favorites **šiuo produktu** — pakeistas archyvu. Detalėms: [`docs/archive/`](docs/archive/).

## QA

- [`npm run verify`](package.json)
- Rankinis: [`docs/UI_UX_AUDIT_CHECKLIST.md`](docs/UI_UX_AUDIT_CHECKLIST.md)
