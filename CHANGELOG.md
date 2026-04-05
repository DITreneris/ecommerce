# Changelog

Visos reikšmingos šio projekto pataisos dokumentuojamos šiame faile.

Formatas remiasi [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), versijos — [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [4.2.0] — 2026-04-05

### Fixed

- **`scripts/generate-prompts-from-en.mjs`** — ilgiems tekstams vertimas dalimis (`encodeURIComponent` biudžetas); GTX atsakyme sujungiami visi vertimo segmentai (ne tik pirmas), kad ET/LV nebūtų nutrūkstąčių `text` / `copyText`.
- **`assets/data/prompts.lt.json`** — copy taisymai (ID 67, 18, 80, 68: terminija, PVM kontekstas Lietuvai, ID 18 „mitigacijos“ rašyba).
- **`assets/data/prompts.en.json`** — P0/P1 copy pagal auditą (kalbos mišiniai, „email“ frazės, keywords, Kanban stulpeliai, ID 107 anglų blokas ir kt.).
- **`assets/data/prompts.et.json`**, **`prompts.lv.json`** — pergeneruota iš atnaujinto EN po generatoriaus pataisų; rankinis retušas (ET: 3, 68, 107; LV: 68 → Latvijas pircēji).

### Changed

- **`assets/data/prompts.et.json`**, **`prompts.lv.json`** — pilnas turinys po `npm run generate:et` / `generate:lv` (sulyginta su EN ilgiu kritinėms užduotims).
- **`assets/data/prompts.{lt,en,et,lv}.json`** — informacinė architektūra: ID **64–67** perkelti į **IT**, **71** į **finance**, **79–82** į **HR** (įskaitant **80** iš IT), atnaujinti `count` ir `p.category` visose kalbose (UX atitiktis temai, žr. copy auditą).

### Docs

- **`docs/COPY_UX_AUDIT_LT_EN_LV_ET_2026-04-05.md`** — išsamus copy ir UX auditas visiems 107 promptams kalbose LT, EN, LV, ET (įvertinimai, prioritetai, backlog); papildyta skyriumi **Po remediacijos** ir ET/LV rankinės QA gairėmis.
- **`docs/DOCUMENTATION.md`** — dokumentų registre įrašas apie copy auditą.

## [4.1.0] — 2026-04-05

### Added

- Keturios kalbos: **`et/`** (eesti) ir **`lv/`** (latviešu) bibliotekos puslapiai, duomenys **`assets/data/prompts.et.json`**, **`prompts.lv.json`** (generuojama iš EN: `npm run generate:et` / `generate:lv`).
- Privatumas: **`et/privacy.html`**, **`lv/privacy.html`**; visuose privatumo puslapiuose `hreflang` ir kryžminės nuorodos.
- Šaknies **`index.html`**: `localStorage` raktas **`prompt-library-lang`** (`lt` \| `en` \| `et` \| `lv`), tada naršyklės kalba; numatytoji ne LT kalbai — **`en/`**; `x-default` į EN.
- **`assets/js/app.js`**: `STRINGS.et` / `STRINGS.lv`, teisinga paieškos santraukos daugiskaita ET/LV, kalbų nuorodoms išsaugomas **`?q=`**, paspaudus kalbą — įrašomas `prompt-library-lang`.
- **`scripts/generate-prompts-from-en.mjs`** — EN → ET/LV (Google `translate.googleapis.com` client=gtx); **`scripts/validate-prompts-json.mjs`** ir įtraukta į **`npm run verify`**.
- GitHub Pages publikavimas į viešą repozitoriją **[DITreneris/ecommerce](https://github.com/DITreneris/ecommerce)** — numatytas URL **`https://ditreneris.github.io/ecommerce/`** (po Pages šaltinio įjungimo).

### Fixed

- `assets/data/prompts.en.json` — pataisyti du automatinio vertimo artefaktai anglų tekstuose (perteklinis „email. a letter“ / „business email. a letter“).
- Duomenų įkėlimas: nežinomas `data-locale` nebesikreipia į neegzistuojantį `prompts.*.json` — naudojamas atsarginis **`en`** (tada `t()` irgi krenta į EN eilutes).
- Kontaktinė forma: po sėkmingo patvirtinimo arba `reset` iš naujo nustatomas „bandyta siųsti“ būsena, kad neberodytų klaidų tuštiems laukams be naujo submit.
- Mobilus paieškos modalas: prieš naują fokuso spąstą nuimamas senas `keydown` klausytojas (kraštinis dvigubo atidarymo atvejis).

### Changed

- GitHub Pages (`static.yml`): prieš deploy vykdomas **`quality`** jobas (`npm ci` + `npm run verify`); `deploy` priklauso nuo `needs: quality`.
- GitHub Pages (`static.yml`): publikuojamas tik viešas rinkinys (`_site/`: `index.html`, `.nojekyll`, `assets/`, `lt/`, `en/`, `et/`, `lv/`; nebepasiekiami `scripts/`, `package.json`, vidiniai `docs/` ir kt.).
- Kopijavimas: `Clipboard.copy` nebekoreguoja tarpų ir eilučių — į iškarpinę keliauja tiksliai tas pats tekstas kaip `data-copy` / šaltinyje.
- `scripts/validate-prompts-json.mjs` — schemos ir struktūros tikrinimas (`categories`, `prompts`, `totalPrompts` suma), kryžminė LT/EN/ET/LV atitiktis (kategorijų `id` ir užduočių `id` sekos).
- ESLint: `parserOptions.sourceType` — `script` naršyklės `app.js`; pašalintas nenaudojamas `Fuse` globalas; `overrides` Node `.mjs` skriptams (`scripts/**/*.mjs`).
- `npm run verify` — `lint:scripts` (visi `scripts/**/*.mjs`, įskaitant `generate-prompts-from-en.mjs`, `validate-prompts-json.mjs`) ir **visų** `assets/data/prompts.*.json` validacija (ne tik `JSON.parse`).
- Šaknies **`index.html`** numatytoji kalba be `localStorage` / atitikmens — **`en/`** (anksčiau ne anglų atveju buvo `lt/`).
- `assets/css/styles.css` — `.site-header__lang` su **`flex-wrap`**, kad keturių kalbų juosta ir temos mygtukas tilptų siauresnėje antraštėje.
- LT paieškos santrauka ir skyriaus ženkliukas — teisinga lietuviška daugiskaita (`ltTaskForm`); EN ženkliukas „1 task“ / „N tasks“.
- Navigacijos overlay: `aria-hidden` sinchronizuojamas su meniu atidarymu (`Navigation.setExpanded`).
- Nav nuorodos: emoji tik `aria-hidden` span, pavadinimas — ekrano skaitytuvams; dinaminiai „Kopijuoti“ mygtukai su `aria-label` (užduoties pavadinimas).
- Pašalintas `console.log` po sėkmingo bibliotekos inicializavimo.

### Docs

- `GITHUB_SETUP.md` — GitHub Actions kaip Pages šaltinis, `_site` viešas rinkinys, branch protection / CI rekomendacija, tuščio repo pirmas push į **DITreneris/ecommerce**; `AGENTS.md`, `CONTRIBUTING.md` — Pages artefaktas ir `validate-prompts-json.mjs` aprašymas `verify` skiltyje.
- `README.md` — planuojamas viešas URL `ditreneris.github.io/ecommerce`.
- `docs/MULTILINGUAL_STRUCTURE.md`, `QUICK_START.md`, `docs/DOCUMENTATION.md`, `docs/UI_UX_AUDIT_CHECKLIST.md`, `TODO.md`, `.github/PULL_REQUEST_TEMPLATE.md` — ET/LV, keliai ir `verify`.
- `.cursor/rules/lemona-project.mdc` — produkto aprašymas ir globai LT/EN/ET/LV HTML katalogams.
- `docs/archive/notes/P2_IMPLEMENTATION.md` — GitHub Actions nuorodos atnaujintos į `ci.yml` ir `static.yml` (vietoj `deploy.yml`).
- `TODO.md` — paieškos skyrius atskleidžia skirtumą tarp P2 archyvo (Fuse / autocomplete / istorija) ir dabartinės Spin-off 8 `app.js` paieškos.

## [4.0.0] — 2026-03-28

### Added

- `docs/UI_UX_AUDIT_CHECKLIST.md` — rankinio UI/UX audito checklist (klaviatūra, SR, WCAG, LT/EN); įrašas `docs/DOCUMENTATION.md` registre.
- Antraštėje **temos mygtukas** (ciklas: sistema → šviesi → tamsi), `localStorage` raktas `prompt-library-theme`, ankstyvas `data-theme` iš `localStorage` (`lt/index.html`, `en/index.html` `<head>` skriptas) siekiant sumažinti FOUC.
- Paieškos sinchronizacija su URL **`?q=`** (`history.replaceState`).
- **Spin-off Nr. 8** koncepcija: **DI Promptų biblioteka e-komercijai** — prekės ženklas, e. prekybos stiliaus antraštė (mėlyna / lime juosta / CTA), naudų juosta.
- Dvikalbė struktūra: [`lt/index.html`](lt/index.html), [`en/index.html`](en/index.html), šaknies [`index.html`](index.html) nukreipia pagal naršyklės kalbą.
- Duomenų failai: [`assets/data/prompts.lt.json`](assets/data/prompts.lt.json), [`assets/data/prompts.en.json`](assets/data/prompts.en.json); turinys generuojamas naršyklėje iš JSON.
- [`lt/privatumas.html`](lt/privatumas.html), [`en/privacy.html`](en/privacy.html) — minimali privatumo politika.
- [`docs/MULTILINGUAL_STRUCTURE.md`](docs/MULTILINGUAL_STRUCTURE.md) — LT/EN kelių aprašymas.
- [`.nojekyll`](.nojekyll) — GitHub Pages (Jekyll išjungimas).
- [`scripts/generate-prompts-en.mjs`](scripts/generate-prompts-en.mjs) — EN JSON iš LT per viešą Lingva GraphQL API (`npm run generate:en`).

### Changed

- Kopijavimo sėkmės indikatorius kortelėje — CSS klasė `.prompt-card--copied` vietoj inline stilių; toast be perteklinių simbolių.
- Mobilus paieškos modalas: `role="dialog"`, `aria-modal`, `hidden` / `aria-hidden`, fokuso ciklas ir grąžinimas į trigerį; uždarymas be globalaus `onclick` / `window.closeMobileSearch`.
- Tamsiai schemai: `:root[data-theme="dark"]` ir `:root:not([data-theme="light"])` esamuose `@media (prefers-color-scheme: dark)` blokuose, kad veiktų priverstinė šviesi schema tamsioje OS.
- [`assets/js/app.js`](assets/js/app.js) — `fetch` pagal `data-locale`, dinaminis skyrių ir kortelių renderis, lokalizuota sąsaja (LT/EN).
- [`assets/css/styles.css`](assets/css/styles.css) — prekės spalvos ir nauji antraštės / benefit bar komponentai.
- [`.cursor/rules/lemona-project.mdc`](.cursor/rules/lemona-project.mdc) — atnaujinti keliai ir duomenų failai (failo pavadinimas paliktas dėl esamų nuorodų).
- `README.md`, `AGENTS.md`, `QUICK_START.md`, `docs/DOCUMENTATION.md` — temos mygtukas, `?q=`, audito checklist.
- `TODO.md` — GitHub Actions nuorodos į `ci.yml` ir `static.yml` (vietoj pašalinto `deploy.yml`).

### Removed

- [`assets/data/prompts.json`](assets/data/prompts.json) — pakeista į `prompts.lt.json` + `prompts.en.json`.
- Monolitinis [`index.html`](index.html) — pakeistas redirect; ankstesnis turinys archyvuotas į [`docs/archive/legacy-index-monolith-pre-spinoff8.html`](docs/archive/legacy-index-monolith-pre-spinoff8.html).

### Fixed

- `Navigation.setExpanded` — grąžinama anksti, jei nėra `#nav-toggle`, kad `Escape` klaviatūros handleris nekeltų klaidos.

## [3.2.0] — 2026-03-27

### Changed

- Lean repo: seni HTML variantai, migracijos skriptai, vertinimo užrašai ir `app-enhanced.js` perkelti į `docs/archive/` (žr. [docs/archive/README.md](docs/archive/README.md)).
- `README.md`, `AGENTS.md`, `docs/DOCUMENTATION.md`, `GITHUB_SETUP.md`, `TODO.md`, `.cursor/rules/lemona-project.mdc` — atnaujinta po archyvo (kalbos / įėjimas, Pages gidas, dokumentų registras).

### Removed

- Iš šaknies ir iš `assets/js/`: nebenaudojami `index_old.html`, `index_02.html`, `index-enhanced.html`, `migrated-prompts.html`, root `*.js` migracijoms, `app-enhanced.js`, užrašai (`UI_UX_*.md`, `KRITINIS_*.md`, `P2_IMPLEMENTATION.md`, `01_concept.txt` ir kt.) — dabar tik archyve.

## [3.1.0] — 2026-03-26

### Added

- GitHub Actions **CI** (`.github/workflows/ci.yml`) — `npm run verify` ant push / PR.
- **Dependabot** (`.github/dependabot.yml`) — npm atnaujinimai kas savaitę.
- **Issue** šablonai (bug / feature) ir **PR šablonas** (`.github/`).
- `AGENTS.md`, `CONTRIBUTING.md`, `SECURITY.md` — bendradarbiavimas, agentų kontekstas, saugos kontaktas.
- `CHANGELOG.md` — pakeitimų žurnalas.
- `docs/DOCUMENTATION.md` — dokumentų registras ir kokybės valdymas; **privalomas QA dokumentų patikrinimas**.
- `.cursor/rules/lemona-project.mdc`, `.cursor/rules/qa-documentation.mdc` (pastaroji — `alwaysApply`: QA + dokumentų sinchronizacija).
- `npm run verify` — ESLint + Prettier check (`package.json`).

### Changed

- `README.md` — CI, agentai, changelog, dokumentacijos valdymas, failų medis.
- `AGENTS.md` / `CONTRIBUTING.md` — QA checklist su dokumentų eiga.
- `.github/PULL_REQUEST_TEMPLATE.md` — dokumentų / changelog checklist.
- `.cursor/rules/lemona-project.mdc` — QA nuoroda į dokumentų politiką.
- `assets/css/styles.css`, `assets/js/app.js`, `assets/js/app-enhanced.js` — Prettier formatas (CI reikalavimui).

### Removed

- `.github/workflows/deploy.yml` — dublikatas; paliktas vienas Pages deploy (`static.yml`).

## [3.0.0] — 2024 ir vėliau (santrauka)

Ankstesnė istorija nebuvo centralizuota šiame faile. `package.json` versija **3.0.0** atitinka P2 Enhanced statinę aplikaciją (HTML/CSS/JS, GitHub Pages). Nauji pakeitimai pirmiausia rašomi skiltyje **[Unreleased]**, o release metu perkeliami į datuotą versiją.
