import React from "react";

const Select = React.forwardRef(({ label, error, options = [], className = "", ...props }, ref) => {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-bold text-light-text dark:text-dark-text">{label}</label>}
      <select
        ref={ref}
        className={`w-full px-4 py-3 border-2 rounded-lg outline-none transition-all bg-white dark:bg-dark-input text-light-text dark:text-dark-text font-medium shadow-sm appearance-none
        ${
          error 
            ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-200/50" 
            : "border-accent-main/30 dark:border-accent-main/20 hover:border-accent-main/60 focus:border-accent-main focus:ring-4 focus:ring-accent-main/20"
        } ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-red-600 font-bold">{error}</span>}
    </div>
  );
});

export default Select;
