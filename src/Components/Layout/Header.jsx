import React from 'react';
import { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import { Search, Heart, Menu, MessageCircle, PlusCircle, Sun, Moon, Home, User, Grid, BookmarkIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
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
      {theme === "dark" ? <Sun size={28} className='group-hover:text-accent-main fill-current' /> : <Moon size={28} className="group-hover:text-accent-main fill-current " />}
    </button>
  );
};

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?search=${encodeURIComponent(searchQuery)}`);
    }
  };

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
            className="hover:text-accent-main transition-colors duration-300"
          >
            <BookmarkIcon size={30} className='fill-current stroke-0' />
          </Link>

          <Link
            to="/favorites"
            className="hover:text-accent-main transition-colors duration-300"
          >
            <Heart size={30} className='fill-current stroke-0' />
          </Link>

          <Link
            to="/message"
            className="hover:text-accent-main transition-colors duration-300"
          >
            <MessageCircle size={30} className='fill-current stroke-0' />
          </Link>

          {/* Profile */}
          <Link
            to="/profile"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-200 transition group"
          >
            <User size={30} className='group-hover:text-accent-main fill-current stroke-0' />
          </Link>

          {/* Categories */}
          <Link
            to="/categories"
            className="flex items-center gap-2 text-light-gray dark:text-dark-gray transition group"
          >
            <Grid size={30} className='group-hover:text-accent-main' />
          </Link>

          {/* Home */}
          <Link
            to="/"
            className="flex items-center gap-2 text-light-gray dark:text-dark-gray transition group"
          >
            <Home size={30} className='group-hover:text-accent-main fill-current stroke-0' />
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
          className="text-light-gray dark:text-dark-gray group-hover:text-accent-main transition-colors duration-300"
        />
        <input
          type="text"
          placeholder="...ابحث"
          className="w-[80%] max-w-[90%] bg-transparent px-[15px] py-[5px] text-md mx-[15px] outline-none text-light-gray 
          dark:text-dark-gray rounded-lg
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
        text-gray-700 dark:text-gray-200 pl-4 flex-row-reverse gap-14 pr-0">
        <div className='flex items-center gap-6 flex-1'>
          <ThemeToggle />

          <Link
            to="/favorites"
            className="text-gray-700 dark:text-gray-200 active:text-[#16a34a]"
          >
            <Heart size={28} className='fill-current stroke-0' />
          </Link>

          <Link
            to="/message"
            className="text-gray-700 dark:text-gray-200 active:text-[#16a34a]"
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

      {/* SEARCH BAR MOBILE */}
      <form onSubmit={handleSearch} className="lg:hidden px-4 pb-2 my-1 ">
        <div className='flex items-center bg-transparent rounded-full px-4 py-1.5'>
          <Search size={25} className="text-dark-gray" />
          <input
            type="text"
            placeholder="...ابحث"
            className="flex-1 bg-transparent text-md mx-[15px] outline-none 
            dark:text-dark-gray rounded-lg
            focus:ring-0 
            focus:border-accent-main 
            dark:focus:border-none
            dark:focus:shadow-[0_0_2px_theme(colors.accent.main)]
            mr-0 border border-light-border dark:border-dark-border px-4 "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>
    </header>
  );
};

export default Header;
