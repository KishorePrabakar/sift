// Mock data for development & demo purposes.
// Real scraping hits CORS — we use allorigins.win proxy in useProductFetch.js
// to fetch Amazon pages server-side, then parse the HTML client-side.

export const MOCK_PRODUCTS = [
  {
    id: "B08N5KWB9H",
    url: "https://www.amazon.com/dp/B08N5KWB9H",
    title: "Echo Dot (4th Gen) | Smart speaker with Alexa | Charcoal",
    image: "https://m.media-amazon.com/images/I/714Rq4k05UL._AC_SL1000_.jpg",
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviewCount: 847321,
    availability: "In Stock",
    features: [
      "Compact smart speaker with Alexa",
      "Improved speaker for richer, louder sound",
      "Voice control your entertainment",
      "Alexa is always ready to help",
      "Pair with a compatible Fire TV device",
    ],
    brand: "Amazon",
    asin: "B08N5KWB9H",
  },
  {
    id: "B09B8V1LZ3",
    url: "https://www.amazon.com/dp/B09B8V1LZ3",
    title: "Echo Dot (5th Gen, 2022 release) | Smart Speaker with Alexa | Deep Sea Blue",
    image: "https://m.media-amazon.com/images/I/71xoR4A6q8L._AC_SL1000_.jpg",
    price: 49.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 312094,
    availability: "In Stock",
    features: [
      "Our best sounding Echo Dot ever",
      "Motion detection — turns on when you enter the room",
      "Improved audio with deeper bass",
      "Tap gesture controls on top",
      "Eero built-in to extend your wifi network",
    ],
    brand: "Amazon",
    asin: "B09B8V1LZ3",
  },
  {
    id: "B07XJ8C8F7",
    url: "https://www.amazon.com/dp/B07XJ8C8F7",
    title: "Echo (4th Gen) | With premium sound, smart home hub, and Alexa | Charcoal",
    image: "https://m.media-amazon.com/images/I/617GcPFKz3L._AC_SL1000_.jpg",
    price: 74.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviewCount: 215680,
    availability: "In Stock",
    features: [
      "Premium sound with Dolby processing",
      "Built-in smart home hub for Zigbee devices",
      "Works as a Wi-Fi extender with Eero",
      "Drop In, Announcements, and Calling",
      "Temperature sensor included",
    ],
    brand: "Amazon",
    asin: "B07XJ8C8F7",
  },
];

// Map ASIN → mock product for easy lookup in demo mode
export const MOCK_BY_ASIN = Object.fromEntries(
  MOCK_PRODUCTS.map((p) => [p.asin, p])
);

// Extract ASIN from an Amazon URL
export function extractAsin(url) {
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/,
    /\/gp\/product\/([A-Z0-9]{10})/,
    /\/ASIN\/([A-Z0-9]{10})/,
    /([A-Z0-9]{10})(?:[/?]|$)/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return null;
}
