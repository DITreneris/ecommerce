# Dokumentų valdymas ir kokybė

## Tikslas

- Žinoti, **kuris failas yra šaltinis** kuriai temai.
- **QA privalo** užtikrinti, kad elgsenos ar viešo pobūdžio pakeitimai atsispindi dokumentacijoje ir `CHANGELOG.md`.

## Dokumentų registras

| Dokumentas                                                                              | Paskirtis                                                                    | Kada atnaujinti                                               |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [README.md](../README.md)                                                               | Naudotojui: kas tai, kaip naudoti, funkcijos                                 | Naujos funkcijos, kalbos, deploy, matomas UX                  |
| [CHANGELOG.md](../CHANGELOG.md)                                                         | Kas pasikeitė versijose (žmonėms ir release)                                 | Kiekviena reikšminga pataisa / funkcija / tooling             |
| [TODO.md](../TODO.md)                                                                   | Vidinės užduotys ir backlog                                                  | Užduotis uždaromos/atidaromos pagal darbą                     |
| [QUICK_START.md](../QUICK_START.md)                                                     | Trumpas startas                                                              | Pasikeitus minimaliam naudojimo keliui                        |
| [GITHUB_SETUP.md](../GITHUB_SETUP.md)                                                   | Pages ir repo setup                                                          | Pasikeitus deploy ar GitHub žingsniams                        |
| [AGENTS.md](../AGENTS.md)                                                               | AI agentų kontekstas                                                         | Architektūra, įrankiai, QA checklist                          |
| [CONTRIBUTING.md](../CONTRIBUTING.md)                                                   | PR ir kokybės gairės                                                         | CI, lint, proceso pakeitimai                                  |
| [SECURITY.md](../SECURITY.md)                                                           | Saugos pranešimai                                                            | Pasikeitus rizikoms ar kontaktui                              |
| `docs/DOCUMENTATION.md` (šis failas)                                                    | Dokumentų politika                                                           | Nauji kanoniniai doc failai ar QA taisyklės                   |
| [docs/archive/](archive/README.md)                                                      | Seni HTML/JS/skriptai ir darbo užrašai                                       | Tik istorija; ne produkcijos kelias                           |
| [docs/archive/notes/memo_ee_lv.md](archive/notes/memo_ee_lv.md)                         | ET/LV lokalės ir migracijos užrašas (advisory, senesnis pipeline kontekstas) | Perkeliant ar keičiant daugiakalbystės / generatoriaus gaires |
| [docs/MULTILINGUAL_STRUCTURE.md](MULTILINGUAL_STRUCTURE.md)                             | LT/EN/ET/LV keliai ir failai                                                 | Pasikeitus įėjimui, kalboms ar duomenų failams                |
| [docs/UI_UX_AUDIT_CHECKLIST.md](UI_UX_AUDIT_CHECKLIST.md)                               | Prieš release: klaviatūra, SR, WCAG, funkcinis visoms kalboms                | Po matomų UI/UX elgsenos pakeitimų ar prieš release           |
| [docs/UI_UX_ITERATION_PLAN.md](UI_UX_ITERATION_PLAN.md)                                 | Ciklinis UI/UX darbo planas ir kanoninė vykdymo eilė                         | Pradedant naują iteracijos etapą ar uždarius milestone        |
| [docs/UI_UX_ITERATION_BACKLOG.md](UI_UX_ITERATION_BACKLOG.md)                           | Ilgalaikė UX/UI kritika ir 8 iteracijų aprašai                               | Po strateginių UX sprendimų ar etapo įgyvendinimo             |
| [docs/COPY_UX_AUDIT_LT_EN_LV_ET_2026-04-05.md](COPY_UX_AUDIT_LT_EN_LV_ET_2026-04-05.md) | Copy / UX auditas visoms kalboms (107 promptai), remediacijos istorija       | Po didelių `prompts.*.json` ar vertimo proceso pakeitimų      |

Dizaino / vertinimo užrašai ir P2 užrašai perkelti į **`docs/archive/notes/`**. Aktyviam planavimui atnaujinkite tik jei sąmoningai dirbate su archyvu.

## QA: privalomas dokumentų patikrinimas

Prieš užbaigiant PR ar release **patikrinkite**:

1. **CHANGELOG** — ar į `[Unreleased]` įrašyti esminiai pakeitimai (Added/Changed/Fixed/Removed)?
2. **README** — ar naudotojui matomi pokyčiai atsispindi (funkcijos, failų struktūra, nuorodos)?
3. **AGENTS.md / CONTRIBUTING.md** — ar atnaujinta, jei pasikeitė įrankiai, komandos, CI ar failų žemėlapis?
4. **TODO.md** — ar uždarytos/atnaujintos eilutės, jei darbas susijęs su sąraše esančiomis užduotimis?

Jei pakeitimas **tik** vidinis (pvz., refaktorius be elgsenos) — changelog įrašas gali būti viena eilutė „Internal: …“ arba praleistas, jei komanda sutaria, kad nereikšminga; tokiu atveju PR aprašyme vis tiek trumpai paaiškinkite.

## Release pastaba

Naują versiją žymint `package.json` ir CHANGELOG:

1. Perkelkite `[Unreleased]` turinį į naują antraštę `## [X.Y.Z] — YYYY-MM-DD`.
2. Palikite tuščią `[Unreleased]` naujiems įrašams.
