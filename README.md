# DI Promptų biblioteka e-komercijai (Spin-off Nr. 8)

~**107** praktinių DI užduočių verslui, e-komercijai ir operacijoms — kopijuojami promptai ChatGPT, Claude ir kitiems įrankiams.

## Įėjimas ir kalbos

1. Atidarykite šaknies [`index.html`](index.html) — pirmiausia įsiminta kalba (`localStorage` **`prompt-library-lang`**), tada naršyklės kalba į **[`lt/`](lt/index.html)**, **[`en/`](en/index.html)**, **[`et/`](et/index.html)** arba **[`lv/`](lv/index.html)** (numatytoji — `en/`).
2. Kalbą galite perjungti nuorodomis **LT | EN | ET | LV** antraštėje (perjungus išsaugomas **`?q=`**).

Daugiau: [docs/MULTILINGUAL_STRUCTURE.md](docs/MULTILINGUAL_STRUCTURE.md).

## Funkcijos

- Kol kraunasi bibliotekos JSON, rodomas **skeleton** `#prompts-container`; hero pagrindinis CTA (**„Atverti biblioteką“** / EN **„Open the library“**) ir statistikos žymės veda į **`#library`**; antrinė nuoroda į **„Trumpa instrukcija“** (`#guide`); po herojaus — **greitos paieškos** mygtukai (chips); viršutiniame meniu pirmi **6** skyriai + **„Daugiau“** su likusiais; pasitikėjimo juosta **„Kam skirta“** prieš biblioteką
- Šriftas **DM Sans** (Google Fonts, LT/EN/ET/LV); neutrali paletė su mėlynu akcentu, **SVG** skyrių ikonos (nav + biblioteka), temų jungiklis ir naudos juosta / „Kopijuoti“ — stroke ikonos
- Progress bar, toast po kopijavimo (su trumpu **kito žingsnio** tekstu), back-to-top
- Paieška antraštėje su paryškinimu; URL parametras **`?q=`** sinchronizuojamas su paieška (galima dalintis nuoroda); keli žodžiai — **AND** logika; tuščiai paieškai — užuomina ir **išvalyti**
- **Dalijimosi nuoroda į vieną užduotį:** į puslapio URL galite įrašyti **`?prompt=<id>`** (pvz. `.../lt/?prompt=42`) arba fragmentą **`#prompt-<id>`** po to, kai puslapis jau atidarytas tame kataloge (`.../lt/#prompt-42`). `<id>` — skaitinis užduoties numeris iš JSON (`id` laukas). Po atidarymo paieška išvaloma (`q`), sąrašas slenkamas prie kortelės. Trumpa pastaba ir footeryje LT/EN/ET/LV puslapiuose.
- Mobilus apatinis baras (ieškoti / skyriai); paieškos sluoksnis su dialogo prieinamumu ir fokuso ciklu
- `/` — fokusas į paiešką, `Esc` — uždaryti modalą
- Spalvinė schema: **pagal OS**, arba **šviesi** / **tamsi** (mygtukas antraštėje šalia kalbų jungiklio, išsaugoma naršyklėje)

## Naudojimas

1. **Raskite užduotį** — paieška antraštėje arba skyrių meniu (`#library`).
2. Spauskite **Kopijuoti** — tekstas nukopijuojamas į iškarpinę.
3. Įklijuokite į DI įrankį ir pakeiskite `[laukus]` savo duomenimis. Trumpas kelias aprašytas hero, skiltyje **Kaip naudoti** ir po antrašte „Visos užduotys“.

## Turinio šaltinis

- Lietuvių: [`assets/data/prompts.lt.json`](assets/data/prompts.lt.json)
- Anglų: [`assets/data/prompts.en.json`](assets/data/prompts.en.json)
- Eesti: [`assets/data/prompts.et.json`](assets/data/prompts.et.json)
- Latviešu: [`assets/data/prompts.lv.json`](assets/data/prompts.lv.json)

Sąsaja įkelia atitinkamą failą pagal `data-locale` (`lt` / `en` / `et` / `lv`) puslapyje.

- Anglų failą iš LT (reikia tinklo): `npm run generate:en` → [`scripts/generate-prompts-en.mjs`](scripts/generate-prompts-en.mjs) (Lingva GraphQL).
- ET ir LV iš EN (reikia tinklo): `npm run generate:et`, `npm run generate:lv` → [`scripts/generate-prompts-from-en.mjs`](scripts/generate-prompts-from-en.mjs).

## GitHub Pages

Žr. [GITHUB_SETUP.md](GITHUB_SETUP.md). Įprastas kelias po publikavimo: `https://<user>.github.io/<repo>/` → šaknies redirect pagal kalbą (įskaitant `et/`, `lv/`). Planuojamas viešas katalogas: **[github.com/DITreneris/ecommerce](https://github.com/DITreneris/ecommerce)** → `https://ditreneris.github.io/ecommerce/` (po Pages įjungimo ir deploy).

## Technologijos

HTML5, CSS3, vanilla JavaScript (be bundlerio produkcijoje), ESLint, Prettier, `serve` lokaliai.

## Kūrimas ir kokybė

- [CONTRIBUTING.md](CONTRIBUTING.md) — lint, formatas, PR
- [AGENTS.md](AGENTS.md) — failų žemėlapis agentams
- [CHANGELOG.md](CHANGELOG.md) — pakeitimai
- [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md) — dokumentų QA
- CI: `.github/workflows/ci.yml` — `npm run verify`

## Failų struktūra (santrauka)

```
.
├── index.html              # Redirect → lt/ | en/ | et/ | lv/
├── lt/index.html           # Biblioteka (LT)
├── en/index.html           # Library (EN)
├── et/index.html           # Raamatukogu (ET)
├── lv/index.html           # Bibliotēka (LV)
├── lt/privatumas.html      # Privatumas (LT)
├── en/privacy.html         # Privacy (EN)
├── et/privacy.html
├── lv/privacy.html
├── assets/
│   ├── css/styles.css
│   ├── js/app.js
│   └── data/
│       ├── prompts.lt.json
│       ├── prompts.en.json
│       ├── prompts.et.json
│       └── prompts.lv.json
├── docs/
└── scripts/
    ├── generate-prompts-en.mjs
    ├── generate-prompts-from-en.mjs
    └── validate-prompts-json.mjs
```

## Licencija

MIT
