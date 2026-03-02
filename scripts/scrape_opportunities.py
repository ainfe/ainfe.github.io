#!/usr/bin/env python3
"""Simple example scraper that writes a JSON array of opportunities.

This placeholder script demonstrates using Python for data scraping instead
of calling a remote AI service. In a real project you would adapt the
`TARGET_URL` and parsing logic to the site you want to scrape.

The script outputs to ``public/opportunities.json`` so the React frontend can
fetch it at runtime. Running the script repeatedly overwrites the file.

Usage:
    python scripts/scrape_opportunities.py

Dependencies are listed in `requirements.txt`.
"""

import json
import pathlib
import requests
from bs4 import BeautifulSoup
import time

# in a real deployment you would supply a list of target sources rather
# than a single dummy URL.  Global scraping across LinkedIn, professional
# networks, academic portals, etc. typically requires either published
# APIs or sophisticated headless-browser automation.  LinkedIn forbids
# unauthorized scraping; using their official API (with credentials) is
# strongly recommended.
#
# We'll keep a placeholder variable here; you can replace this with a list
# and extend `scrape_opportunities` accordingly.
TARGET_URL = "https://example.com/opportunities"  # replace with a real URL

OUTPUT_PATH = pathlib.Path(__file__).parents[1] / "public" / "opportunities.json"


def scrape_opportunities() -> list[dict]:
    """Return a list of opportunity dictionaries.

    The structure should match the TypeScript `Opportunity` interface used
    by the frontend. Here we just fabricate some example entries if the
    target site isn't available.
    """
    try:
        resp = requests.get(TARGET_URL, timeout=10)
        resp.raise_for_status()
    except Exception as exc:
        print(f"warning: failed to fetch {TARGET_URL}: {exc}")
        # fallback to stub data
        return [
            {
                "title": "Example Fellowship",
                "type": "Fellowship",
                "sponsor": "Example Org",
                "deadline": "2025-06-01",
                "guide": "Visit example.org to apply.",
                "standoutTips": "Highlight your passion for research.",
                "preparation": "Gather transcripts and letters of recommendation.",
                "steps": ["Submit online form", "Upload documents", "Interview"],
                "categories": ["Fellowship", "Entry Level"],
                "benefits": {"accommodation": False, "visa": False, "flight": False, "stipend": True},
                "link": "https://example.org/fellowship"
            }
        ]

    soup = BeautifulSoup(resp.text, "html.parser")
    results = []
    # TODO: write real parsing logic here.  When scraping multiple platforms
    # you'll likely need specialized handlers for each site/API.  For example,
    # LinkedIn data is best obtained via their REST API with proper OAuth tokens.
    # Other sites may require Selenium/Playwright to execute JavaScript.
    #
    # Sample parsing outline for a generic HTML page:
    # for entry in soup.select('.opportunity'):
    #     title = entry.select_one('.title').get_text(strip=True)
    #     ...
    #     results.append({ ... })
    #
    # For APIs you would call `requests.get(json_url)` and then iterate over
    # the returned JSON objects.

    if not results:
        # fallback if parsing produced nothing
        results = [
            {
                "title": "Example Opportunity",
                "type": "Internship",
                "sponsor": "Demo Co",
                "deadline": "2025-01-15",
                "guide": "Follow instructions on the demo site.",
                "standoutTips": "Showcase your portfolio.",
                "preparation": "Prepare a resume.",
                "steps": ["Apply", "Interview"],
                "categories": ["Internship"],
                "benefits": {"accommodation": False, "visa": False, "flight": False, "stipend": False},
                "link": "https://demo.example/opportunity"
            }
        ]

    return results


def main():
    data = scrape_opportunities()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as fp:
        json.dump(data, fp, indent=2, ensure_ascii=False)
    print(f"wrote {len(data)} opportunities to {OUTPUT_PATH}")


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Scrape opportunities.")
    parser.add_argument("--watch", action="store_true", help="Run continuously, updating every second.")
    args = parser.parse_args()

    if args.watch:
        try:
            while True:
                main()
                time.sleep(1)
        except KeyboardInterrupt:
            print("watch mode stopped")
    else:
        main()
