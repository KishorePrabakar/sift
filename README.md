# 🔍 Sift — Amazon Product Comparison

Paste 2–3 Amazon product URLs → see price, rating, and features side-by-side → spot the best deal instantly.

![Visit Site](https://sift-silk.vercel.app/)

## Features

- Compare up to 3 Amazon products at once
- Side-by-side cards: price, star rating, review count, key bullet features
- **Best Deal** badges — lowest price 💰, top rated ⭐, most popular 🔥
- Summary comparison table
- Clean loading skeletons & error handling
- Fully responsive (mobile → desktop)

## 🛠 Tech Stack

| Layer | Tech | Why |
|---|---|---|
| Frontend | React 18 + Vite | Fast HMR, modern tooling |
| Styling | Tailwind CSS v3 | Utility-first, no CSS files to manage |
| Backend | Node.js + Express | Thin scraping proxy to bypass CORS |
| Parsing | Cheerio | jQuery-like HTML parsing on server |
| HTTP | Axios | Handles gzip, redirects, timeouts cleanly |

## 🚀 Quick Start

### 1. Clone & install

```bash
git clone https://github.com/KishorePrabakar/sift.git
cd sift

# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 2. Run both servers

**Terminal 1 — Backend (port 3001):**
```bash
cd backend && npm run dev
```

**Terminal 2 — Frontend (port 5173):**
```bash
cd frontend && npm run dev
```

Open http://localhost:5173

### 3. Mock mode (no backend needed)

Open `frontend/src/hooks/useProductData.js` and set:
```js
const MOCK_MODE = true;
```
This uses demo data — great for offline demos!

## 🏗 Project Structure

```
sift/
├── backend/
│   ├── index.js          ← Express scraping proxy
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── URLInput.jsx        ← URL entry + validation
    │   │   ├── ProductCard.jsx     ← Individual product display
    │   │   ├── ComparisonTable.jsx ← Side-by-side summary table
    │   │   └── LoadingSpinner.jsx  ← Skeleton loaders
    │   ├── hooks/
    │   │   └── useProductData.js   ← Data fetching + state logic
    │   ├── utils/
    │   │   └── helpers.js          ← Price parsing, formatting
    │   └── App.jsx                 ← Root component + layout
    └── vite.config.js
```

## 🔑 Why a Backend Proxy?

Browsers enforce **CORS** — you can't fetch `amazon.com` directly from frontend JavaScript because Amazon doesn't set `Access-Control-Allow-Origin: *`. The backend proxy:
1. Runs on Node.js (no CORS restrictions)
2. Rotates User-Agent headers to mimic a real browser
3. Parses the HTML with Cheerio and returns clean JSON
4. The Vite dev server `/api` proxy routes frontend calls to port 3001 seamlessly

## 🗺 Roadmap

- [ ] Keepa API integration for price history charts
- [ ] Persistent comparison URLs (shareable links)
- [ ] Browser extension version
- [ ] Price drop alerts

---

Made with ❤️ by [Kishore Prabakar](https://github.com/KishorePrabakar)

Local test:

```bash
npm install
npm run build
npx serve dist    # or `vite preview` to preview the built site
```
