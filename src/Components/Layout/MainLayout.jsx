import React from 'react'
import { Outlet } from 'react-router-dom' ;
import Header from './Header';
import Footer from './Footer' ;
import ButtonNavigation from './ButtonNavigation';

const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text transition-colors duration-300'>
        <Header />
        <main className='flex-1 pt-[160px] lg:pt-[200px] px-4 sm:px-8 pb-24'>
            <Outlet/>
        </main>
        <ButtonNavigation />
        <Footer />
    </div>
  )
}

export default MainLayout
