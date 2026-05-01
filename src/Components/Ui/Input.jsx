import React from "react";

const Input = React.forwardRef(({ label, error, className = "", type = "text", ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-bold text-light-text dark:text-dark-text">{label}</label>}
      <input
        ref={ref}
        type={type}
        // تم إضافة text-gray-900 لضمان وضوح النص داخل الحقل الأبيض
        className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all 
          bg-white dark:bg-dark-input text-gray-900 dark:text-white font-medium placeholder-gray-400 dark:placeholder-gray-500 shadow-sm
          ${
            error 
              ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200/50" 
              : "border-accent-main/30 dark:border-accent-main/20 hover:border-accent-main/60 focus:border-accent-main focus:ring-4 focus:ring-accent-main/20"
          } ${className}`}
        {...props}
      />
      {error && <span className="text-xs text-red-600 font-bold">{error}</span>}
    </div>
  );
});

export default Input;
