/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          bg: "#f3f4f6]",
          text: "#111827",
          border: "#d1d5db",
          gray: "#374151",
        },
        dark: {
          bg: "#1f2937",
          text: "#e5e7eb",
          border: "#374151",
          gray: "#e5e7eb",
        },
        accent: {
          main: "#22c55e",
          active: "#16a34a",
         
        },
      },
    },
  },
  plugins: [],
};
