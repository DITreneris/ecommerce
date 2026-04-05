# Security

Šis repository skirtas **statinei** svetainei (HTML/CSS/JS). Serverio pusės autentifikacijos ar API raktų čia nėra.

## Pranešti apie pažeidžiamumą

Jei radote saugos problemą (pvz., XSS per netikėtą turinio įterpimą, kenkėjišką nuorodą dokumentacijoje), prašome:

1. **Neviešinti** detalių issue viešai, jei tai aktyvi grėsmė.
2. Susisiekti su repository savininku per GitHub (pvz. private security advisory, jei įjungta) arba el. paštu, nurodytu profilyje.

## Geros praktikos šiame projekte

- Nekomituoti slaptažodžių, API raktų ar `.env` su paslaptimis.
- Tikrinti PR prieš merge: nereikalingų išorinių skriptų neįterpti į `index.html` be priežasties.
