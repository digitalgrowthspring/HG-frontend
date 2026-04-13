"""
client_config.py — Heavenly Giggles
───────────────────────────────────
Single source of truth for all scripts in this client folder.
Every tool imports from here. Never hardcode client values in scripts.

Backfilled on 2026-04-03.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent / "PPC" / ".env")

# ── Identity ──────────────────────────────────────────────────────────────────
CLIENT_NAME = "Heavenly Giggles"
CLIENT_SLUG = "heavenly-giggles"
TAGLINE = "Kids Jump. You Relax. We Handle the Rest."

# ── Logo ──────────────────────────────────────────────────────────────────────
LOGO_URL = ""
# Local source: frontend/public/hg-logo.png

# ── Landing Pages ─────────────────────────────────────────────────────────────
LANDING_PAGES = {
    "standard-jumping-castle-4m-x-4m": "https://heavenlygiggles.com/product/standard-jumping-castle-4m-x-4m",
    "jumping-castle-slide-7m-x-4m": "https://heavenlygiggles.com/product/jumping-castle-slide-7m-x-4m",
    "inflatable-water-slide-7m-x-1m": "https://heavenlygiggles.com/product/inflatable-water-slide-7m-x-1m",
    "brand": "https://heavenlygiggles.com",
}

# ── Brand Colors (0.0–1.0 scale for Sheets API) ─────────────────────────────
NAVY = {"red": 0.306, "green": 0.804, "blue": 0.769}       # #4ECDC4
TEAL = {"red": 0.306, "green": 0.804, "blue": 0.769}       # #4ECDC4
GOLD = {"red": 1.0, "green": 0.42, "blue": 0.616}          # #FF6B9D
OFF_WHITE = {"red": 1.0, "green": 1.0, "blue": 1.0}        # #FFFFFF
NEAR_BLACK = {"red": 0.173, "green": 0.243, "blue": 0.314} # #2C3E50
WHITE = {"red": 1.0, "green": 1.0, "blue": 1.0}
RED = {"red": 0.8, "green": 0.0, "blue": 0.0}
MID_NAVY = {"red": 0.173, "green": 0.243, "blue": 0.314}
LIGHT_BLUE = {"red": 0.925, "green": 0.984, "blue": 0.98}
TEAL_TINT = {"red": 0.925, "green": 0.984, "blue": 0.98}
GOLD_TINT = {"red": 1.0, "green": 0.922, "blue": 0.953}
GRAY_TINT = {"red": 0.937, "green": 0.937, "blue": 0.937}

# ── Google Drive & Sheets ─────────────────────────────────────────────────────
SPREADSHEET_ID = os.environ.get("GOOGLE_SHEETS_SPREADSHEET_ID", "")
DRIVE_FOLDER_ID = os.environ.get("DRIVE_FOLDER_ID", "")

NOTEBOOKLM_NOTEBOOK_ID = "93d6f14e-5cfa-428b-9b3e-0412ac1c28f5"
NOTEBOOKLM_URL = "https://notebooklm.google.com/notebook/93d6f14e-5cfa-428b-9b3e-0412ac1c28f5"

# ── Campaign Sheet Tabs ───────────────────────────────────────────────────────
KWS_TABS = {
    "heavenly-giggles-jumping-castles-exact": "Jumping Castles",
    "heavenly-giggles-water-slides-exact": "Water Slides",
    "heavenly-giggles-brand-exact": "Brand Campaign",
}
