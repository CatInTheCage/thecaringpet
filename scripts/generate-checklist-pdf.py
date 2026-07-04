#!/usr/bin/env python3
"""Generate the Dog Feeding Safety Checklist PDF from an HTML template."""

from pathlib import Path
from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parent.parent
HTML_PATH = ROOT / "scripts" / "checklist-pdf.html"
OUTPUT_DIR = ROOT / "public" / "downloads"
OUTPUT_PATH = OUTPUT_DIR / "dog-feeding-safety-checklist.pdf"


def main():
    if not HTML_PATH.exists():
        raise FileNotFoundError(f"HTML template not found: {HTML_PATH}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(channel="chrome")
        page = browser.new_page()
        page.goto(f"file://{HTML_PATH}", wait_until="networkidle")
        page.pdf(
            path=str(OUTPUT_PATH),
            format="Letter",
            margin={
                "top": "0.55in",
                "right": "0.65in",
                "bottom": "0.55in",
                "left": "0.65in",
            },
            print_background=True,
        )
        browser.close()

    print(f"PDF generated: {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
