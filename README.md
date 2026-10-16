# Mati (মাটি): Check a Plot Before You Buy

কেনার আগে জমি ও খতিয়ান যাচাই করুন

A web prototype that lets a buyer check a land plot and verify a deed before paying. Built for the LandTech Innovation Hackathon 2026. The project idea came from Claude (Anthropic) and the site's visual design from Google Argon; see "AI tools used".

- **Track:** Digital Land Records, Verification & Digitization
- **Problem:** P5 (Check Before You Buy), with deed hashing from P2 (Verify Deeds & Ownership)
- **Team:** [Team name] | [Student 1 (Team Leader)], [Student 2]
- **Mentors:** [Faculty mentor], [Industry mentor]
- **Live prototype:** https://YOUR-USERNAME.github.io/YOUR-REPO/
- **Demo video:** [YouTube link]

All data in this project is made up. See "Data and rule compliance" below.

## The problem

Many land disputes in Bangladesh start with fake deeds, old records that do not agree with each other (CS, SA, RS and BS khatians), and records kept in separate offices. A buyer has no single place to check whether a plot is clean before paying, so the same land can be sold twice, mortgaged twice, or bought when it is khas land or under acquisition.

## What Mati does

**1. Plot check (P5).** Enter a plot ID, pick a sample, or click a plot on the map. Mati shows:
- the owner on record and recorded area
- the RS and BS khatian numbers side by side
- mutation status, khas status, court cases and bank liens
- one verdict: clear (green), discrepancy or lien (amber), or high risk (red)

**2. Deed verification (P2).** The page holds a SHA-256 fingerprint of a sample deed. Paste or load a deed and Mati hashes it again and compares. Changing a single character gives a different hash and the page flags the copy as tampered.

**3. Other details**
- Bangla and English labels using land terms such as মৌজা, দাগ, খতিয়ান, ই-নামজারি, খাস জমি and সাফ কবলা দলিল
- A schematic mouza map with clickable plots (not to scale, not real survey data)
- A "Demo data" banner on every page
- English / বাংলা language switch; the choice is remembered in the browser
- A hero background that cross-fades between three rice-field photos every few seconds
- Mobile menu, custom 404 page and favicon; layout tested for phones

## Sample plot IDs

| Plot ID | What it shows |
|---|---|
| DHK-SAV-0142 | Clean plot, records match |
| KHL-DUM-0207 | RS and BS area mismatch plus a boundary case |
| RJS-KHS-0311 | Government khas land |
| CTG-MOR-0455 | Bank mortgage and a loan court case |
| SYL-ACQ-0518 | Land under acquisition |

## How it works

1. Each plot is a record in a JavaScript object in `index.html`, keyed by plot ID.
2. A lookup reads the record, fills the result card and colours the verdict from the record's status.
3. For deeds, the browser's Web Crypto API (`crypto.subtle.digest('SHA-256')`) hashes the text. The sample deed's hash is calculated when the page loads and is used as the "registry" value to compare against.
4. Comparison is exact. Any edit to the text, even one digit, changes the hash.

## Tech stack

- HTML5, CSS3 and vanilla JavaScript. No framework, no build step, no backend.
- Web Crypto API for SHA-256
- Inline SVG for the map
- Google Fonts: Fraunces and Hind Siliguri
- Hosting: GitHub Pages (static)

## Run it

No installation needed.

**Option 1:** open `index.html` in a current browser.

**Option 2 (closer to the hosted site):**
```
python3 -m http.server 8000
```
Then open http://localhost:8000 (on Windows use `py -m http.server 8000`).

The background photos are `hero-1.jpg`, `hero-2.jpg` and `hero-3.jpg`, stored next to `index.html` (see "Images"). If a photo is missing, the page falls back to a plain dark green background.

## Project files

```
index.html     page, styles, data and logic
style.css      styles for the 404 page
404.html       custom not-found page
favicon.svg    site icon
hero-1.jpg     background photo 1 (compressed)
hero-2.jpg     background photo 2 (compressed)
hero-3.jpg     background photo 3 (compressed)
render.yaml    optional Render static-site config
.nojekyll      tells GitHub Pages to serve files as they are
```

## Data and rule compliance

- Every plot ID, owner, father's name, khatian number, court case, bank and deed in this project is made up for the hackathon. Owners and banks appear as "Sample Owner", "Sample Father" and "Sample Bank".
- No real names, NID numbers, phone numbers or land records are used.
- Nothing was scraped or downloaded from any government website.
- No live government or third-party system was tested. All checks run in the browser on our own files.

## AI tools used

We used two AI tools and list them here as the rulebook requires.

- **Claude (Anthropic):** gave us the project idea and its scope (P5 with deed hashing from P2). It also wrote the first version of the site and the plot-check and deed-verification logic, and helped with the concept note and pitch deck.
- **Google Argon:** produced the visual redesign of the site, which includes the styling, the CSS, the hero background and the schematic mouza map layout.

We reviewed the code from both tools, edited it ourselves (including replacing the sample data with clearly fictional names), and can explain how it works.

## Images

The three background photos come from Unsplash and are used under the Unsplash License, which allows free use. We credit the photographers anyway. They were renamed and compressed for the web.

| File | Photographer | Source |
|---|---|---|
| hero-1.jpg | Kresna Arya | Unsplash |
| hero-2.jpg | Mohd Nasiruddin Mohd Nasir | Unsplash |
| hero-3.jpg | Yosafat Herdian | Unsplash |

These are general rice-field photos. They are used only as decoration and do not show real plots or real land records.

## Credits

- Fonts: Fraunces and Hind Siliguri from Google Fonts (SIL Open Font License)
- Photos: see "Images" above

## Limitations

- This is a front-end prototype. The records are stored in the page itself, so anyone can read or edit them. A real system would keep them in a protected server database.
- The "registry" deed hash is calculated from the sample deed when the page loads. It demonstrates the check but is not a real registry.
- The map is a schematic drawing, not survey data.
- Only five sample plots and one sample deed exist.

## Planned for a national version

- A database linked to registry, e-Mutation and court systems through approved APIs
- An append-only store for deed hashes, written at registration
- QR codes printed on deeds that open the verification page
- Role-based sign-in for officers and banks
- OCR for scanned Bangla khatians (problem P1)

