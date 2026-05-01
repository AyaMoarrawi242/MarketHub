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
          bg: "#d1d5db",       // فضي فاتح (رمادي) للخلفية العامة
          card: "#ffffff",     // أبيض ناصع للبطاقات
          text: "#111827",     // نص غامق
          muted: "#4b5563",    // نص ثانوي
          border: "#9ca3af",   // حدود فضية
          input: "#f3f4f6",    // خلفية الحقول
          icon: "#6b7280",     // درجة فضية للأيقونات
        },
        dark: {
          bg: "#030712",       // أسود مزرق للخلفية العامة
          card: "#111827",     // رمادي غامق للبطاقات
          text: "#f9fafb",     // نص فاتح
          muted: "#9ca3af",    // نص ثانوي
          border: "#374151",   // حدود
          input: "#1f2937",    // خلفية الحقول
          icon: "#9ca3af",     // فضي للأيقونات (فاتح)
        },
        market: {
          primary: "#2563eb",
          secondary: "#22c55e",
          danger: "#ef4444",
        },
        accent: {
          main: "#22c55e",
          active: "#16a34a",
        }
      },
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
