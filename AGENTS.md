# AGENTS.md — kontekstas AI agentams ir bendradarbiams

## Produkto esmė

**DI Promptų biblioteka e-komercijai (Spin-off Nr. 8)** — statinė svetainė su kopijuojamais DI promptais (~107 užduotys). Įėjimas: šaknies **`index.html`** nukreipia į **`lt/`**, **`en/`**, **`et/`** arba **`lv/`** (`localStorage` **`prompt-library-lang`**, tada naršyklės kalba; numatytoji — **`en/`**). Logika: **`assets/js/app.js`** (fetch + render), stiliai **`assets/css/styles.css`**, duomenys **`assets/data/prompts.{lt,en,et,lv}.json`**.

## Tech stack

- HTML5, CSS3, **vanilla JavaScript** (be bundlerio produkcijoje)
- Įrankiai: ESLint, Prettier, `serve` lokaliai (`npm run dev`)
- Hosting: GitHub Pages (žr. `.github/workflows/static.yml`) — prieš deploy workflow vykdo **`quality`** (`npm run verify`); artefakte tik viešas turinys (`index.html`, kalbų katalogai, `assets/`, `.nojekyll`), ne visa repozitorija.

## Kur ką keisti

| Tema                                              | Vieta                                                                                  |
| ------------------------------------------------- | -------------------------------------------------------------------------------------- |
| UI, paieška, kopijavimas, modalai, i18n eilutės   | `assets/js/app.js`, `assets/css/styles.css`                                            |
| Promptų tekstai / struktūra                       | `assets/data/prompts.lt.json`, `prompts.en.json`, `prompts.et.json`, `prompts.lv.json` |
| LT / EN / ET / LV puslapiai (hero, footer, forma) | `lt/index.html`, `en/index.html`, `et/index.html`, `lv/index.html`                     |
| Kalbų keliai                                      | `docs/MULTILINGUAL_STRUCTURE.md`                                                       |
| Dokumentacija, užduotys                           | `README.md`, `TODO.md`, `CHANGELOG.md`, `docs/DOCUMENTATION.md`                        |
| UI/UX auditas prieš release                       | `docs/UI_UX_AUDIT_CHECKLIST.md`                                                        |

## Konvencijos

- Laikykitės esamo stiliaus: aiškūs kintamųjų vardai, maži, fokusuoti pakeitimai.
- **Nekurkite** naujo frameworko ar build step, jei užduotis to neprašo.
- Po JS pakeitimų paleiskite **`npm run lint`** (ir jei liečiate `scripts/*.mjs` — **`npm run lint:scripts`**) bei **`npx prettier --write`** pakeistiems failams.
- Nenaudokite slaptų raktų šiame repo — projektas statinis, be backend.

## Ko vengti

- Necommitinti `node_modules/`.
- Nešalinti ARIA / klaviatūros navigacijos be priežasties.
- Nekopijuoti didelių blokų iš `docs/archive/` be tikrinimo.

## QA checklist (prieš PR / release)

1. `npm ci` → `npm run verify`
2. `npm run dev` — atidaryti `/lt/`, `/en/`, `/et/`, `/lv/` ir šaknį: redirect, paieška (`?q=`), kalbų jungiklis su `?q=`, kopijavimas, skyriai, temos mygtukas (sistema / šviesi / tamsi), mobilus paieškos modalas
3. Jei keitėte duomenis — `npm run verify` patikrina visus `prompts.*.json` (žr. `scripts/validate-prompts-json.mjs`)
4. **Dokumentai:** pagal `docs/DOCUMENTATION.md` — `CHANGELOG.md` (`[Unreleased]`), `README` / `AGENTS` / `CONTRIBUTING` / `TODO` jei aktualu

## Nuorodos

- Bendradarbiavimas: [CONTRIBUTING.md](CONTRIBUTING.md)
- Dokumentų politika: [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md)
- Daugiakalbystė: [docs/MULTILINGUAL_STRUCTURE.md](docs/MULTILINGUAL_STRUCTURE.md)
- Pakeitimų žurnalas: [CHANGELOG.md](CHANGELOG.md)
- GitHub Pages: [GITHUB_SETUP.md](GITHUB_SETUP.md)
