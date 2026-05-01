import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      // تم تغيير اللون ليكون أخف (رمادي) مع خلفية عند التمرير
      className={`flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors font-bold ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
      <span>رجوع</span>
    </button>
  );
};

export default BackButton;
