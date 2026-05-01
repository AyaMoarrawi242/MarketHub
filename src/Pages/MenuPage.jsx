import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Home, Search, Heart, Bookmark, MessageCircle, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "../Hooks/useAuth";

const MenuPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { icon: Home, label: "الرئيسية", path: "/", color: "text-accent-main" },
    { icon: Search, label: "البحث", path: "/search", color: "text-blue-500" },
    { icon: Heart, label: "المفضلة", path: "/favorites", color: "text-red-500" },
    { icon: Bookmark, label: "المحفوظات", path: "/bookmarks", color: "text-yellow-500" },
    { icon: MessageCircle, label: "الرسائل", path: "/message", color: "text-green-500" },
    { icon: User, label: "الملف الشخصي", path: "/profile", color: "text-purple-500" },
    { icon: Settings, label: "الإعدادات", path: "/settings", color: "text-gray-500" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-8">القائمة الرئيسية</h1>

      <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg border border-light-border dark:border-dark-border overflow-hidden">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center gap-4 p-4 border-b border-light-border/50 dark:border-dark-border/50 hover:bg-light-input dark:hover:bg-dark-bg transition-colors"
          >
            <item.icon className={`w-6 h-6 ${item.color}`} />
            <span className="font-bold text-light-text dark:text-dark-text">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="flex items-center gap-4 p-4 w-full text-right hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <LogOut className="w-6 h-6 text-red-500" />
          <span className="font-bold text-red-500">تسجيل خروج</span>
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
