/**
 * useProductFetch.js
 *
 * Custom hook that manages all fetching state.
 *
 * Strategy:
 *  1. Try to match URL against mock data (ASIN lookup) → instant demo
 *  2. If not in mock, attempt real fetch via allorigins.win proxy
 *  3. Parse HTML → clean product object
 *
 * State shape:
 *  { products: [], loading: boolean, errors: {url: string}, stage: string }
 */

import { useState, useCallback } from "react";
import { parseAmazonHtml } from "../utils/parseProduct";
import { MOCK_BY_ASIN, extractAsin } from "../data/mockProducts";

const PROXY = "https://api.allorigins.win/get?url=";

async function fetchProduct(url) {
  // 1. Check mock data first (for demo / when proxy is slow)
  const asin = extractAsin(url);
  if (asin && MOCK_BY_ASIN[asin]) {
    // Simulate realistic loading feel
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 600));
    return { ...MOCK_BY_ASIN[asin], url };
  }

  // 2. Real fetch via CORS proxy
  const proxyUrl = `${PROXY}${encodeURIComponent(url)}`;
  const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`Proxy returned ${res.status}`);

  const json = await res.json();
  if (!json.contents) throw new Error("Empty response from proxy");

  const product = parseAmazonHtml(json.contents, url);

  if (!product.title || product.title === "Unknown Product") {
    throw new Error(
      "Could not parse product. Amazon may have blocked the request."
    );
  }

  return product;
}

export function useProductFetch() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [stage, setStage] = useState("");

  const compare = useCallback(async (urls) => {
    const validUrls = urls.filter((u) => u.trim().length > 0);
    if (validUrls.length < 2) return;

    setLoading(true);
    setProducts([]);
    setErrors({});
    setStage("Fetching products…");

    const results = await Promise.allSettled(
      validUrls.map((url) => fetchProduct(url.trim()))
    );

    const newProducts = [];
    const newErrors = {};

    results.forEach((result, i) => {
      if (result.status === "fulfilled") {
        newProducts.push(result.value);
      } else {
        newErrors[validUrls[i]] = result.reason?.message || "Unknown error";
      }
    });

    setStage("Analyzing…");
    await new Promise((r) => setTimeout(r, 300));

    setProducts(newProducts);
    setErrors(newErrors);
    setLoading(false);
    setStage("");
  }, []);

  const reset = useCallback(() => {
    setProducts([]);
    setErrors({});
    setLoading(false);
    setStage("");
  }, []);

  return { products, loading, errors, stage, compare, reset };
}
