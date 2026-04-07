# Copy ir UX auditas: LT, EN, LV, ET (`prompts.*.json`)

**Data:** 2026-04-05  
**Apimtis:** 107 užduočių (`title`, `text`/`copyText`, `keywords`), palyginimas su vartotojo (kopijuojančio promptą) patirtimi.  
**Pastaba:** `prompts.lt.json` = **lietuvių** kalba (ne LV). Estų failas: `prompts.et.json` (EE).

---

## 1. Santrauka vadybai

| Kalba       | Bendras įspūdis                                                                         | Pagrindinė problema                                                                                                                        |
| ----------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **LT**      | Aukšta kokybė: detalūs `text`, nuoseklus „tu“ tonas, mažai klaidų                       | Pavienės leksikos/ skyrybos klaidos; PVM tekstas fiksuotas „Latvijos“ pirkėjams (žr. žemiau)                                               |
| **EN**      | Turinys dažnai geras, bet **keywords** ir dalis frazių atrodo kaip automatinis vertimas | Sulaužyti sakiniai („email. commerce“), LT fragmentai promptuose, klaidingi keyword’ai, antraštžių stilius                                 |
| **LV**      | Struktūrinis paritetas su LT, bet **didelis turinio sutrumpinimas** ir MT artefaktai    | Daugelis `text` = 1 sakinys vs LT apsakymai; suplėšyti galo pavyzdžiai (`piem.`); klaidingi keyword’ai; „ilgi“ promptai 102–107 be turinio |
| **ET (EE)** | Panašiai kaip LV: sutrumpinta, MT klaidos registrų ir terminų lygiu                     | „Kuuaruanne“, „Lätist ostjatele“ PVM tekste, „hukkamine“ agentui, keyword šiukšlės                                                         |

**Kritinis UX neatitikimas tarp kalbų:** toje pačioje užduotyje LT vartotojas gauna išsamų šabloną, LV/ET — dažnai tik vieną eilutę. Tai didina nepasitikėjimą ir „neišbaigtumo“ jausmą.

**Kategorijų problema (visos kalbos):** tie patys ID (pvz. 64–67, 71, 79–82) yra skiltyje **Sales**, nors tematiškai tai IT/HR/finansai. Tai **navigacijos ir mentalinio modelio** klaida, ne tik vertimo.

---

## 2. Vertinimo skalė (kiekvienam ID)

- **A** — aišku, be pastebimų klaidų; atitinka kitas kalbas pagal gylį.
- **B** — smulkmenos (skyryba, stilius, keyword).
- **C** — reikia taisymo (prasmė, gramatika, sulaužytas sakinys, neatitikimas LT).
- **D** — kritiška: klaidinga prasmė, nutrauktas tekstas, svetima kalba viduje, klaidinga šalies lokalizacija.

---

## 3. Sisteminiai radiniai

### 3.1. Keywords (paieška UX)

Daugelyje kalbų `keywords` masyvai turi **ne žodžių, o vertimo triukšmą**: pvz. „duktė / tütar / meita“ prie DUK (ID 6), „objektai / objektid“ vietoj „iebildumi / objections“ (ID 10), „mesti / viskamine“ vietoj „meta“ (ID 29), „mar / rm“ vietoj „rma“ (ID 23), „swt / mēris / katk“ vietoj „swot / pest“ (ID 85–86), „įrašas / rekord“ = „post“, ne „record“ (LinkedIn). Tai **kenkia paieškai** ir atrodo neprofesionaliai.

### 3.2. Sulaužyti arba sumaišyti sakiniai (EN)

- ID **27**, **60**, **69**, **102**, **104**: perteklinis arba klaidingai perkirstas „email“.
- ID **71**: lietuviškas sakinys įterptas į anglišką `text`.
- ID **106**: lietuviška antraštė „TYRIMO METODOLOGIJA (5 FAZĖS)“ anglų tekste.
- ID **107**: lietuviški fragmentai progreso bloke („Laukia“, „kas liko“), „eskalavik“ → _escalate_.

### 3.3. Kanban stulpeliai (EN, ID 98)

Tekste: „Done, In Progress, Under Review, Completed“ — logiškai dubliuoja „baigta“ ir neatitinka tipinės Kanban pradžios (**To Do / Backlog**). LT variantas nuoseklesnis.

### 3.4. PVM paaiškinimas (ID 68) — lokalizacija

Visose keturiose kalbose minimi **Latvijos** pirkėjai. Tai logiška tik **LV** versijai ir galbūt „Baltijos“ kontekstui. **LT** turėtų Lietuvą, **ET** — Estiją (arba neutralus „ES pirkėjai“ + placeholder šaliai).

### 3.5. LV ir ET: nutraukti šablonai

ID **42**, **44**, **97** (ir dalinai kiti): `text` baigiasi „[… piem.“ be uždarančios dalies — vartotojas negali užbaigti užduoties be spėliojimo.

### 3.6. Ilgieji „🎯 / 🔧 / 🤖“ promptai (ID 102, 104, 101, 103, 105–107)

- **LT** — pilni scenarijai.
- **EN** — daugiausia pilni, bet su 3.2 problemomis.
- **LV / ET** — dažnai **tik rolės eilutė + tuščios eilutės**: kopijuojant tokią užduotį, DI gauna per mažai konteksto. Tai **D lygio** funkcinis neatitikimas LT atžvilgiu.

### 3.7. LT pavienės klaidos

- **ID 67:** „kasdien/ **kaip** savaitę“ → turėtų būti „**kas** savaitę“.
- **ID 18:** „**jėgos majėjimo** riziką“ — neįprasta / tikėtina klaida (turėtų būti pvz. derybų galia / _bargaining power_).
- **ID 80 (IT):** „**Parenk** … politikos projektą“ — čia tikėtina „**Paruošk**“ arba „**Sudaryk**“ („parenkti“ = rinkti, ne rengti dokumentą).

---

## 4. Promptų lentelė (107 įrašų)

Žymėjimas: **A/B/C/D** — žr. 2 skyrių. „Gylis“ — ar `text` artimas LT detalumui.

| ID  | Kategorija (failas) | LT  | EN  | LV  | ET  | Pastabos (prioritetas)                                                           |
| --- | ------------------- | --- | --- | --- | --- | -------------------------------------------------------------------------------- |
| 1   | start               | A   | B   | B   | B   | EN antraštė be Title Case; ET antraštė nuo mažosios                              |
| 2   | start               | A   | A   | A   | B   | ET „120-sõnaline“ ok; keyword’ai tvarkingesni nei kitur                          |
| 3   | start               | A   | A   | A   | C   | ET pavadinimas „Kuuaruanne“ → tikėtina **Igakuine aruanne**                      |
| 4   | sales               | A   | A   | A   | A   | —                                                                                |
| 5   | finance             | A   | A   | A   | A   | —                                                                                |
| 6   | sales               | A   | C   | C   | C   | Keywords: EN „daughter“, LV „meita“, ET „tütar“ — **MT klaida**                  |
| 7   | sales               | A   | A   | A   | A   | —                                                                                |
| 8   | sales               | A   | A   | C   | B   | LV labai sutrumpinta vs LT                                                       |
| 9   | productivity        | A   | A   | A   | A   | —                                                                                |
| 10  | sales               | A   | C   | C   | C   | „object“ vs **objection**; LV/ET keywords klaidingi                              |
| 11  | logistics           | A   | A   | A   | A   | —                                                                                |
| 12  | procurement         | A   | C   | C   | C   | EN/LV dviguba formulacija „write email send letter“                              |
| 13  | it                  | A   | A   | A   | A   | —                                                                                |
| 14  | sales               | A   | A   | C   | C   | LV/ET RFQ tekstas skamba kaip **pasiūlymas**, ne užklausa tiekėjams              |
| 15  | procurement         | A   | A   | A   | A   | —                                                                                |
| 16  | productivity        | A   | A   | C   | C   | LV/ET „papildymo kogus“ / ET gramatika prie „täiendamise kogused“                |
| 17  | advanced            | A   | A   | A   | A   | —                                                                                |
| 18  | analytics           | B   | B   | B   | B   | LT „jėgos majėjimo“ — taisyti terminą                                            |
| 19  | logistics           | A   | A   | A   | A   | —                                                                                |
| 20  | logistics           | A   | A   | A   | A   | —                                                                                |
| 21  | logistics           | A   | A   | B   | B   | LV/ET trailing space; turinys OK                                                 |
| 22  | analytics           | A   | A   | A   | A   | —                                                                                |
| 23  | sales               | A   | B   | B   | B   | Keywords „rm“ vietoj **rma** visur                                               |
| 24  | productivity        | A   | A   | A   | A   | —                                                                                |
| 25  | logistics           | A   | A   | A   | B   | ET „Loo“ vs „Looge“ — forma nesuderinta                                          |
| 26  | ecommerce           | A   | A   | A   | A   | —                                                                                |
| 27  | ecommerce           | A   | D   | C   | B   | EN sulaužyta: „email. for store“; LV „e-pastā“ vietoj parduotuvės                |
| 28  | sales               | A   | A   | A   | A   | —                                                                                |
| 29  | ecommerce           | A   | C   | C   | C   | Keywords „throwing / mešana / viskamine“ — **klaida**                            |
| 30  | marketing           | A   | A   | A   | A   | —                                                                                |
| 31  | sales               | A   | C   | A   | A   | EN „3 emails mail“ perteklius                                                    |
| 32  | analytics           | A   | A   | A   | A   | —                                                                                |
| 33  | ecommerce           | A   | A   | A   | A   | —                                                                                |
| 34  | ecommerce           | A   | A   | A   | B   | ET „Loo“ formalumas                                                              |
| 35  | sales               | A   | A   | A   | A   | —                                                                                |
| 36  | ecommerce           | A   | A   | A   | B   | ET „Loo“                                                                         |
| 37  | design              | A   | A   | A   | A   | —                                                                                |
| 38  | sales               | A   | B   | B   | B   | Keywords „mature / nobriedis / küps“ — **netinkamas** vertinys „brand“ kontekste |
| 39  | design              | A   | A   | C   | B   | LV „10 sociālajiem tīkliem“ — tikėtina „10 grafiku/ierakstu“                     |
| 40  | design              | A   | A   | A   | A   | —                                                                                |
| 41  | design              | A   | A   | A   | A   | —                                                                                |
| 42  | design              | A   | A   | D   | D   | LV/ET tekstas **nutrūksta** ties „piem.“                                         |
| 43  | design              | A   | A   | A   | A   | —                                                                                |
| 44  | design              | A   | A   | D   | D   | LV/ET nutrūkęs; LV „Izveidot“ be „iet“                                           |
| 45  | analytics           | A   | A   | A   | A   | —                                                                                |
| 46  | analytics           | A   | A   | A   | A   | —                                                                                |
| 47  | analytics           | A   | A   | A   | A   | —                                                                                |
| 48  | analytics           | A   | A   | A   | A   | —                                                                                |
| 49  | analytics           | A   | A   | B   | B   | ET „Loo“                                                                         |
| 50  | analytics           | A   | B   | A   | A   | EN keywords „the test“ perteklius                                                |
| 51  | it                  | A   | A   | A   | A   | —                                                                                |
| 52  | analytics           | A   | A   | C   | C   | LV „Pārvaldībai“ — dubleris / kalbos triukšmas                                   |
| 53  | marketing           | A   | A   | C   | A   | LV „Uzraksti“ (tu) vs formalūs kiti                                              |
| 54  | marketing           | A   | B   | A   | B   | EN keyword „record“ → **post**                                                   |
| 55  | sales               | A   | B   | B   | A   | EN „directory“ katalogui                                                         |
| 56  | sales               | A   | B   | B   | B   | Keywords „message/for the press“ — EN perteklius                                 |
| 57  | sales               | A   | B   | A   | B   | EN/LV/ET „record“ vietoj **post**                                                |
| 58  | sales               | A   | B   | A   | B   | EN „a lesson“ keyword — netinka                                                  |
| 59  | analytics           | A   | B   | C   | C   | Keywords „good luck“ / „palju õnne“ — **netinkama** sėkmės istorijai             |
| 60  | marketing           | A   | C   | B   | B   | EN „email email“; LV „[period]“ ne lokalizuota                                   |
| 61  | it                  | A   | B   | A   | A   | EN „mistake/repair“ nesklandu                                                    |
| 62  | analytics           | A   | A   | A   | A   | —                                                                                |
| 63  | it                  | A   | C   | A   | A   | EN „Email mail“ dubleris                                                         |
| 64  | sales               | A   | A   | A   | A   | **Kategorija** turėtų būti IT, ne Sales (visos kalbos)                           |
| 65  | sales               | A   | A   | A   | A   | Tas pats **kategorijos** neatitikimas                                            |
| 66  | sales               | A   | B   | B   | C   | EN „approx“ vietoj API; ET „u“ keyword                                           |
| 67  | sales               | B   | A   | A   | A   | LT **„kaip savaitę“** → „kas savaitę“                                            |
| 68  | finance             | B   | B   | A   | D   | PVM: LV ok; **LT/EN/ET turėtų LT/UK/EE** pirkėjus, ne Latviją                    |
| 69  | it                  | A   | C   | A   | A   | EN „email. letter“                                                               |
| 70  | analytics           | A   | A   | A   | A   | —                                                                                |
| 71  | sales               | A   | D   | A   | A   | **EN lietuviškas fragmentas** tekste                                             |
| 72  | analytics           | A   | B   | A   | A   | EN „politics“ expense policy keyword                                             |
| 73  | analytics           | A   | B   | A   | A   | EN „summary summary“ dubleris                                                    |
| 74  | analytics           | A   | B   | A   | A   | EN „of profit“ keyword                                                           |
| 75  | it                  | A   | B   | A   | A   | EN „list“ vietoj checklist aiškumo                                               |
| 76  | ecommerce           | A   | B   | B   | B   | Keywords „of work“ / „no darba“ — prielinksnio klaida                            |
| 77  | hr                  | A   | A   | A   | A   | —                                                                                |
| 78  | hr                  | A   | A   | B   | B   | LV/ET onboarding terminai skirtingai tikslūs                                     |
| 79  | sales               | A   | B   | C   | B   | Keywords „activities/reversible“ — netinka veiklos vertinimui                    |
| 80  | it                  | B   | B   | A   | A   | LT **„Parenk“** → „Paruošk“ / „Sudaryk“                                          |
| 81  | sales               | A   | A   | A   | A   | —                                                                                |
| 82  | sales               | A   | B   | C   | B   | LV „profesionāla“ giminė / linksnis klaidingas                                   |
| 83  | hr                  | A   | B   | B   | B   | Keywords „reversible/connection“ — nesusiję su įsitraukimu                       |
| 84  | ecommerce           | A   | B   | B   | A   | —                                                                                |
| 85  | analytics           | A   | C   | C   | B   | Keywords **swt** / **mēris** / **katk** vietoj SWOT/PEST santraukos              |
| 86  | analytics           | A   | C   | C   | C   | Keyword **plague** (EN), **mēris** (LV) — PEST akronimas                         |
| 87  | productivity        | A   | A   | A   | A   | —                                                                                |
| 88  | it                  | A   | A   | A   | A   | —                                                                                |
| 89  | productivity        | A   | A   | B   | B   | LV „gudrs“ SMART vietoj akronimo paaiškinimo                                     |
| 90  | productivity        | A   | B   | A   | A   | EN „deep agenda blocks“ nesklandu                                                |
| 91  | productivity        | A   | A   | A   | A   | —                                                                                |
| 92  | sales               | A   | B   | B   | B   | EN „etc“ vietoj GTD                                                              |
| 93  | productivity        | A   | A   | B   | B   | LV „dziļu“ — „padziļināts“?                                                      |
| 94  | productivity        | A   | A   | B   | B   | LV „iknedēļas“ forma                                                             |
| 95  | productivity        | A   | A   | A   | B   | ET „Energiamajanduse“ — tikrinkite terminą                                       |
| 96  | productivity        | A   | A   | C   | C   | LV „paradumu“ vs „ieradumu“ painiava                                             |
| 97  | productivity        | A   | A   | D   | D   | LV/ET **nutrūkęs** tekstas                                                       |
| 98  | sales               | A   | C   | C   | B   | EN stulpelių logika; LV „Kanban valdes“ — „tahvel“?                              |
| 99  | productivity        | A   | A   | A   | A   | —                                                                                |
| 100 | it                  | A   | A   | A   | A   | —                                                                                |
| 101 | analytics           | A   | A   | D   | D   | LV/ET be metodikos — tik 1–2 sakiniai                                            |
| 102 | sales               | A   | D   | D   | D   | Sulaužyti EN; LV/ET be LT lygio turinio                                          |
| 103 | ecommerce           | A   | A   | D   | D   | LV/ET be redakcinio kalendoriaus struktūros                                      |
| 104 | sales               | A   | D   | D   | D   | Kaip 102                                                                         |
| 105 | advanced            | A   | A   | D   | D   | LV/ET be sisteminio prompto struktūros                                           |
| 106 | analytics           | A   | C   | D   | D   | EN LT antraštė; LV/ET sutrumpinta                                                |
| 107 | advanced            | A   | D   | D   | D   | EN/ LT mišinys; ET **„hukkamine“** (vykdymas ≠ egzekucija žodyje)                |

---

## 5. Rekomenduojamas taisymų backlog

1. **P0 (kritinis):** ID **42, 44, 97** (LV, ET) — užbaigti nutrauktus tekstus; ID **102–107** (LV, ET) — **sulyginti gylį su LT** arba aiškiai pažymėti UI kaip „beta / sutrumpinta“.
2. **P0:** ID **71** (EN) — pašalinti LT fragmentą; ID **27, 60, 69, 104** (EN) — sutvarkyti „email“ sakinius; ID **107** (EN) — viena kalba progreso bloke.
3. **P1:** Perrašyti **keywords** visuose failuose (ypač ID 6, 10, 23, 29, 38, 57–59, 85–86).
4. **P1:** **ID 68** — lokalizuoti šalį pagal `prompts.*.json` failą arba naudoti neutralų šabloną `[šalis]`.
5. **P2:** LT pataisymai: **67**, **18**, **80**; EN: **98** Kanban, **106** antraštė.
6. **P2 (informacinė architektūra):** perkelti ID **64–67, 71, 79–82** į tinkamas kategorijas visose kalbose (reikalauja sutikrinti `count` ir UI).

---

## Po remediacijos (atnaujinta)

Šis skyrius fiksuoja būseną po copy / generatoriaus ciklo ir kategorijų pertvarkos (`assets/data/prompts.{lt,en,et,lv}.json`).

### Įgyvendinta (uždaryta arba iš esmės uždaryta)

- **Generatorius:** `scripts/generate-prompts-from-en.mjs` — vertimas ilgiems tekstams dalimis ir **visų** GTX atsakymo segmentų sujungimas (pilni LV/ET `text` / `copyText`).
- **LT:** ID **67**, **18** (terminija + **„mitigacijos“** rašyba), **80**, **68**; etalonas tolesnei peržiūrai.
- **EN:** P0/P1 pagal šį auditą (įskaitant **71**, **107**, „email“ frazes, keywords, Kanban **98**, **68** Lietuva ir kt.).
- **LV / ET:** pergeneruota iš EN po generatoriaus pataisų; rankiniai retušai (**ET:** 3, 68, 107; **LV:** 68 → Latvija).
- **P2 informacinė architektūra:** ID **64–67** perkelti į **IT**, **71** į **finansus**, **79–82** į **HR** (įskaitant **80** iš ankstesnės IT skilties), visose keturiose kalbose; atnaujinti `count` ir `p.category`.

### Liko / tolimesnė QA

- **2026-04-06 iteracija:** ET/LV ilgi **102–107** ir **keywords** (audit P1 ID 6, 10, 23, 29, 38, 57–59, 85–86) retušuoti; **68** EE/LV kontekstas patvirtintas, ET formulė „ostjatele Eestis“. Tolimesnėms versijoms — tik pavienės kalbos ar tono pastabos.
- **2026-04-06 (automatinė santrauka):** `text` ilgio santykis ET/LV vs LT užduotims **101–107**, **68**, **64–67** — visi kriterijai ~0,88–1,08; masinio JSON taisymo neprireikė (tolimesnė rankinė QA — §5.2 sąrašas).
- **Sąsaja (2026-04-06):** gili nuoroda į užduotį — `?prompt=<skaitinis_id>` arba `#prompt-<id>` (sinchronizuojama su URL); paieška su keliais žodžiais — **AND** logika (visi tokenai turi būti pavadinime, tekste arba raktažodžiuose).
- Jei reikia **masinio LT → EN** sinchrono: `npm run generate:en` su atsargiu diff ir rankiniu kritinių EN vietų atkūrimu.

#### ET / LV rankinės QA checklist (imtis)

1. Atsidaryti `/et/` ir `/lv/`, paieškoje ar skyriuose atverti užduotis **101–107** ir palyginti ilgį bei struktūrą su LT ar EN.
2. Patikrinti **finance** ID **68** (šalies kontekstas: EE vs LV).
3. Peržvelgti **IT** skiltį po perkėlimo (64–67): ar antraštės atitinka vartotojo lūkestį „IT“, ne „Pardavimai“.

---

## 6. Išvada

**LT** laikyti **etalonu** turinio gylio ir struktūros atžvilgiu. **EN** reikia **redagavimo** (ne tik vertimo), ypač keywords ir keliuose sulaužytuose promptuose. **LV** ir **ET** reikalauja **sisteminio peržiūrėjimo**: sutrumpinimai, nutraukti šablonai ir ilgųjų promptų paritetas yra didžiausias UX rizikos šaltinis.

Šį dokumentą galima naudoti kaip **checklist** taisant `assets/data/prompts.*.json`.
