# LT / EN / ET / LV struktūra (Spin-off Nr. 8)

| Kelias | Paskirtis |
|--------|-----------|
| [`index.html`](../index.html) | Nukreipia į `lt/`, `en/`, `et/` arba `lv/`: pirmiausia `localStorage` (`prompt-library-lang`), tada naršyklės kalba; numatytoji — `en/` |
| [`lt/index.html`](../lt/index.html) | Biblioteka lietuviškai (`data-locale="lt"`) |
| [`en/index.html`](../en/index.html) | Biblioteka angliškai (`data-locale="en"`) |
| [`et/index.html`](../et/index.html) | Biblioteka eesti keeles (`data-locale="et"`) |
| [`lv/index.html`](../lv/index.html) | Biblioteka latviski (`data-locale="lv"`) |
| [`lt/privatumas.html`](../lt/privatumas.html) | Privatumo politika (LT) |
| [`en/privacy.html`](../en/privacy.html) | Privacy policy (EN) |
| [`et/privacy.html`](../et/privacy.html) | Privaatsuspoliitika (ET) |
| [`lv/privacy.html`](../lv/privacy.html) | Privātuma politika (LV) |
| [`assets/data/prompts.lt.json`](../assets/data/prompts.lt.json) | Promptų šaltinis LT |
| [`assets/data/prompts.en.json`](../assets/data/prompts.en.json) | Promptų šaltinis EN |
| [`assets/data/prompts.et.json`](../assets/data/prompts.et.json) | Promptų šaltinis ET (iš EN: `npm run generate:et`) |
| [`assets/data/prompts.lv.json`](../assets/data/prompts.lv.json) | Promptų šaltinis LV (iš EN: `npm run generate:lv`) |

Kalbų perjungimas: antraštėje nuorodos į gretimus katalogus (`../lt/`, `../en/`, `../et/`, `../lv/`) su `data-lang` ir `hreflang`. Perjungiant išsaugomas dabartinis **`?q=`** paieškai.

`link rel="alternate" hreflang`: visi keturi + `x-default` → EN biblioteka / EN privatumas.

GitHub Pages: `https://…/repo/` → šaknies redirect; tiesiogiai pvz. `…/et/`, `…/lv/`.
