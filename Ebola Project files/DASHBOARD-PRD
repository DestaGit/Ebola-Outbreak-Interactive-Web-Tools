# Ebola Surveillance Dashboard — Client-Side Web App
## Product Requirements Document · v1.0

**Status:** Approved  
**Owner:** Product / DX Team  
**Created:** 2025-05-30  
**Stack decision:** Vanilla JS + Chart.js + HTML/CSS — zero build step, zero backend

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Background & Context](#2-background--context)
3. [Problem Statement](#3-problem-statement)
4. [Goals](#4-goals)
5. [Non-Goals](#5-non-goals)
6. [User Personas](#6-user-personas)
7. [User Stories](#7-user-stories)
8. [Functional Requirements](#8-functional-requirements)
9. [Non-Functional Requirements](#9-non-functional-requirements)
10. [Data Model](#10-data-model)
11. [UI/UX Specifications](#11-uiux-specifications)
12. [Component Inventory](#12-component-inventory)
13. [Design System Tokens](#13-design-system-tokens)
14. [Technical Architecture](#14-technical-architecture)
15. [File Structure](#15-file-structure)
16. [Acceptance Criteria](#16-acceptance-criteria)
17. [Success Metrics](#17-success-metrics)
18. [Open Questions](#18-open-questions)

---

## 1. Executive Summary

Deliver a fully **client-side, single-file** epidemiological surveillance dashboard
covering the 2014–2016 West Africa Ebola outbreak. The dashboard must open directly
in any modern browser with no installation, no server, no API keys, and no build
step — yet present data at the standard of a professional WHO/CDC situation room.

**One deliverable:** `index.html` — self-contained, embeds all data, ready to open.

---

## 2. Background & Context

A React + Recharts dashboard was previously built and works well inside Claude's
artifact viewer. It cannot, however, be opened as a standalone file, distributed
via email, or hosted on a static file server without a Node.js build pipeline.

This PRD specifies a ground-up rewrite using the browser's native capabilities
and CDN-loaded Chart.js — producing the same analytical value with zero
infrastructure requirements.

### Previous Implementation Gaps

| Gap | Impact |
|-----|--------|
| Requires React build toolchain (npm, bundler) | Cannot share as a file attachment |
| JSX syntax requires Babel compilation | Fails if opened directly as HTML |
| No offline capability | Unusable without internet after first load |
| Multiple component files | Requires a dev server to avoid CORS on `import` |

---

## 3. Problem Statement

Public health data from the largest Ebola outbreak in history is scattered across
PDF situation reports. Analysts, educators, journalists, and students need an
interactive, shareable, always-available dashboard that:

- Requires **no technical setup** to run
- Can be **emailed as a single file** and opened immediately
- Presents **professional-grade visualisations** aligned to WHO reporting standards
- Works **offline** once the CDN fonts/libraries are cached

---

## 4. Goals

| # | Goal | Measure |
|---|------|---------|
| G1 | Zero-dependency runtime | No npm, no server, no API call to open the app |
| G2 | Single-file deliverable | Entire app in one `index.html` ≤ 120 KB |
| G3 | Full data coverage | All 6 dashboard sections from the original spec |
| G4 | Animated, interactive | Counters animate on load; charts are interactive |
| G5 | Consistent design language | Matches the dark-ops design system used across all tools |
| G6 | Responsive | Readable at 375 px (mobile) through 1920 px (desktop) |
| G7 | Accessible | WCAG 2.1 AA contrast, keyboard-navigable, screen-reader labels |

---

## 5. Non-Goals

- **Real-time data** — all data is static, embedded at build time
- **User authentication** — no login, no accounts
- **Data entry or editing** — read-only; no forms that write to storage
- **PDF export** — out of scope for v1.0
- **Multilingual support** — English only for v1.0
- **Internet Explorer / legacy browser support** — modern browsers only (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)

---

## 6. User Personas

### P1 — Public Health Educator
> "I teach epidemiology at university. I want something I can share with students
> as a single file and have them explore independently."

- Needs: working app with no setup, clear labelling, educational context
- Device: laptop, projector during class
- Technical level: intermediate

### P2 — Journalist / Science Communicator
> "I'm writing a retrospective on the outbreak. I need accurate figures quickly."

- Needs: instant access to verified numbers, fast load, readable on mobile
- Device: phone, tablet, laptop
- Technical level: low

### P3 — Data / BI Analyst
> "I want to explore the district-level data and understand geographic hotspots."

- Needs: sortable table, CFR comparisons, tooltips with precise values
- Device: desktop with large monitor
- Technical level: high

### P4 — Policy Researcher
> "I'm comparing intervention timing across outbreaks. I need the key event dates
> and case trajectory in one place."

- Needs: timeline, epidemic curve, country breakdown
- Device: laptop
- Technical level: medium

---

## 7. User Stories

| ID | As a… | I want to… | So that… |
|----|-------|-----------|---------|
| US-01 | Educator | Open the file by double-clicking it | Students can start immediately |
| US-02 | Educator | See animated counters on load | The scale of the outbreak is immediately felt |
| US-03 | Analyst | Toggle the epidemic curve between monthly new and cumulative | I can analyse both trend and total |
| US-04 | Analyst | Hover over chart data points | I can read precise values for any month |
| US-05 | Analyst | Sort the district table by cases, deaths, or CFR | I can rank districts by any metric |
| US-06 | Journalist | See the overall CFR at a glance | I can cite the figure accurately |
| US-07 | Journalist | See each country's CFR separately | I can compare Guinea vs Liberia vs Sierra Leone |
| US-08 | Researcher | Read the key events timeline | I understand the sequence of the outbreak |
| US-09 | Any user | Use the dashboard on a phone | I can access it from any device |
| US-10 | Any user | Know where the data came from | I can trust and cite the figures |

---

## 8. Functional Requirements

### FR-01 · Header

| ID | Requirement |
|----|-------------|
| FR-01.1 | Display project title: `EBOLA SURVEILLANCE DASHBOARD` |
| FR-01.2 | Display sub-title: `West Africa · 2014–2016 · WHO / CDC Data` |
| FR-01.3 | Show a blinking green status indicator labelled `OUTBREAK ENDED` |
| FR-01.4 | Display epidemic period: `DEC 2013 — JUN 2016` |
| FR-01.5 | Header is sticky — remains visible on scroll |

---

### FR-02 · KPI Cards

| ID | Requirement |
|----|-------------|
| FR-02.1 | Display four KPI cards: Total Cases, Total Deaths, HCW Infections, Countries Affected |
| FR-02.2 | Each card value animates from 0 to its target on first load using eased counter animation |
| FR-02.3 | Sub-label below each value provides context (e.g. `39.5% CFR`, `3 epicenters`) |
| FR-02.4 | Values: 28,616 cases · 11,310 deaths · 886 HCW infections · 10 countries |
| FR-02.5 | Each card has a distinct accent colour matching the design system |

---

### FR-03 · Epidemic Curve

| ID | Requirement |
|----|-------------|
| FR-03.1 | Display an area chart of Ebola cases and deaths from Mar 2014 to Mar 2016 (25 months) |
| FR-03.2 | Toggle between two views: **Monthly New** (default) and **Cumulative** |
| FR-03.3 | Cases plotted in orange; deaths plotted in red; both as filled areas with transparency |
| FR-03.4 | A dashed vertical reference line marks the WHO PHEIC declaration (Aug 2014) |
| FR-03.5 | A dashed vertical reference line marks the epidemic peak (Oct 2014) |
| FR-03.6 | Hovering any data point shows a dark-themed tooltip with month, cases, and deaths |
| FR-03.7 | Y-axis labels abbreviate thousands: `1k`, `5k`, `8k` |
| FR-03.8 | Chart is fully responsive — redraws correctly on window resize |

---

### FR-04 · Country Distribution

| ID | Requirement |
|----|-------------|
| FR-04.1 | Display a doughnut chart showing case share by country |
| FR-04.2 | Show Sierra Leone (49.4%), Liberia (37.3%), Guinea (13.3%), Others (<1%) |
| FR-04.3 | Custom legend below the chart with country name, colour, percentage |
| FR-04.4 | Hovering a segment shows country name and case count in a tooltip |

---

### FR-05 · Country Comparison Bar Chart

| ID | Requirement |
|----|-------------|
| FR-05.1 | Display a horizontal grouped bar chart with cases and deaths for each country |
| FR-05.2 | Include the five affected countries: Sierra Leone, Liberia, Guinea, Nigeria, Mali |
| FR-05.3 | Cases bar is orange; deaths bar is red |
| FR-05.4 | Y-axis shows country names; X-axis shows count (abbreviated) |

---

### FR-06 · CFR Analysis

| ID | Requirement |
|----|-------------|
| FR-06.1 | Display a CSS progress-bar section showing CFR for each of the five main countries |
| FR-06.2 | Bar colour encodes severity: CFR > 60% = red, > 40% = orange, else = yellow |
| FR-06.3 | CFR percentage is shown as a numeric label to the right of each bar |
| FR-06.4 | A summary line at the bottom shows the overall average CFR: `39.5%` |

---

### FR-07 · District Hotspot Table

| ID | Requirement |
|----|-------------|
| FR-07.1 | Display the top 15 most-affected districts in a sortable table |
| FR-07.2 | Columns: Rank · District · Country · Cases · Deaths · CFR · Severity |
| FR-07.3 | Clicking a column header sorts the table by that column (toggle asc/desc) |
| FR-07.4 | Severity badge has four levels: EXTREME (CFR > 60%), HIGH (> 40%), MODERATE (> 25%), ELEVATED |
| FR-07.5 | Alternating row background for readability |
| FR-07.6 | Country column uses a colour-coded badge matching the design system |

---

### FR-08 · Key Events Timeline

| ID | Requirement |
|----|-------------|
| FR-08.1 | Display a vertical timeline of 11 key outbreak milestones |
| FR-08.2 | Each entry shows: date, event description, dot coloured by type |
| FR-08.3 | Dot colours: red = critical, green = positive milestone, yellow = alert, cyan = end |
| FR-08.4 | A vertical spine connects all dots |
| FR-08.5 | The HCW callout card appears below the timeline entries |

---

### FR-09 · Footer

| ID | Requirement |
|----|-------------|
| FR-09.1 | Display data sources: `WHO · CDC · HDX · NEJM` |
| FR-09.2 | Display the data accuracy disclaimer |
| FR-09.3 | Display generation date and license |

---

## 9. Non-Functional Requirements

### Performance

| ID | Requirement |
|----|-------------|
| NFR-01 | Time to interactive: < 2 seconds on a 10 Mbps connection (first load) |
| NFR-02 | Time to interactive: < 200 ms on subsequent loads (cached CDN assets) |
| NFR-03 | Total HTML file size: ≤ 120 KB uncompressed |
| NFR-04 | No layout shift or flash of unstyled content on load |

### Compatibility

| ID | Requirement |
|----|-------------|
| NFR-05 | Works in Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| NFR-06 | Works at viewport widths from 375 px to 1920 px |
| NFR-07 | Opens directly from the filesystem (file:// protocol) without errors |
| NFR-08 | No service worker, no localStorage, no cookies |

### Reliability

| ID | Requirement |
|----|-------------|
| NFR-09 | If Google Fonts CDN fails, app falls back to system fonts |
| NFR-10 | If Chart.js CDN fails, a visible error message replaces each chart |
| NFR-11 | All data is embedded; charts render even with no internet after CDN loads |

### Accessibility

| ID | Requirement |
|----|-------------|
| NFR-12 | All colour combinations pass WCAG 2.1 AA contrast (4.5:1 normal, 3:1 large text) |
| NFR-13 | All interactive elements (toggles, sortable headers) are keyboard-operable |
| NFR-14 | Chart canvases have `aria-label` describing the chart content |
| NFR-15 | The district table uses proper `<thead>`, `<th scope>`, `<tbody>` markup |

---

## 10. Data Model

All data is embedded as JavaScript constants in the `<script>` block. No external data fetches.

```
MONTHS[25]             — Month labels, Mar '14 through Mar '16
MCASES[25]             — Monthly new cases (aggregate, all countries)
MDEATHS[25]            — Monthly new deaths
MCUM_CASES[25]         — Cumulative cases (derived from MCASES)
MCUM_DEATHS[25]        — Cumulative deaths (derived from MDEATHS)
COUNTRIES[5]           — {name, flag, cases, deaths, cfr, color}
DISTRICTS[15]          — {name, country, iso, cases, deaths, cfr}
KEY_EVENTS[11]         — {date, text, type}
PIE_DATA[4]            — {name, value, color} — country case share
```

### Data Sources & Accuracy

| Dataset | Primary Source | Notes |
|---------|---------------|-------|
| Monthly aggregates | WHO Ebola Situation Reports | Approximate — reconstructed from published reports |
| Country totals | WHO Final Report (Jun 2016) | Exact figures |
| District totals | WHO AFRO + HDX | Approximate |
| HCW data | WHO HCW Situation Reports | Approximate |
| Key event dates | CDC MMWR, WHO DoN | Exact |

---

## 11. UI/UX Specifications

### Layout Grid

```
┌─────────────────────────────────────────────────────┐
│  HEADER (sticky, 58px)                              │
├─────────────────────────────────────────────────────┤
│  KPI CARD  │  KPI CARD  │  KPI CARD  │  KPI CARD   │ ← 4 × 25% col
├────────────────────────────────┬────────────────────┤
│  EPIDEMIC CURVE (area chart)   │  COUNTRY PIE       │ ← 65% / 35%
│                                │  (donut + legend)  │
├────────────────────────────────┼────────────────────┤
│  COUNTRY BAR CHART (grouped)   │  CFR ANALYSIS      │ ← 65% / 35%
│                                │  (CSS progress)    │
├────────────────────────────────┼────────────────────┤
│  DISTRICT TABLE (sortable)     │  KEY EVENTS        │ ← 65% / 35%
│                                │  (timeline)        │
├─────────────────────────────────────────────────────┤
│  FOOTER                                             │
└─────────────────────────────────────────────────────┘
```

### Responsive Breakpoints

| Breakpoint | Layout |
|------------|--------|
| `> 1024px` | Full grid as above |
| `768–1024px` | KPI 2×2 grid; chart pairs stack vertically |
| `< 768px` | Single column; all cards full width |

### Interaction States

| Element | Default | Hover | Active | Focus |
|---------|---------|-------|--------|-------|
| Toggle button | muted border | highlight border | accent bg | visible ring |
| Table header | arrow icon (↕) | colour change | sort applied | visible ring |
| Chart tooltip | hidden | visible | — | — |

---

## 12. Component Inventory

| Component | Type | Chart.js Type | Notes |
|-----------|------|--------------|-------|
| Header | HTML/CSS | — | Sticky, contains status pill |
| KPI Card × 4 | HTML/CSS/JS | — | Animated counter on load |
| Epidemic Curve | Chart.js | `line` + fill | Toggle: new / cumulative |
| Country Donut | Chart.js | `doughnut` | Custom legend |
| Country Bars | Chart.js | `bar` (horizontal) | Grouped: cases + deaths |
| CFR Bars | HTML/CSS | — | CSS width = CFR% |
| District Table | HTML/CSS/JS | — | Client-side sort |
| Key Events | HTML/CSS | — | Vertical timeline |
| Footer | HTML/CSS | — | Sources + disclaimer |

---

## 13. Design System Tokens

### Colours

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#04070f` | Page background |
| `--surface` | `#080d1e` | Header, section backgrounds |
| `--card` | `#0b1229` | Card backgrounds |
| `--border` | `#152040` | Card borders, dividers |
| `--orange` | `#f97316` | Cases, primary accent |
| `--red` | `#ef4444` | Deaths, critical severity |
| `--green` | `#22c55e` | Positive milestones, resolved |
| `--cyan` | `#22d3ee` | Informational, end-of-outbreak |
| `--yellow` | `#fbbf24` | Alerts, HCW data |
| `--purple` | `#c084fc` | CFR, Liberia |
| `--text` | `#e2e8f0` | Primary text |
| `--mid` | `#94a3b8` | Secondary text |
| `--muted` | `#475569` | Labels, captions |

### Typography

| Token | Value | Usage |
|-------|-------|-------|
| `--display` | Barlow Condensed | Headings, KPI values, section titles |
| `--mono` | IBM Plex Mono | Data labels, captions, code, badges |
| Body | system-ui | Descriptive text |

### Spacing Scale

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48` px

### Border Radius

`6px` (small elements), `10px` (cards), `12px` (large cards), `20px` (pills)

---

## 14. Technical Architecture

```
ebola-dashboard-v2/
└── index.html          ← single deliverable; everything inside
    ├── <head>
    │   ├── meta, viewport, title
    │   ├── Google Fonts (Barlow Condensed + IBM Plex Mono)
    │   └── Chart.js 4.x via jsDelivr CDN
    │
    ├── <style>
    │   ├── CSS custom properties (design tokens)
    │   ├── Reset + base styles
    │   ├── Layout (CSS grid, flexbox)
    │   ├── Component styles (header, cards, table, timeline)
    │   ├── Animations (blink, fade-up, counter)
    │   └── Responsive media queries
    │
    ├── <body>
    │   ├── #header
    │   ├── #kpi-row (4 × .kpi-card)
    │   ├── #row-1 (.chart-card × 2)
    │   ├── #row-2 (.chart-card × 2)
    │   ├── #row-3 (.data-card × 2)
    │   └── <footer>
    │
    └── <script>
        ├── 1. DATA CONSTANTS
        ├── 2. CHART.JS GLOBAL DEFAULTS
        ├── 3. REFERENCE LINE PLUGIN (inline, no extra CDN)
        ├── 4. KPI COUNTER ANIMATION
        ├── 5. EPIDEMIC CURVE — init + toggle handler
        ├── 6. COUNTRY DONUT — init
        ├── 7. COUNTRY BAR CHART — init
        ├── 8. CFR BARS — DOM build
        ├── 9. DISTRICT TABLE — DOM build + sort
        ├── 10. KEY EVENTS TIMELINE — DOM build
        └── 11. DOMContentLoaded → run all inits
```

### CDN Dependencies

| Library | Version | URL | Purpose |
|---------|---------|-----|---------|
| Chart.js | 4.4.0 | jsDelivr | All chart rendering |
| Google Fonts | — | fonts.googleapis.com | Barlow Condensed, IBM Plex Mono |

> **Fallback policy:** If Chart.js fails to load, each canvas is replaced with an
> error message. If Google Fonts fails, the app falls back to `system-ui` and
> `'Courier New'` respectively.

---

## 15. File Structure

```
ebola-dashboard-v2/
└── index.html      ← The entire application. Nothing else required.
```

This is intentional. The goal is a single file that can be:

- Emailed as an attachment
- Opened from a USB stick
- Hosted on any static file server (GitHub Pages, S3, Netlify)
- Shared via Slack / Teams without any setup instructions

---

## 16. Acceptance Criteria

### Must Pass Before Ship

- [ ] Opens directly from filesystem (`file://`) in Chrome, Firefox, Safari — no server required
- [ ] All four KPI counters animate from 0 to target on load
- [ ] Epidemic curve renders with both Monthly New and Cumulative toggle states
- [ ] Both reference lines (PHEIC Aug 2014, Peak Oct 2014) are visible on the curve
- [ ] Country donut renders with correct percentages (SLE 49.4%, LBR 37.3%, GIN 13.3%)
- [ ] Country bar chart renders with grouped cases + deaths for all five countries
- [ ] CFR bars display correct values and correct severity colours
- [ ] District table renders all 15 rows and sorts correctly on all three columns
- [ ] Key events timeline renders all 11 milestones with correct dot colours
- [ ] Tooltip appears on chart hover showing precise values
- [ ] No console errors on load
- [ ] Layout is readable at 375 px viewport width
- [ ] File size is ≤ 120 KB

### Should Pass

- [ ] `aria-label` on all chart `<canvas>` elements
- [ ] Table uses correct `<th scope="col">` and `<th scope="row">` attributes
- [ ] Keyboard navigation reaches all interactive controls
- [ ] All text passes WCAG AA contrast ratio

---

## 17. Success Metrics

| Metric | Target |
|--------|--------|
| File opens without a server | ✅ Pass |
| Load time (cached CDN) | < 200 ms |
| File size | ≤ 120 KB |
| Chart render errors | 0 |
| Console errors on load | 0 |
| Responsive at 375 px | ✅ Pass |

---

## 18. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| OQ-1 | Should sorting persist between page refreshes (localStorage)? | Product | Deferred to v1.1 |
| OQ-2 | Should we add a print stylesheet so the dashboard prints cleanly? | Design | Deferred to v1.1 |
| OQ-3 | Is there a requirement to support right-to-left languages? | Product | No — English only in v1.0 |
| OQ-4 | Should the toggle state (new vs cumulative) persist on refresh? | Engineering | No — always reset to Monthly New |

---

*This PRD is the canonical specification for `ebola-dashboard-v2/index.html`.*  
*All implementation decisions should trace back to a requirement listed here.*  
*Changes require a version bump and changelog entry.*
