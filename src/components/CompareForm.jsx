import { useState } from "react";
import { MOCK_PRODUCTS } from "../data/mockProducts";

const PLACEHOLDER_URLS = [
  "https://www.amazon.com/dp/B08N5KWB9H",
  "https://www.amazon.com/dp/B09B8V1LZ3",
  "https://www.amazon.com/dp/B07XJ8C8F7",
];

export default function CompareForm({ onCompare, onReset, loading, hasResults }) {
  const [urls, setUrls] = useState(["", "", ""]);

  const handleChange = (i, val) => {
    setUrls((prev) => prev.map((u, idx) => (idx === i ? val : u)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCompare(urls);
  };

  const handleReset = () => {
    setUrls(["", "", ""]);
    onReset();
  };

  const loadDemo = () => {
    setUrls(MOCK_PRODUCTS.map((p) => p.url));
  };

  const filledCount = urls.filter((u) => u.trim().length > 0).length;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {urls.map((url, i) => (
        <div key={i} className="flex items-center gap-2">
          <span
            className="text-xs font-mono w-5 text-center flex-shrink-0"
            style={{ color: "var(--muted)" }}
          >
            {i + 1}
          </span>
          <input
            type="url"
            className="input-url"
            placeholder={`Amazon URL — e.g. ${PLACEHOLDER_URLS[i]}`}
            value={url}
            onChange={(e) => handleChange(i, e.target.value)}
            disabled={loading}
          />
        </div>
      ))}

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          className="btn-primary"
          disabled={loading || filledCount < 2}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="spinner" style={{ width: 14, height: 14 }} />
              Comparing…
            </span>
          ) : (
            "Compare Products"
          )}
        </button>

        {!hasResults && !loading && (
          <button type="button" className="btn-ghost" onClick={loadDemo}>
            Load demo
          </button>
        )}

        {(hasResults || loading) && (
          <button type="button" className="btn-ghost" onClick={handleReset}>
            Clear
          </button>
        )}

        <span className="text-xs ml-auto" style={{ color: "var(--muted)" }}>
          {filledCount}/3 URLs
        </span>
      </div>
    </form>
  );
}
