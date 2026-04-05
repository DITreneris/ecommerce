# Contributing

Ačiū, kad norite prisidėti prie **Praktinių promptų rinkinio**.

## Reikalavimai prieš PR

1. **Lint ir formatas**

   ```bash
   npm ci
   npm run verify
   ```

   (`verify` = ESLint `assets/js`, ESLint `scripts/**/*.mjs`, Prettier check `assets/js` ir `assets/css`, visų `assets/data/prompts.*.json` struktūros ir kryžminės kalbų atitikties tikrinimas per `scripts/validate-prompts-json.mjs`.)

   Automatiškai tas pats vykdoma GitHub Actions workflow **CI** (`.github/workflows/ci.yml`).

2. **Rankinis patikrinimas** — atidarykite `index.html` lokaliai:

   ```bash
   npm run dev
   ```

   Patikrinkite paiešką, kopijavimą ir pagrindinį navigavimą.

3. **Dokumentacija ir kokybė** — QA turi patvirtinti, kad dokumentai sinchronizuoti su pakeitimais:

   - [docs/DOCUMENTATION.md](docs/DOCUMENTATION.md) — kuriuos failus kada atnaujinti
   - [CHANGELOG.md](CHANGELOG.md) — įrašykite reikšmingus pakeitimus į `[Unreleased]` prieš merge (nebent PR tik doc pataisos be elgsenos)

## Kur dėti pakeitimus

- Nauji ar pataisyti promptai: `prompts.lt.json` + sinchronizuoti `prompts.en.json` (`npm run generate:en` po LT keitinių); ET/LV iš EN — `npm run generate:et` / `generate:lv`.
- Elgsena / UI: `assets/js/app.js`, `assets/css/styles.css`.
- Naujos kalbos ar entry taškai: atitinkami `index*.html` failai.

## Commit žinutės

Trumpai ir aiškiai, pvz. `fix: paieškos highlight mobile`, `docs: README nuoroda į CI`.

## AI agentai (Cursor ir kt.)

Žr. [AGENTS.md](AGENTS.md) — architektūra, „ne daryti“ sąrašas ir QA checklist.

## Klausimai

Atsidarykite [GitHub Issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue) naudodami repo šablonus (bug / feature).
