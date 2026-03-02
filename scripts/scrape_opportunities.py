#!/usr/bin/env python3
"""Advanced scraper for global opportunities with multiple sources.

This script crawls a curated list of websites for internships, scholarships,
fellowships, remote jobs, and other global opportunities.  It includes
site-specific parsing logic and graceful error handling, and writes a JSON
file consumed by the frontend React application.  Running with ``--watch``
will poll the sources periodically.
"""

import json
import pathlib
import requests
from bs4 import BeautifulSoup
import time
from typing import List, Dict

# List of target URLs to scrape opportunities from
TARGET_URLS = [
    "https://internshala.com/internships",  # Internships
    "https://www.scholarshipportal.com/scholarships",  # Scholarships
    "https://www.idealist.org/en/",  # NGO Opportunities
    "https://www.fellowshipdirect.com/",  # Fellowships
    "https://www.academicpositions.com/",  # Academic Jobs
    "https://www.jobs.ac.uk/",  # Academic and Research Jobs
    "https://remote.co/remote-jobs/",  # Remote Jobs
    "https://www.gointern.com/",  # Internships in India
    "https://www.goodjobs.com/",  # Impact Jobs
    "https://www.internqueen.com/",  # Internship Listings
    "https://www.mychances.net/",  # Scholarships and Opportunities
    "https://www.goabroad.com/",  # Study Abroad and Internships
    "https://www.opencolleges.edu.au/courses/scholarships/",  # Scholarships
    "https://www.fastweb.com/",  # Scholarships for Students
    "https://www.careers.govt.nz/whats-new/",  # New Zealand Career Opportunities
    "https://www.universities.com/",  # University Listings and Opportunities
    "https://www.indeed.com/q-Internship-jobs.html"  # General Internship Listings
]

OUTPUT_PATH = pathlib.Path(__file__).parents[1] / "public" / "opportunities.json"


def scrape_opportunities() -> List[Dict]:
    """Return a list of opportunity dictionaries with advanced filtering."""
    results = []

    for TARGET_URL in TARGET_URLS:
        try:
            resp = requests.get(TARGET_URL, timeout=10)
            resp.raise_for_status()
        except Exception as exc:
            print(f"Warning: failed to fetch {TARGET_URL}: {exc}")
            continue  # Skip to the next URL on error

        soup = BeautifulSoup(resp.text, "html.parser")
        
        # Example parsing for Internshala
        if "internshala" in TARGET_URL:
            for entry in soup.select('.internship_card'):
                title = entry.select_one('.internship_company_name').get_text(strip=True)
                opportunity_type = "Internship"
                sponsor = entry.select_one('.company_name').get_text(strip=True)
                deadline = entry.select_one('.internship_date').get_text(strip=True)
                link = entry.select_one('a')['href']
                benefits = {
                    "accommodation": "Accommodation available" in entry.text,
                    "visa": "Visa sponsorship" in entry.text,
                    "flight": "Flight included" in entry.text,
                    "stipend": "Stipend available" in entry.text
                }
                results.append({
                    "title": title,
                    "type": opportunity_type,
                    "sponsor": sponsor,
                    "deadline": deadline,
                    "link": link,
                    "benefits": benefits
                })

        # Example parsing for ScholarshipPortal
        elif "scholarshipportal" in TARGET_URL:
            for entry in soup.select('.scholarship-list-entry'):
                title = entry.select_one('.scholarship-title').get_text(strip=True)
                opportunity_type = "Scholarship"
                sponsor = entry.select_one('.scholarship-provider').get_text(strip=True)
                deadline = entry.select_one('.scholarship-deadline').get_text(strip=True)
                link = entry.select_one('a')['href']
                results.append({
                    "title": title,
                    "type": opportunity_type,
                    "sponsor": sponsor,
                    "deadline": deadline,
                    "link": link,
                    "benefits": {"accommodation": False, "visa": False, "flight": False, "stipend": False}
                })

        # Example handling for Indeed (Job listings, change selectors as needed)
        elif "indeed" in TARGET_URL:
            for entry in soup.select('.job_seen_beacon'):
                title = entry.select_one('.jobTitle').get_text(strip=True)
                opportunity_type = "Job"
                sponsor = entry.select_one('.companyName').get_text(strip=True)
                deadline = "N/A"  # Indeed typically doesn't have deadlines
                link = entry.select_one('a')['href']
                results.append({
                    "title": title,
                    "type": opportunity_type,
                    "sponsor": sponsor,
                    "deadline": deadline,
                    "link": link,
                    "benefits": {"accommodation": False, "visa": False, "flight": False, "stipend": False}
                })

        # Add more site parsing logic similarly...

    if not results:
        # Fallback to dummy data if nothing is found
        results.append({
            "title": "Example Opportunity",
            "type": "Internship",
            "sponsor": "Demo Co",
            "deadline": "2025-01-15",
            "link": "https://demo.example/opportunity",
            "benefits": {"accommodation": False, "visa": False, "flight": False, "stipend": False}
        })

    return results


def update_opportunities():
    """Fetch and save opportunities to a JSON file."""
    data = scrape_opportunities()
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as fp:
        json.dump(data, fp, indent=2, ensure_ascii=False)
    print(f"Wrote {len(data)} opportunities to {OUTPUT_PATH}")


def main():
    """Main script execution."""
    import argparse
    parser = argparse.ArgumentParser(description="Scrape opportunities.")
    parser.add_argument("--watch", action="store_true", help="Run continuously, updating every 60 seconds.")
    args = parser.parse_args()

    if args.watch:
        try:
            while True:
                update_opportunities()
                time.sleep(60)  # Update every 60 seconds
        except KeyboardInterrupt:
            print("Watch mode stopped")
    else:
        update_opportunities()


if __name__ == "__main__":
    main()
