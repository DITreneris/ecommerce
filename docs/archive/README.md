# Archyvas (neprodukcija)

Čia saugomi **nebenaudojami** HTML variantai, migracijos skriptai, istoriniai užrašai ir P2 „enhanced“ JS. Turinys **neprižiūrimas** kaip aktyvus produktas — tik istorijai ar retam peržiūrėjimui.

## Struktūra

| Katalogas | Turinys |
|-----------|---------|
| `legacy-html/` | Seni `index_*` variantai, `migrated-prompts.html` |
| `legacy-js/` | `app-enhanced.js` (buvęs P2 kelias) |
| `legacy-scripts/` | Vienkartiniai Node skriptai (migracija, build) |
| `notes/` | UX vertinimai, P2 santrauka, koncepto užrašai |

## `legacy-scripts`

Skriptuose keliai dažnai naudoja `__dirname` ir failus repo **šaknyje**. Jei reikia paleisti — kopijuokite į šaknį arba pataisykite kelius rankiniu būdu.

## `legacy-html/index-enhanced.html`

CSS ir JS nuorodos nurodo į repo šaknies `assets/` ir šalia esantį `legacy-js/` — atidarykite per lokalių failų serverį nuo repo šaknies (`npm run dev`) ir naršyklėje eikite į `docs/archive/legacy-html/index-enhanced.html` (arba atitinkamą URL).
