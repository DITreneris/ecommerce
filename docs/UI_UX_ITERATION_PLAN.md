# UI/UX ciklinis darbo planas (Spin-off Nr. 8)

**Tikslas:** nuolatinė iteracija be „vieno didelio redesign“ — struktūra ir kelionė pirma, vizualas vėliau.

**Šaltiniai:** [UI_UX_ITERATION_BACKLOG.md](UI_UX_ITERATION_BACKLOG.md) (detalė ir 8 iteracijos), [UI_UX_AUDIT_CHECKLIST.md](UI_UX_AUDIT_CHECKLIST.md) (regresijos ir prieinamumas), [AGENTS.md](../AGENTS.md) (failų žemėlapis ir QA).

**Cursor:** taisyklė `.cursor/rules/ui-ux-iteration.mdc` — įjungiama dirbant su sąsaja (HTML/CSS/`app.js`).

---

## 1. Ciklas (kartoti po kiekvieno PR ar etapo)

| Žingsnis       | Ką padaryti                                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| **Baseline**   | Naršyklėje `lt/`, `en/`, `et/`, `lv/` + checklist (ypač K1–K5, S1–S4, W1–W3, F1–F7).                            |
| **Pick**       | Vienas darinys iš kanoninės eilės (§2) arba vienas „low-hanging fruit“ blokas iš backlog.                       |
| **Spec**       | Trumpai: problema → hipotezė → keičiami failai → rizika (a11y, keturios kalbos).                                |
| **Implement**  | Maži diffai; vanilla JS; be naujo framework; copy — visos kalbos, jei matomas tekstas.                          |
| **Verify**     | `npm run verify`; rankinis checklist; jei liesti `prompts.*.json` — skaičiai/herojus sutampa (F1).              |
| **Dokumentai** | `CHANGELOG.md` `[Unreleased]`; atnaujinti šį planą ar backlog trumpa pastaba (data / PR), jei etapas uždarytas. |
| **Retro**      | Ar pagerėjo: vienas aiškus pirmas veiksmas, mažiau konkuruojančių sluoksnių viršuje, paieška kaip kelias.       |

---

## 2. Kanoninė vykdymo eilė (ROI)

Ši eilė yra **prioritetas prieš** numeruotas „Iteration 1–8“ etiketes: pirmiau struktūra ir atradimas, **tik paskui** bendras vizualinis sluoksnis (atitinka backlog pabaigoje „Recommended execution order“).

| Eilė | Fokusas                                             | Atitinka backlog |
| ---- | --------------------------------------------------- | ---------------- |
| 1    | Puslapio struktūra ir sekcijų tvarka                | Iteration 1      |
| 2    | Hero, CTA hierarchija, proof mikrotekstai           | Iteration 2      |
| 3    | Kategorijų / navigacijos supaprastinimas            | Iteration 5      |
| 4    | Užduočių kortelės                                   | Iteration 6      |
| 5    | Paieškos UX (pavyzdžiai, chips, būsenos)            | Iteration 4      |
| 6    | Pasitikėjimas ir įrodymai                           | Iteration 8      |
| 7    | Vizualinė sistema (spalvos, tipografija, tokenai)   | Iteration 3      |
| 8    | Kelionės optimizacija („Start here“, po kopijavimo) | Iteration 7      |

**Kryptis (nekeisti):** „functional premium SaaS“ — daugiau tuščios vietos, mažiau lygiagrečių „šaukiančių“ elementų, paieška kaip pagrindinis atradimo kanalas ([UI_UX_ITERATION_BACKLOG.md](UI_UX_ITERATION_BACKLOG.md) „Better option“).

---

## 3. Įgyvendinimo žemėlapis (repo)

| Tema                                           | Failai                                                             |
| ---------------------------------------------- | ------------------------------------------------------------------ |
| Hero, `#guide`, `#library`, antraštės, juostos | `lt/index.html`, `en/index.html`, `et/index.html`, `lv/index.html` |
| Elgsena, paieška, modalai, render              | `assets/js/app.js`                                                 |
| Vizualas, kortelės, navigacija                 | `assets/css/styles.css`                                            |
| Dinaminis turinys / keywords                   | `assets/data/prompts.{lt,en,et,lv}.json`                           |

---

## 4. Kas dabar (šablonas)

- **Dabartinis etapas (eilė §2):** po 2026-04-07 — **Iteration 3** dalis (neutralūs vizualiniai tokenai, viena ikonų kalba SVG, be `categories[].icon` JSON); turinio higiena — emoji pašalinti iš `prompts.*.json` užduočių laukų. Ankstesni etapai 1–8 (2026-04-06) žemiau.
- **Paskutinė patikra (data):** 2026-04-07 — `npm run verify`; `docs/UI_UX_AUDIT_CHECKLIST.md` papildyta; W1/W3 — rankinis prieš release (nauja paletė / antraštė).
- **Atidaryti rizikos:** — (chips žetonai 2026-04-06 sutikrinti su JSON visoms kalboms).

---

## 5. Dažnos klaidos (iš backlog)

1. Per didelis scope iš karto (pilnas design system prieš IA).
2. Gražus UI be aiškios hierarchijos.
3. Per daug vienodo svorio elementų above the fold — premium UX dažnai = atimti.
