# GitHub publikavimo gidas

## Kaip publikuoti projektą GitHub Pages

### 1. Sukurkite GitHub repository

1. Eikite į GitHub.com
2. Spustelėkite "New repository"
3. Įveskite repository pavadinimą (pvz., `praktiniai-promptu-rinkinys`)
4. Pasirinkite Public
5. Spustelėkite "Create repository"

### 2. Įkelkite failus

#### Per GitHub web interface

1. Eikite į sukurtą repository
2. Spustelėkite "uploading an existing file"
3. Įkelkite failus:
   - `index.html` (nukreipia į `lt/`, `en/`, `et/` arba `lv/`)
   - `lt/`, `en/`, `et/`, `lv/` (bibliotekos puslapiai)
   - `assets/` (CSS, JS, `data/prompts.{lt,en,et,lv}.json`)
   - `README.md`
   - `LICENSE`
   - `.nojekyll` (rekomenduojama GitHub Pages)
4. Įveskite commit žinutę ir spustelėkite "Commit changes"

#### Per Git komandinę eilutę

```bash
cd [your-project-folder]
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/[username]/[repository-name].git
git branch -M main
git push -u origin main
```

### 3. Įjunkite GitHub Pages

1. Repository → Settings → Pages
2. Source: **GitHub Actions** (rekomenduojama šiam projektui — workflow [`.github/workflows/static.yml`](.github/workflows/static.yml) surenka tik viešą svetainę į `_site/` ir ją publikuoja)
3. Jei naudojate „Deploy from a branch“: Branch `main`, folder `/ (root)` — tuomet į GitHub kelkite tik produkcinius failus (be `scripts/`, vidinių `docs/` ir pan.)

### Tuščias repo ir pirmas push (pvz. DITreneris/ecommerce)

Jei publikuojate į **naują tuščią** repozitoriją (pvz. [github.com/DITreneris/ecommerce](https://github.com/DITreneris/ecommerce)):

1. Lokaliai: `npm ci` ir `npm run verify` turi praeiti.
2. Remote: `git remote add ecommerce https://github.com/DITreneris/ecommerce.git` (arba pakeiskite `origin` į tą patį URL), tada `git push -u ecommerce main` (šaka **`main`**).
3. GitHub → **Settings → Pages**: šaltinis **GitHub Actions** (po pirmo push matysis workflow).
4. Viešas URL (org/user Pages): `https://ditreneris.github.io/ecommerce/` (šaknies redirect ir `…/lt/` ir kt.).

### Branch apsauga ir CI

Rekomenduojama **Settings → Branches → Branch protection rules** ant `main`: reikalauti sėkmingo PR patikrinimo (workflow [`.github/workflows/ci.yml`](.github/workflows/ci.yml), pvz. job `quality`), kad sulūžęs lint ar JSON validacija nepatektų į šaką, iš kurios leidžiamas Pages deploy. Deploy workflow taip pat vykdo `verify` prieš įkeliant artefaktą.

### 4. Svetainė bus prieinama per

```
https://[username].github.io/[repository-name]
```

Šaknies puslapis nukreips pagal kalbą (įskaitant **`…/et/`** ir **`…/lv/`**). Tiesiogiai pvz. `https://[username].github.io/[repository-name]/lt/`.

## Atnaujinimų publikavimas

### Per GitHub web interface

1. Redaguokite failą
2. Spustelėkite "Commit changes"
3. GitHub Pages automatiškai atnaujins svetainę (1-5 min)

### Per Git

```bash
git add .
git commit -m "Updated: [describe changes]"
git push
```

## Rekomenduojami failai publikavimui

```
.
├── index.html          # Pagrindinė svetainė (LT)
├── assets/             # CSS, JS, duomenys
├── README.md           # Projekto aprašymas
├── LICENSE             # MIT licencija
└── .gitignore          # Git ignoravimo failas
```

## Archyvas ir kūrimo failai

Seni variantai, migracijos skriptai ir vertinimo užrašai yra **`docs/archive/`** (žr. [docs/archive/README.md](docs/archive/README.md)). Repozitorijoje jie gali būti saugomi vystymui; **GitHub Actions Pages deploy** į viešą svetainę įkelia tik `index.html`, `.nojekyll`, `assets/`, `lt/`, `en/`, `et/`, `lv/` (ir `CNAME`, jei yra).

`node_modules/` necommitinami (žr. `.gitignore`).
