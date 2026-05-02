/**
 * تنسيق الأرقام كعملة عربية (ل.س)
 * مثال: 1500000 -> "1,500,000 ل.س"
 */
export const formatPrice = (price) => {
  if (!price && price !== 0) return "مجاني";
  return new Intl.NumberFormat("ar-SY", {
    style: "decimal",
  }).format(price) + " ل.س";
};

/**
 * تنسيق التاريخ ليظهر بالعربية
 * مثال: "2025-01-15" -> "١٥ يناير ٢٠٢٥"
 */
export const formatDate = (date) => {
  if (!date) return "غير محدد";
  return new Date(date).toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * تنسيق الوقت (مثلاً للرسائل)
 * مثال: "10:30"
 */
export const formatTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
