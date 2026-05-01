import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Components/Ui/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-4">
      <div className="text-center">
        <h1 className="text-8xl font-extrabold text-accent-main">404</h1>
        <p className="text-2xl font-bold text-light-text dark:text-dark-text mt-4">الصفحة غير موجودة</p>
        <p className="text-light-muted dark:text-dark-muted mt-2 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
        <Button onClick={() => navigate("/")} className="mx-auto">
          العودة للرئيسية
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
