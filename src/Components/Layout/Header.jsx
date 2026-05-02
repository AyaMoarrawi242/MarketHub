import React from 'react';
import { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Search, Heart, Menu, MessageCircle, PlusCircle, Sun, Moon, Home, User, Grid, BookmarkIcon } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Hooks/useAuth';
import BazarHalab from "../../assets/BazarHalab5.png";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
    else { document.documentElement.classList.remove("dark"); }
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className='p-2 rounded-lg text-light-gray dark:text-dark-gray group transition-colors'>
      {theme === "dark" ? <Sun size={28} className='group-hover:text-accent-main fill-current' /> : <Moon size={28} className="group-hover:text-accent-main fill-current" />}
    </button>
  );
};

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  // دالة مساعدة لمعرفة إذا كان الرابط نشطاً
  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full 
      bg-light-bg text-[#111827] border-b border-[#d1d5db]
      dark:bg-dark-bg dark:text-dark-gray dark:border-dark-border shadow-md fixed top-0 left-0 z-50">
      <div className="flex items-center py-1 px-3 sm:px-1 md:px-6 lg:px-8 xl:px-10 flex-row-reverse justify-between gap-10">

        {/* LOGO */}
        <img
          src={BazarHalab}
          className="hidden md:block max-w-[170px] cursor-pointer mx-3 object-contain"
          onClick={() => navigate("/")}
        />

        {/* Icons Desktop */}
        <div className="flex-1 hidden md:flex items-center gap-0 text-light-gray dark:text-dark-gray justify-evenly">

          <ThemeToggle />

          {isAuthenticated ? (
            <button
              onClick={() => navigate("/createListing")}
              className="lg:flex items-center px-5 py-2 rounded-full bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors duration-300">
              أضف إعلان
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="lg:flex items-center px-5 py-2 rounded-full bg-[#22c55e] text-white hover:bg-[#16a34a] transition-colors duration-300">
              دخول
            </button>
          )}

          <Link
            to="/bookmarks"
            className={`transition-colors duration-300 ${isActive('/bookmarks') ? 'text-accent-main' : 'hover:text-accent-main'}`}
          >
            <BookmarkIcon size={30} className={`fill-current stroke-0 ${isActive('/bookmarks') ? 'text-accent-main' : ''}`} />
          </Link>

          <Link
            to="/favorites"
            className={`transition-colors duration-300 ${isActive('/favorites') ? 'text-accent-main' : 'hover:text-accent-main'}`}
          >
            <Heart size={30} className={`fill-current stroke-0 ${isActive('/favorites') ? 'text-accent-main' : ''}`} />
          </Link>

          <Link
            to="/message"
            className={`transition-colors duration-300 ${isActive('/message') ? 'text-accent-main' : 'hover:text-accent-main'}`}
          >
            <MessageCircle size={30} className={`fill-current stroke-0 ${isActive('/message') ? 'text-accent-main' : ''}`} />
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className={`transition-colors duration-300 ${isActive('/profile') ? 'text-accent-main' : 'hover:text-accent-main'}`}
          >
            <User size={30} className={`fill-current stroke-0 ${isActive('/profile') ? 'text-accent-main' : ''}`} />
          </Link>

          {/* Categories */}
          <Link
            to="/categories"
            className={`transition-colors duration-300 ${isActive('/categories') ? 'text-accent-main' : 'hover:text-accent-main'}`}
          >
            <Grid size={30} className={isActive('/categories') ? 'text-accent-main' : ''} />
          </Link>

          {/* Home */}
          <Link
            to="/"
            className={`transition-colors duration-300 ${isActive('/') ? 'text-accent-main' : 'hover:text-accent-main'}`}
          >
            <Home size={30} className={`fill-current stroke-0 ${isActive('/') ? 'text-accent-main' : ''}`} />
          </Link>

        </div>
      </div>
      {/* Search bar Desktop */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex mx-10 items-center group mb-1 mt-0 "
      >
        <Search
          size={20}
          className="text-light-muted dark:text-dark-muted group-hover:text-accent-main transition-colors duration-300"
        />
        <input
          type="text"
          placeholder="...ابحث"
          className="w-[80%] max-w-[90%] bg-transparent px-[15px] py-[5px] text-md mx-[15px] outline-none text-light-text 
          dark:text-dark-text rounded-lg
          focus:ring-0 
          focus:border-accent-main 
          dark:focus:border-none
          dark:focus:shadow-[1px_0_2px_theme(colors.accent.main)]
          mr-0 border border-light-border dark:border-dark-border "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      {/* icon Mobile */}
      <div className="md:hidden flex items-center w-full
        text-light-gray dark:text-dark-gray pl-4 flex-row-reverse gap-14 pr-0">
        <div className='flex items-center gap-6 flex-1'>
          <ThemeToggle />

          {/* إضافة زر البحث للموبايل بدلاً من الشريط الكبير */}
          <Link
            to="/search"
            className="text-light-gray dark:text-dark-gray hover:text-accent-main transition-colors"
          >
            <Search size={28} />
          </Link>

          <Link
            to="/favorites"
            className={`active:text-accent-main ${isActive('/favorites') ? 'text-accent-main' : ''}`}
          >
            <Heart size={28} className='fill-current stroke-0' />
          </Link>

          <Link
            to="/message"
            className={`active:text-accent-main ${isActive('/message') ? 'text-accent-main' : ''}`}
          >
            <MessageCircle size={28} className='fill-current stroke-0' />
          </Link>

          {isAuthenticated ? (
            <Link
              to="/createListing"
              className="text-gray-700 dark:text-gray-200 hover:text-[#22c55e] transition-colors duration-300"
            >
              <PlusCircleIcon size={28} />
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 dark:text-gray-200 hover:text-[#22c55e] transition-colors duration-300"
            >
              <PlusCircleIcon size={28} />
            </Link>
          )}

          <img
            src={BazarHalab}
            className="max-w-[140px] cursor-pointer object-contain"
            onClick={() => navigate("/")}
          />
        </div>
      </div>

    </header>
  );
};

export default Header;
