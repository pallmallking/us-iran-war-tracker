# US-Iran War Tracker

A comprehensive web dashboard tracking **Operation Epic Fury** (US-Iran-Israel conflict, Feb 2026–present).

## Features

- **Overview** — KPIs, latest diplomatic signals, mini-map
- **Map** — Interactive conflict map with layer toggles and time windows
- **Timeline** — Filterable unified event feed
- **Casualties** — Verified faction breakdowns with source attribution
- **Military** — Curated deployment tracker
- **Economy** — Hormuz status, oil prices, economic milestones
- **Diplomacy** — Ceasefire and negotiation tracker
- **News** — RSS aggregation from wire services

## Data Sources

- [IranWarLive](https://iranwarlive.com) kinetic, ground, diplomacy, and Hormuz feeds
- Reuters, AP, BBC, Al Jazeera RSS
- Yahoo Finance (Brent crude)
- Seeded casualty/military data from CENTCOM, IDF, health ministries

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Disclaimer

This is an aggregated OSINT tracker, not an official government source. All figures link to primary sources where possible.
