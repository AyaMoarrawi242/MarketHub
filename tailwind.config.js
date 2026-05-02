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
          bg: "#f3f4f6",
          card: "#cccccc",
          text: "#111827",
          border: "#d1d5db",
          gray: "#374151",    // لون الأيقونات والنصوص الثانوية
          muted: "#6b7280",   // رمادي متوسط للنصوص الثانوية
          input: "#ffffff",
        },
        dark: {
          bg: "#1f2937",
          card: "#374151",
          text: "#e5e7eb",
          border: "#374151",
          gray: "#e5e7eb",    // لون الأيقونات والنصوص الثانوية
          muted: "#9ca3af",   // رمادي متوسط للنصوص الثانوية
          input: "#374151",   // خلفية حقول الإدخال بالوضع الغامق
          textInput: "#e5e7eb", // نص الحقول بالوضع الغامق
        },
        accent: {
          main: "#22c55e",
          active: "#16a34a"
        }
      },
    },
  },
  plugins: [],
};
