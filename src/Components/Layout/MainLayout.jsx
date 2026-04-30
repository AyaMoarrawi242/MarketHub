import React from 'react'
import { Outlet } from 'react-router-dom' ;
import Header from './Header';
import Footer from './Footer' ;
import ButtonNavigation from './ButtonNavigation';
const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col bg-white dark:bg-gray-900'>
        <Header />
        <main className='flex-1 pt-[80px] lg:pt-[100px]'>
            <Outlet/>
            </main>
            <ButtonNavigation />
            <Footer />
    </div>
  )
}

export default MainLayout