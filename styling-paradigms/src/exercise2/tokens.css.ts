import { createGlobalTheme } from "@vanilla-extract/css";

export const vars = createGlobalTheme(":root", {
  color: {
    primary: "#9333ea",
    primaryHover: "#7e22ce",
    secondary: "#64748b",
    secondaryHover: "#475569",
    danger: "#dc2626",
    dangerHover: "#b91c1c",
    successBg: "#dcfce7",
    successText: "#15803d",
    warningBg: "#fef3c7",
    warningText: "#b45309",
    errorBg: "#fee2e2",
    errorText: "#b91c1c",
    bgCard: "#ffffff",
    border: "#e2e8f0",
    disabledBg: "#e2e8f0",
    disabledText: "#94a3b8",
  },
  space: {
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
  },
  font: {
    body: "system-ui, -apple-system, sans-serif",
  },
  fontSize: {
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
  },
  borderRadius: {
    md: "8px",
    lg: "16px",
    full: "9999px",
  },
  shadow: {
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
});
