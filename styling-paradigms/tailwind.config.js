/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0284c7",
          600: "#0369a1",
          700: "#075985",
        },
        surface: {
          main: "#f8fafc",
          card: "#ffffff",
          sidebar: "#0f172a",
        },
      },
      borderRadius: {
        custom: "12px",
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
