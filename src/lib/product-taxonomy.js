export const PRODUCT_TYPE_VALUES = [
  "HOODIE",
  "TRIKOT",
  "SHIRT",
  "HOSE",
  "JACKE",
  "ACCESSOIRE",
];

export const PRODUCT_AUDIENCE_VALUES = [
  "DAMEN",
  "HERREN",
  "UNISEX",
  "JUGEND",
  "KINDER",
];

export const PRODUCT_TYPE_OPTIONS = [
  { value: "HOODIE", label: "Hoodie" },
  { value: "TRIKOT", label: "Trikot" },
  { value: "SHIRT", label: "Shirt" },
  { value: "HOSE", label: "Hose" },
  { value: "JACKE", label: "Jacke" },
  { value: "ACCESSOIRE", label: "Accessoire" },
];

export const AUDIENCE_OPTIONS = [
  { value: "DAMEN", label: "Damen" },
  { value: "HERREN", label: "Herren" },
  { value: "UNISEX", label: "Unisex" },
  { value: "JUGEND", label: "Jugend" },
  { value: "KINDER", label: "Kinder" },
];

export const PRODUCT_TYPE_LABEL_MAP = Object.fromEntries(
  PRODUCT_TYPE_OPTIONS.map((option) => [option.value, option.label]),
);

export const AUDIENCE_LABEL_MAP = Object.fromEntries(
  AUDIENCE_OPTIONS.map((option) => [option.value, option.label]),
);

const PRODUCT_TYPES_SET = new Set(PRODUCT_TYPE_VALUES);
const PRODUCT_AUDIENCES_SET = new Set(PRODUCT_AUDIENCE_VALUES);

export function normalizeProductType(type) {
  if (!type) return null;
  const value = String(type).trim().toUpperCase();
  return PRODUCT_TYPES_SET.has(value) ? value : null;
}

export function normalizeAudiences(audiences) {
  if (!Array.isArray(audiences)) return [];

  const normalized = audiences
    .map((audience) => String(audience).trim().toUpperCase())
    .filter((audience) => PRODUCT_AUDIENCES_SET.has(audience));

  return Array.from(new Set(normalized));
}

export function isValidProductType(type) {
  return PRODUCT_TYPES_SET.has(String(type || "").trim().toUpperCase());
}

export function isValidAudience(audience) {
  return PRODUCT_AUDIENCES_SET.has(String(audience || "").trim().toUpperCase());
}

export function formatProductType(type) {
  return PRODUCT_TYPE_LABEL_MAP[type] || null;
}

export function formatAudience(audience) {
  return AUDIENCE_LABEL_MAP[audience] || audience;
}
