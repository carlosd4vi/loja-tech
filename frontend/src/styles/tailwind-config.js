// Centralized Tailwind config used with the CDN build
// This file sets the global `tailwind.config` before the CDN script runs
window.tailwind = window.tailwind || {};

tailwind.config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#2b7cee",
        "background-light": "#f6f7f8",
        "background-dark": "#101822",
        "surface-light": "#ffffff",
        "surface-dark": "#18212f",
        "border-light": "#dbe0e6",
        "border-dark": "#2a3544",
        "text-main-light": "#111418",
        "text-main-dark": "#ffffff",
        "text-secondary-light": "#617289",
        "text-secondary-dark": "#9ca3af",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {"DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px"},
    },
  },
};
