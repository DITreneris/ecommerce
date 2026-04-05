# 📋 TODO: Praktinių Promptų Rinkinys - Tobulinimo Planas

> **Projektas**: 110 praktinių užduočių kasdieniam darbui su DI  
> **Versija**: 2.0  
> **Atnaujinta**: 2026-02-01

---

## ✅ P1 UŽBAIGTA (2026-02-01)

### Sukurta Nauja Failų Struktūra:
```
assets/
├── css/
│   └── styles.css      (29 KB - išskirtas CSS)
├── js/
│   └── app.js          (21 KB - konsoliduotas JS su error handling)
└── data/
    ├── prompts.lt.json    (~107 promptai)
    └── prompts.en.json

index-refactored.html   (148 KB - 25% mažesnis nei originalas)
```

### Atlikti Darbai:
- ✅ Išskirtas CSS į `assets/css/styles.css`
- ✅ Išskirtas JavaScript į `assets/js/app.js` (pašalinti dublikatai)
- ✅ `assets/data/prompts.lt.json`, `prompts.en.json`, `prompts.et.json`, `prompts.lv.json` (keturios kalbos)
- ✅ Sukurtas `index-refactored.html` naudojantis išoriniais failais
- ✅ Pridėtas error handling localStorage operacijoms (Storage modulis)
- ✅ Pridėtas Clipboard API fallback su geresniais pranešimais
- ✅ Konsoliduotas Copy funkcionalumas (vienas modulis vietoj dviejų)
- ✅ Konsoliduotas Back-to-Top (CSS visibility metodas)

---

## 📊 KODO BAZĖS ANALIZĖS SANTRAUKA

### ✅ Stiprybės
| Aspektas | Įvertinimas | Komentaras |
|----------|-------------|------------|
| HTML Semantika | ⭐⭐⭐⭐⭐ | Puiki: header, main, section, article, nav |
| Accessibility | ⭐⭐⭐⭐⭐ | ARIA labels, skip links, keyboard nav, focus states |
| CSS Architecture | ⭐⭐⭐⭐⭐ | Atskiras failas, gerai organizuotas |
| Dark Mode | ⭐⭐⭐⭐⭐ | Automatinis pagal sistemos nustatymus |
| Responsive Design | ⭐⭐⭐⭐ | Veikia, bet galima tobulinti |
| SEO | ⭐⭐⭐⭐ | Meta tags, OG, Twitter cards |
| UX Features | ⭐⭐⭐⭐⭐ | Progress bar, toast, back-to-top, search |
| Kodo Kokybė | ⭐⭐⭐⭐⭐ | Modulinis JS, error handling |

### ⚠️ Likusios Silpnybės
| Problema | Svarba | Poveikis |
|----------|--------|----------|
| ~~Monolitinis failas~~ | ~~🔴 Kritinis~~ | ✅ IŠSPRĘSTA |
| ~~Dublikuotas JS kodas~~ | ~~🔴 Kritinis~~ | ✅ IŠSPRĘSTA |
| Nėra build sistemos | 🟡 Vidutinis | Nėra minifikacijos, bundling |
| Trūksta testų | 🟡 Vidutinis | Nėra automatizuotų testų |
| ~~localStorage be error handling~~ | ~~🟡 Vidutinis~~ | ✅ IŠSPRĘSTA |

---

## 🎯 PRIORITETAI

### ✅ P1: KRITINIAI - UŽBAIGTA ✅

> **Statusas**: Visi P1 darbai atlikti 2026-02-01
> **Failai**: `index-refactored.html`, `assets/css/styles.css`, `assets/js/app.js`, `assets/data/prompts.json`

#### 1.1 Kodo Refaktoringas - Failų Atskyrimas
- [x] **Išskirti CSS į atskirą failą** `assets/css/styles.css` (29 KB)
- [x] **Išskirti JavaScript į atskirą failą** `assets/js/app.js` (21 KB)
- [x] **Dvikalbiai duomenų failai** `assets/data/prompts.lt.json`, `prompts.en.json`

#### 1.2 Dublikuoto Kodo Pašalinimas
- [x] **Konsoliduoti Copy funkcionalumą** → Vienas `Clipboard` modulis su toast
- [x] **Konsoliduoti Back-to-Top logiką** → Vienas `BackToTop` modulis su CSS visibility

#### 1.3 JavaScript Error Handling
- [x] **Storage modulis** - localStorage wrapper su try-catch ir fallback
- [x] **Clipboard modulis** - Clipboard API + fallback + toast pranešimai

---

### ✅ P2: SVARBŪS - UŽBAIGTA (2026-02-01)

> **Statusas**: Visi P2 darbai atlikti
> **Failai** (istorija): P2 HTML/JS perkelta į `docs/archive/legacy-html/` ir `docs/archive/legacy-js/`; aktyvus stilius — `assets/css/styles.css`.

#### 2.1 Performance Optimizavimas ✅
- [x] **Lazy Loading skyrių turiniui**
  - Implementuotas Intersection Observer API
  - Sekcijos kraunamos su animacija kai pasirodo viewport
  - Staggered animation delays (0-400ms)

#### 2.2 Build Sistema ✅
- [x] **Sukurtas package.json su npm scripts**
  - `npm run dev` - lokali development aplinka
  - `npm run lint` - ESLint tikrinimas
  
- [x] **Sukurtas GitHub Actions CI/CD**
  - `.github/workflows/ci.yml` — lint ir format check (push/PR)
  - `.github/workflows/static.yml` — automatinis deployment į GitHub Pages

#### 2.3 Paieška (istorinis vs dabartinė Spin-off 8) ✅

> **Dabartinė produkcija** ([`assets/js/app.js`](assets/js/app.js)): paprasta raktažodžių paieška (`includes` pagal pavadinimą, tekstą, `data-keywords`), sinchronizacija su URL `?q=`, paryškinimas paieškoje.

- [x] **Fuzzy Search su Fuse.js** — įgyvendinta **P2 archyve**: [`docs/archive/legacy-js/app-enhanced.js`](docs/archive/legacy-js/app-enhanced.js) + CDN; dabartinėje bibliotekoje nenaudojama.

- [x] **Search Autocomplete** — **archyve** (legacy enhanced); dabartinėje versijoje nėra dropdown istorijos.

- [x] **Paieškos istorija** — **archyve** (legacy); dabartinėje versijoje nėra `localStorage` paieškos istorijos.

#### 2.4 Vartotojo Patirties Gerinimas ✅
- [x] **Progress Tracking sistema**
  - `UserProgress` modulis su localStorage
  - Seka: kopijavimų skaičių, mėgstamus, recently used
  - User Stats Bar viršuje (kopijos + mėgstami)

- [x] **Favorites funkcija**
  - ⭐/☆ mygtukas kiekvienai kortelei
  - Quick Access Panel su mėgstamų sekcija
  - Remove favorite iš sąrašo

- [x] **Recently Used sekcija**
  - Paskutiniai 10 naudotų promptų
  - Quick Access Panel su links į promptus
  - Automatic update po kiekvieno kopijavimo

---

### 🟢 P3: NICE-TO-HAVE (Atlikti per 2-3 mėnesius)

#### 3.1 Funkcionalumo Plėtra
- [ ] **AI Integracijos mygtukai**
```html
<div class="prompt-card__ai-buttons">
  <a href="https://chat.openai.com/?q=..." target="_blank" class="btn-ai btn-ai--chatgpt">
    🤖 ChatGPT
  </a>
  <a href="https://claude.ai/new?q=..." target="_blank" class="btn-ai btn-ai--claude">
    🧠 Claude
  </a>
</div>
```

- [ ] **Export funkcija**
  - PDF eksportas (jspdf biblioteka)
  - Word eksportas (.docx)
  - Markdown eksportas
  
- [ ] **Share funkcija**
  - Generuoti tiesioginę nuorodą į konkretų promptą
  - Web Share API mobiliems

- [ ] **Prompt Templates su Variables**
```javascript
// Dabartinis formatas:
"Parašyk el. laišką [klientas] apie [produktas]"

// Patobulintas formatas:
{
  template: "Parašyk el. laišką {{klientas}} apie {{produktas}}",
  variables: [
    { name: "klientas", placeholder: "kliento vardas", required: true },
    { name: "produktas", placeholder: "produkto pavadinimas", required: true }
  ]
}
```

#### 3.2 Turinio Papildymai
- [ ] **Pridėti sunkumo lygius**
  - 🟢 Lengvas (<5 min)
  - 🟡 Vidutinis (5-15 min)
  - 🔴 Sudėtingas (>15 min)
  
- [ ] **Pridėti kategorijų filtrus**
  - Tipas: Komunikacija, Analizė, Kūryba
  - Laikas: Greiti, Standartiniai, Išsamūs
  - AI: Geriausiai veikia su ChatGPT/Claude

- [ ] **Pridėti pavyzdžius**
  - "Pavyzdys" mygtukas kiekvienam promptui
  - Modal su input/output pavyzdžiu

#### 3.3 Analytics ir Stebėjimas
- [ ] **Paprastoji analytics sistema**
```javascript
// Privacy-friendly, be trečiųjų šalių
const analytics = {
  pageViews: 0,
  popularPrompts: {},
  searchTerms: {},
  
  track(event, data) {
    // Saugoti localStorage arba siųsti į savo serverį
  }
};
```

- [ ] **A/B testavimo framework**
  - Testuoti skirtingus CTA mygtukų tekstus
  - Testuoti kortelių layout

#### 3.4 Accessibility Patobulinimai
- [ ] **Skip links patobulinimai**
  - Pridėti skip link kiekvienam skyriui
  
- [ ] **Ekrano skaitytuvo optimizacija**
  - aria-live regionai dinaminiam turiniui
  - Geresnės aria-label žinutės

- [ ] **Reduced Motion palaikymas**
  - Dabartinis: Bazinis palaikymas
  - Tikslas: Pilnas visų animacijų kontrolė

---

## 🐛 ŽINOMI BUGAI

### Kritiniai
| # | Aprašymas | Failas | Eilutė | Statusas |
|---|-----------|--------|--------|----------|
| 1 | Dublikuotas copy event listener | index.html | 3446, 3717 | 🔴 Atidarytas |
| 2 | Mobile search modal ne visada užsidaro | index.html | 3869 | 🔴 Atidarytas |

### Vidutiniai
| # | Aprašymas | Failas | Eilutė | Statusas |
|---|-----------|--------|--------|----------|
| 3 | Search highlight pažeidžia HTML struktūrą | index.html | 3819 | 🟡 Atidarytas |
| 4 | Progress bar "jumps" kai keičiasi turinys | index.html | 3756 | 🟡 Atidarytas |

### Žemi prioritetai
| # | Aprašymas | Failas | Eilutė | Statusas |
|---|-----------|--------|--------|----------|
| 5 | Back-to-top hover efektai dublikuojasi | index.html | 3596 | 🟢 Atidarytas |
| 6 | Keyboard hint rodomas ir kai search focused | index.html | - | 🟢 Atidarytas |

---

## 🔧 TECHNINĖ SKOLA

### Kodo Kokybė
- [ ] Pridėti JSDoc komentarus visoms funkcijoms
- [ ] Sukurti TypeScript tipus (jei migruojama į TS)
- [ ] Pridėti ESLint konfigūraciją
- [ ] Pridėti Prettier formatavimui

### Testavimas
- [ ] Unit testai JS funkcijoms (Jest)
- [ ] E2E testai (Playwright/Cypress)
- [ ] Visual regression testai
- [ ] Accessibility testai (axe-core)

### Dokumentacija
- [ ] Pridėti CONTRIBUTING.md
- [ ] Atnaujinti README.md su development instrukcijomis
- [ ] Sukurti CHANGELOG.md
- [ ] API dokumentacija (jei bus atskirtas backend)

---

## 📈 METRIKOS IR TIKSLAI

### Performance Tikslai
| Metrika | Dabartinė | Tikslas | Prioritetas |
|---------|-----------|---------|-------------|
| First Contentful Paint | ~1.5s | <1.0s | 🔴 Aukštas |
| Largest Contentful Paint | ~2.5s | <1.5s | 🔴 Aukštas |
| Total Blocking Time | ~200ms | <100ms | 🟡 Vidutinis |
| Cumulative Layout Shift | ~0.1 | <0.05 | 🟡 Vidutinis |
| HTML dydis | 235KB | <150KB | 🟡 Vidutinis |

### Vartotojo Engagement Tikslai
| Metrika | Tikslas | Kaip matuoti |
|---------|---------|--------------|
| Kopijavimų skaičius per sesiją | >3 | localStorage tracking |
| Session trukmė | >2 min | Page visibility API |
| Return visitors | >30% | localStorage + fingerprint |
| Paieškos naudojimas | >40% | Event tracking |

---

## 🗓️ PLANUOJAMI SPRINTS

### Sprint 1 (Sav. 1-2): Foundation
- [ ] Failų atskyrimas (CSS, JS)
- [ ] Dublikuoto kodo pašalinimas
- [ ] Error handling pataisymai
- [ ] Baziniai unit testai

### Sprint 2 (Sav. 3-4): Performance
- [ ] Build sistema (Vite)
- [ ] Lazy loading
- [ ] CSS/JS minifikacija
- [ ] GitHub Actions CI/CD

### Sprint 3 (Sav. 5-6): UX Features
- [ ] Fuzzy search
- [ ] Progress tracking
- [ ] Favorites funkcija
- [ ] Mobile UX patobulinimai

### Sprint 4 (Sav. 7-8): Content & Polish
- [ ] Sunkumo lygiai
- [ ] Kategorizavimas
- [ ] Pavyzdžiai
- [ ] AI integracijos mygtukai

---

## 📝 PASTABOS

### Kas veikia gerai - NESUGADINTI:
1. ✅ Dark mode automatinis persijungimas
2. ✅ Accessibility bazinė implementacija
3. ✅ Responsive design mobile-first
4. ✅ Toast pranešimų sistema
5. ✅ Progress bar scroll indicator
6. ✅ Keyboard shortcuts (/, Esc)

### Įspėjimai:
- ⚠️ localStorage gali būti išjungtas private browsing režime
- ⚠️ Clipboard API neveikia be HTTPS (production)
- ⚠️ Kai kurios CSS animacijos gali sukelti performance issues senesniuose įrenginiuose

### Priklausomybės:
- Šiuo metu: Jokių išorinių bibliotekų (pure vanilla)
- Planuojamos: Fuse.js (paieška), jspdf (eksportas)

---

## 📚 NAUDINGOS NUORODOS

### Dokumentacija
- [Web Accessibility Initiative (WAI)](https://www.w3.org/WAI/)
- [Vite Build Tool](https://vitejs.dev/)
- [Fuse.js Fuzzy Search](https://fusejs.io/)

### Dizaino Įkvėpimas
- [Tailwind UI Components](https://tailwindui.com/)
- [Radix UI Primitives](https://www.radix-ui.com/)

### Performance
- [web.dev Performance](https://web.dev/performance/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)

---

> **Autorius**: Claude AI  
> **Sukurta**: 2026-02-01  
> **Peržiūrėti kas**: 2 savaites
