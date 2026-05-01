import React from "react";

const Alert = ({ type = "info", message, onClose, className = "" }) => {
  const types = {
    info: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800",
    success: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-200 dark:border-green-800",
    warning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800",
    error: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800",
  };

  return (
    <div className={`flex items-center justify-between p-4 border rounded-lg ${types[type]} ${className}`} role="alert">
      <span className="font-bold text-sm">{message}</span>
      {onClose && (
        <button onClick={onClose} className="mr-4 text-lg font-bold opacity-60 hover:opacity-100 transition-opacity">
          ×
        </button>
      )}
    </div>
  );
};

export default Alert;
