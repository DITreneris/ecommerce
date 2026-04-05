# UI/UX audito checklist (Spin-off Nr. 8)

Naudokite prieš release ar po didesnių sąsajos pakeitimų. Atlikus patikrą užpildykite stulpelį **Patikrinta** (data / inicialai) ir trumpą pastabą.

## Klaviatūra

| #   | Patikrinimas                                                      | Patikrinta                                  |
| --- | ----------------------------------------------------------------- | ------------------------------------------- |
| K1  | Tab eilė logiška (skip link → antraštė → turinys → forma)         | `npm run verify` + kodas: focus trap modale |
| K2  | `/` fokusuoja antraštės paiešką (neįvedant į lauką)               |                                             |
| K3  | `Esc` uždaro mobilų paieškos modalą ir grąžina fokusą į trigerį   |                                             |
| K4  | `Esc` uždaro iškleidžiamą navigaciją (mobilus)                    |                                             |
| K5  | Modale Tab ciklas tarp fokusuojamų elementų (be „išėjimo“ į foną) |                                             |

## Ekrano skaitytuvai ir ARIA

| #   | Patikrinimas                                                                        | Patikrinta |
| --- | ----------------------------------------------------------------------------------- | ---------- |
| S1  | Yra `main`, `nav` landmarkai                                                        |            |
| S2  | Paieškos rezultatų santrauka su `aria-live="polite"`                                |            |
| S3  | Mobilus paieškos sluoksnis: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` |            |
| S4  | Formos klaidos susietos su `aria-describedby` / `aria-invalid`                      |            |

## WCAG 2.2 / fokusas

| #   | Patikrinimas                                                                                         | Patikrinta |
| --- | ---------------------------------------------------------------------------------------------------- | ---------- |
| W1  | Fokusuojami elementai matomi (sticky antraštė / apatinė juosta neuždengia visiškai) — rankinis LT/EN/ET/LV |            |
| W2  | `prefers-reduced-motion`: sumažintos animacijos                                                      |            |
| W3  | Kontrastas mygtukuose ir nuorodose — regėjimo patikra naršyklėje                                     |            |

## Funkciniai (LT / EN / ET / LV)

| #   | Patikrinimas                                                                                   | Patikrinta |
| --- | ---------------------------------------------------------------------------------------------- | ---------- |
| F1  | Įkelta biblioteka, skaičiai herojuje sutampa su JSON                                           |            |
| F2  | Kopijuoti → iškarpinėje teisingas `copyText`                                                   |            |
| F3  | Paieška filtruoja ir paryškina; tuščia paieška atstato viską                                   |            |
| F4  | URL `?q=` įkrovus puslapį pritaiko paiešką; keičiant paiešką URL atnaujinamas (`replaceState`); kalbų nuorodos išsaugo `?q=` |            |
| F5  | Tema: ciklas sistema → šviesi → tamsi; išsaugoma `localStorage`; sinchronas su `theme-color`   |            |

## Pastabos (2026-03-26 įgyvendinimas)

- Automatinis patikrinimas: `npm run verify` (lint ir kt.).
- K1, K5, S3, F4, F5 įgyvendinta kode šiame PR; **W1 ir regos patikros** lieka rankinės naršyklėje (`npm run dev` → `lt/`, `en/`, `et/`, `lv/`).
