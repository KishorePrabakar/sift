/**
 * ProductCard — displays one product's data.
 * bestFlags tells us which metrics this product "wins" so we can highlight them.
 */

function Stars({ rating }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24">
          <polygon
            points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
            fill={
              i < full
                ? "var(--gold)"
                : i === full && half
                ? "var(--gold)"
                : "var(--border)"
            }
            stroke="none"
          />
        </svg>
      ))}
    </span>
  );
}

function StatBlock({ label, value, highlight }) {
  return (
    <div
      className="p-3 rounded-sm"
      style={{
        background: highlight ? "#fff8f5" : "#f9f8f6",
        border: highlight ? "1px solid var(--accent-light)" : "1px solid var(--border)",
      }}
    >
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={{ color: highlight ? "var(--accent)" : "var(--ink)" }}>
        {value}
      </div>
    </div>
  );
}

export default function ProductCard({ product, rank, bestFlags, delay }) {
  const isBest = rank === 0;

  const formatReviews = (n) => {
    if (!n) return "—";
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
    return n.toLocaleString();
  };

  return (
    <div
      className={`card p-5 flex flex-col gap-4 fade-up delay-${delay}`}
      style={{ borderTop: isBest ? "3px solid var(--accent)" : "3px solid transparent" }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {isBest && <span className="badge-best">Best Deal</span>}
            {!isBest && <span className="badge-runner">#{rank + 1}</span>}
            {product.brand && (
              <span className="text-xs" style={{ color: "var(--muted)" }}>
                {product.brand}
              </span>
            )}
          </div>
          <h3
            className="text-sm font-medium leading-snug"
            style={{ color: "var(--ink)" }}
          >
            {product.title}
          </h3>
        </div>
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            className="w-16 h-16 object-contain flex-shrink-0 rounded-sm"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2">
        <StatBlock
          label="Price"
          value={product.price ? `$${product.price.toFixed(2)}` : "—"}
          highlight={bestFlags.includes("price")}
        />
        <StatBlock
          label="Rating"
          value={product.rating ? `${product.rating}/5` : "—"}
          highlight={bestFlags.includes("rating")}
        />
        <StatBlock
          label="Reviews"
          value={formatReviews(product.reviewCount)}
          highlight={bestFlags.includes("reviews")}
        />
      </div>

      {/* Rating stars */}
      {product.rating && (
        <div className="flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {product.rating} out of 5
          </span>
        </div>
      )}

      <div className="divider" />

      {/* Features */}
      <div>
        <p className="stat-label mb-2">Key Features</p>
        <ul className="space-y-1.5">
          {product.features?.length > 0 ? (
            product.features.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-xs" style={{ color: "var(--ink)" }}>
                <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--accent)" }}>
                  ›
                </span>
                {f}
              </li>
            ))
          ) : (
            <li className="text-xs" style={{ color: "var(--muted)" }}>
              No features available
            </li>
          )}
        </ul>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <span
          className="text-xs"
          style={{
            color:
              product.availability?.toLowerCase().includes("in stock")
                ? "#2a7d4f"
                : "var(--muted)",
          }}
        >
          {product.availability}
        </span>
        <a
          href={product.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium underline-offset-2 hover:underline"
          style={{ color: "var(--accent)" }}
        >
          View on Amazon ↗
        </a>
      </div>
    </div>
  );
}
