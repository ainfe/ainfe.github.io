<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your portfolio app

This contains everything you need to run your app locally.


## Run Locally


**Prerequisites:** Node.js for the front‑end and Python 3.10+ for the data scraper

1. Install frontend dependencies:
   `npm install`
2. Generate the opportunities JSON (see **Data Scraping** below).
3. Start the development server:
   `npm run dev`

---

## Data Scraping

A Python script in `scripts/scrape_opportunities.py` is used to gather and
serialize the opportunity listings. The script uses `requests` and
`beautifulsoup4` to scrape the source site and writes a JSON file to
`public/opportunities.json`. The React app loads this file at runtime.

To run the scraper:

```bash
python -m venv .venv            # optional virtual environment
source .venv/Scripts/activate   # Windows PowerShell
pip install -r requirements.txt # see below
python scripts/scrape_opportunities.py          # run once
```

For real‑time updates you can run the watcher mode which re‑scrapes and
rewrites the JSON every second:

```bash
python scripts/scrape_opportunities.py --watch
```

Leave this running in a background terminal while you work; the React
app will poll the resulting `public/opportunities.json` once per second
and automatically refresh the listing when the file changes.

After running you should have `public/opportunities.json` which the site
will use. Re-run the script whenever you want to refresh the data.
