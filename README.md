# De Caires, Fitzpatrick & Karran — Website

A static HTML/CSS/JS website built from the Figma design for DFK Attorneys-at-Law.

## How to view it

Because the pages load shared header/footer/data via JavaScript (`fetch`-free, but
using `<script>` includes), just open any `.html` file directly in a browser —
no build step or server required. Double-click `index.html` to start.

If you prefer running a local server (recommended for the smoothest experience):

```bash
cd dfk-site
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html`.

## Structure

```
dfk-site/
├── index.html                  Home
├── areas-of-expertise.html     Corporate & Commercial (practice area list)
├── property-estates.html       Property & Estates category
├── mining-environmental.html   Mining & Environmental category
├── dispute-resolution.html     Dispute Resolution category
├── service-detail.html         Reusable template — reads ?service=<slug>
├── attorneys.html              Lawyers Directory
├── about.html                  Our History
├── contact.html                Contact form + details
├── corporate-services.html     DFK Corporate Services Inc. landing page
├── links.html                  External resource links
├── css/style.css               All styling (design tokens at the top)
├── js/components.js            Shared header/footer + nav interactivity
├── js/services-data.js         Practice-area content, used by expertise pages
└── assets/img/                 Logo, hero art, attorney & founder photos
```

## Notes for whoever maintains this next

- **Practice areas** live in `js/services-data.js`. Each entry has a `category`
  array (`corporate-commercial`, `property-estates`, `mining-environmental`,
  `dispute-resolution`) controlling which listing page(s) it appears on, and a
  `slug` used to build its detail-page URL: `service-detail.html?service=<slug>`.
- **Header/nav/footer** are injected by `js/components.js` so they only need to
  be edited in one place. Every page calls `dfkInitHeaderFooter('<page-key>')`
  to mark the correct nav item active.
- The **Contact** form and the six placeholder "Link" buttons on service detail
  pages are not wired to a backend — they're front-end only, matching what the
  Figma mockups showed. Swap in real endpoints/links when ready.
- The **Links** page has no corresponding Figma frame, so its content
  (Judiciary of Guyana, GRA, CARICOM, CCJ) is a reasonable placeholder — replace
  with whatever the firm actually wants linked.
- Fonts: Playfair Display (headings) + Poppins (body/nav), loaded from Google
  Fonts in `css/style.css`.
