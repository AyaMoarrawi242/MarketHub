import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, Squares2X2Icon, UserCircleIcon, PlusCircleIcon } from '@heroicons/react/24/solid';

const ButtonNavigation = () => {
  return (
    <div className='md:hidden fixed bottom-0 left-0 right-0 z-50 
    bg-light-bg dark:bg-dark-bg 
    border-t border-light-border dark:border-dark-border
    flex items-center justify-around flex-row-reverse py-2'>
      <NavLink to="/" className={({ isActive }) => ("group  " +
        (isActive ? "text-accent-main" : "text-light-gray dark:text-dark-gray"))}>
        <HomeIcon className='w-7 h-7 transition' />
      </NavLink>

      <NavLink to="/categories" className={({ isActive }) => ("group  " +
        (isActive ? "text-accent-main" : "text-light-gray dark:text-dark-gray"))}>
        <Squares2X2Icon className='w-7 h-7 transition' />
      </NavLink>

      <NavLink to="/createListing" className={({ isActive }) => ("group  " +
        (isActive ? "text-accent-main" : "text-light-gray dark:text-dark-gray"))}>
        <PlusCircleIcon className='w-7 h-7 transition' />
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) => ("group  " +
        (isActive ? "text-accent-main" : "text-light-gray dark:text-dark-gray"))}>
        <UserCircleIcon className='w-7 h-7 transition' />
      </NavLink>

    </div>
  );
};

export default ButtonNavigation;
