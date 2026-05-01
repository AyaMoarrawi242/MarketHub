import React from "react";

const Textarea = React.forwardRef(({ label, error, className = "", rows = 4, ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-bold text-light-text dark:text-dark-text">{label}</label>}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full px-4 py-3 border-2 rounded-lg outline-none resize-none transition-all bg-white dark:bg-dark-input text-light-text dark:text-dark-text font-medium shadow-sm
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

export default Textarea;
