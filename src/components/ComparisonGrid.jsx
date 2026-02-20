/**
 * ComparisonGrid
 *
 * Determines "best" flags for each product metric, then renders ProductCards.
 * Sorting: lowest price first (best deal). Ties broken by rating, then reviews.
 */

import ProductCard from "./ProductCard";

function getBestFlags(products, product) {
  const flags = [];

  // Best price = lowest non-null price
  const prices = products.map((p) => p.price).filter(Boolean);
  if (product.price && Math.min(...prices) === product.price) flags.push("price");

  // Best rating = highest
  const ratings = products.map((p) => p.rating).filter(Boolean);
  if (product.rating && Math.max(...ratings) === product.rating) flags.push("rating");

  // Most reviews = highest
  const reviews = products.map((p) => p.reviewCount).filter(Boolean);
  if (product.reviewCount && Math.max(...reviews) === product.reviewCount) flags.push("reviews");

  return flags;
}

function sortProducts(products) {
  return [...products].sort((a, b) => {
    // Prioritize: has price > lower price > higher rating > more reviews
    if (a.price && !b.price) return -1;
    if (!a.price && b.price) return 1;
    if (a.price && b.price && a.price !== b.price) return a.price - b.price;
    if (a.rating !== b.rating) return (b.rating || 0) - (a.rating || 0);
    return (b.reviewCount || 0) - (a.reviewCount || 0);
  });
}

export default function ComparisonGrid({ products, errors }) {
  const sorted = sortProducts(products);

  return (
    <div className="space-y-6">
      {/* Summary banner */}
      {sorted.length >= 2 && (
        <div
          className="p-4 rounded-sm flex items-center gap-3 fade-up"
          style={{ background: "#fff8f5", border: "1px solid var(--accent-light)" }}
        >
          <span style={{ color: "var(--accent)", fontSize: "1.2rem" }}>★</span>
          <div>
            <p className="text-sm font-medium" style={{ color: "var(--ink)" }}>
              Best deal: {" "}
              <span style={{ color: "var(--accent)" }}>
                {sorted[0].title?.split("|")[0].trim()}
              </span>
            </p>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              {sorted[0].price ? `$${sorted[0].price.toFixed(2)}` : "Price unknown"} · {sorted[0].rating ? `${sorted[0].rating}/5` : "No rating"} · Ranked #1 across price, rating & reviews
            </p>
          </div>
        </div>
      )}

      {/* Cards grid */}
      <div
        className={`grid gap-4 ${
          sorted.length === 2
            ? "grid-cols-1 md:grid-cols-2"
            : "grid-cols-1 md:grid-cols-3"
        }`}
      >
        {sorted.map((product, i) => (
          <ProductCard
            key={product.id}
            product={product}
            rank={i}
            bestFlags={getBestFlags(sorted, product)}
            delay={Math.min(i + 1, 3)}
          />
        ))}
      </div>

      {/* Errors */}
      {Object.entries(errors).length > 0 && (
        <div className="space-y-2">
          {Object.entries(errors).map(([url, err]) => (
            <div
              key={url}
              className="p-3 rounded-sm text-xs flex items-start gap-2"
              style={{ background: "#fff5f5", border: "1px solid #fcc", color: "#c0392b" }}
            >
              <span>⚠</span>
              <div>
                <span className="font-mono">{url.slice(0, 50)}…</span>
                <br />
                {err}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
