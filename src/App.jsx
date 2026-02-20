import CompareForm from "./components/CompareForm";
import ComparisonGrid from "./components/ComparisonGrid";
import LoadingSpinner from "./components/LoadingSpinner";
import { useProductFetch } from "./hooks/useProductFetch";

export default function App() {
  const { products, loading, errors, stage, compare, reset } = useProductFetch();
  const hasResults = products.length > 0 || Object.keys(errors).length > 0;

  return (
    <div className="min-h-screen" style={{ background: "var(--paper)" }}>
      {/* Grain overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          opacity: 0.4,
          zIndex: 0,
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-baseline gap-3 mb-1">
            <h1 className="font-display text-4xl" style={{ color: "var(--ink)" }}>
              Sift
            </h1>
            <span
              className="text-xs font-mono px-2 py-0.5 rounded-sm"
              style={{ background: "var(--border)", color: "var(--muted)" }}
            >
              v0.1
            </span>
          </div>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            Paste 2–3 Amazon product URLs. We'll extract price, rating, features
            and highlight the best deal.
          </p>
        </header>

        {/* Input area */}
        <section
          className="card p-6 mb-8"
          style={{ borderLeft: "4px solid var(--ink)" }}
        >
          <CompareForm
            onCompare={compare}
            onReset={reset}
            loading={loading}
            hasResults={hasResults}
          />
        </section>

        {/* How it works — only shown initially */}
        {!hasResults && !loading && (
          <section className="mb-8 fade-up">
            <p className="stat-label mb-3">How it works</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                ["01", "Paste URLs", "Drop in 2–3 Amazon product links from your browser."],
                ["02", "We Fetch", "A CORS proxy fetches the page server-side. We parse price, rating & features."],
                ["03", "Compare", "Products rank by value score. Best deal is highlighted automatically."],
              ].map(([num, title, desc]) => (
                <div key={num} className="p-4" style={{ border: "1px solid var(--border)", borderRadius: 2 }}>
                  <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>{num}</span>
                  <h3 className="text-sm font-medium mt-1 mb-1" style={{ color: "var(--ink)" }}>{title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Loading */}
        {loading && <LoadingSpinner stage={stage} />}

        {/* Results */}
        {!loading && hasResults && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <p className="stat-label">
                {products.length} product{products.length !== 1 ? "s" : ""} compared
              </p>
            </div>
            <ComparisonGrid products={products} errors={errors} />
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-6" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-xs text-center" style={{ color: "var(--muted)" }}>
            Built with React + Vite + Tailwind ·{" "}
            <a
              href="https://github.com/KishorePrabakar/sift"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-2"
              style={{ color: "var(--ink)" }}
            >
              github.com/KishorePrabakar/sift
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
