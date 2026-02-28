<div align="center">

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
serialize the opportunity listings. The script currently demonstrates a
simple HTTP fetch and HTML parse, but you can extend it to aggregate data
from any number of sources (LinkedIn, university portals, NGO sites, etc.).

> **Important:** scraping large commercial platforms like LinkedIn or
> Indeed often violates their terms of service. You should use official
> APIs with proper authentication, or deploy a dedicated headless-browser
> solution. Global, real‑time scraping is a non‑trivial engineering task
> and may require rotating proxies, rate‑limiting, and legal review.

The frontend itself makes no network requests beyond retrieving the
locally generated `public/opportunities.json` file. It does not rely on
any external AI service.

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
