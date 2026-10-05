/**
 * ProductIcon — line icons for the Anoryx EcoSystem products (keyed by products.js `icon`).
 */

const PATHS = {
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 3v3M4.2 7.2l2.1 2.1M3 15h3M18 15h3M19.8 7.2l-2.1 2.1" />
      <path d="M12 15l4-5" />
      <circle cx="12" cy="15" r="1.6" />
      <path d="M5 20h14" />
    </>
  ),
  people: (
    <>
      <circle cx="12" cy="5" r="3" />
      <circle cx="5" cy="19" r="3" />
      <circle cx="19" cy="19" r="3" />
      <path d="M12 8v4M8.5 16.5L10 14M15.5 16.5L14 14" />
    </>
  ),
  hub: (
    <>
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="5" r="2" />
      <circle cx="20" cy="5" r="2" />
      <circle cx="12" cy="21" r="2" />
      <path d="M6 6.2l3.8 3.6M18 6.2l-3.8 3.6M12 15v4" />
    </>
  ),
};

export default function ProductIcon({ name, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {PATHS[name] || PATHS.hub}
    </svg>
  );
}
