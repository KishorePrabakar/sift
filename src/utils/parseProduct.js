/**
 * parseProduct.js
 *
 * Parses raw Amazon HTML (fetched via proxy) into a clean product object.
 * We use DOMParser — safe, built-in, no eval() or innerHTML injection risk.
 *
 * WHY PROXY? Amazon blocks direct browser fetch (CORS + bot detection).
 * allorigins.win is a free CORS proxy: it fetches the URL server-side
 * and returns the HTML to us. Rate-limited but fine for demos.
 */

export function parseAmazonHtml(html, originalUrl) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const title =
    doc.querySelector("#productTitle")?.textContent?.trim() ||
    doc.querySelector(".product-title-word-break")?.textContent?.trim() ||
    "Unknown Product";

  // Price — Amazon has many price selectors depending on product type
  const priceSelectors = [
    ".priceToPay .a-price-whole",
    "#priceblock_ourprice",
    "#priceblock_dealprice",
    ".a-price .a-offscreen",
    "#price_inside_buybox",
  ];
  let priceText = "";
  for (const sel of priceSelectors) {
    priceText = doc.querySelector(sel)?.textContent?.trim();
    if (priceText) break;
  }
  const price = parseFloat(priceText?.replace(/[^0-9.]/g, "")) || null;

  // Rating
  const ratingText = doc
    .querySelector("#acrPopover, .a-icon-alt")
    ?.getAttribute("title");
  const rating = parseFloat(ratingText) || null;

  // Review count
  const reviewText = doc
    .querySelector("#acrCustomerReviewText")
    ?.textContent?.trim();
  const reviewCount =
    parseInt(reviewText?.replace(/[^0-9]/g, ""), 10) || null;

  // Features / bullet points
  const featureEls = doc.querySelectorAll(
    "#feature-bullets ul li span.a-list-item"
  );
  const features = Array.from(featureEls)
    .map((el) => el.textContent.trim())
    .filter((t) => t.length > 5 && !t.toLowerCase().includes("make sure"))
    .slice(0, 6);

  // Image
  const image =
    doc.querySelector("#landingImage, #imgBlkFront")?.getAttribute("src") ||
    doc.querySelector(".a-dynamic-image")?.getAttribute("src") ||
    null;

  // Availability
  const availability =
    doc.querySelector("#availability span")?.textContent?.trim() || "Unknown";

  // Brand
  const brand =
    doc.querySelector("#bylineInfo")?.textContent?.replace(/^(Visit|Brand:|by)\s*/i, "").trim() ||
    null;

  // ASIN from URL
  const asinMatch = originalUrl.match(/\/dp\/([A-Z0-9]{10})/);
  const asin = asinMatch?.[1] || null;

  return {
    id: asin || Math.random().toString(36).slice(2),
    url: originalUrl,
    asin,
    title,
    price,
    rating,
    reviewCount,
    features,
    image,
    availability,
    brand,
  };
}
