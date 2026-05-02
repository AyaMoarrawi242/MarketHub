import React from "react";

const Button = ({ children, variant = "primary", size = "md", loading = false, disabled = false, className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-dark-bg";

  const variants = {
    primary: "bg-accent-main text-white hover:bg-accent-active focus:ring-accent-main/50 shadow-md hover:shadow-lg",
    secondary: "bg-light-input dark:bg-dark-input text-light-text dark:text-dark-textInput border border-light-border dark:border-dark-border hover:bg-light-border dark:hover:bg-dark-border focus:ring-accent-main/30",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500/50 shadow-md",
    ghost: "bg-transparent text-light-muted dark:text-dark-muted hover:bg-light-input dark:hover:bg-dark-input focus:ring-accent-main/30",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${loading || disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          جاري التحميل...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
