# Mati (মাটি): Check Before You Buy

LandTech 2026 prototype. Track: Digital Land Records, Verification & Digitization. Problem P5 (Check Before You Buy) with deed hashing from P2.

**What it does:** a buyer enters a plot ID and sees the owner on record, mutation history, court cases, khas/acquisition status, bank liens and RS vs BS area mismatch, with one verdict. A second tool seals a deed with SHA-256 and detects any altered copy.

## Run it
No install or build. Open `index.html` in a browser, or serve the folder:
`python3 -m http.server 8000` then visit http://localhost:8000

Sample plot IDs: DHK-SAV-0142, KHL-DUM-0207, RJS-KHS-0311, CTG-MOR-0455, SYL-ACQ-0518

## Data
Synthetic only. Five made-up plots and one sample deed in `app.js`. No real names, NID numbers, phone numbers or land records. Nothing was scraped from any government site.

## Tech
HTML, CSS, vanilla JavaScript, Web Crypto API (SHA-256). Static hosting (GitHub Pages / Render).

## AI tools used
Claude (Anthropic) generated the first version of the code and design. The team reviewed it and can explain it. Add any other tools you use here.

## Changes after Round 1
(List them here before the Final Round.)
