 import React from 'react' ;
 import { BrowserRouter as Router ,Routes ,Route } from 'react-router-dom';
 import Header from './Components/Layout/Header' ;
 import MainLayout from './Components/Layout/MainLayout';

 import HomePage from './Pages/HomePage' ;
 import CreateListingPage from './Pages/content/CreateListing' ;
 import FavoritesPage from './Pages/Profile/Favorites' ;
 import MessagePage from './Pages/Profile/Message' ;
 import SearchPage from './Pages/SearchPage';
 import MenuPage from './Pages/MenuPage' ;
const App = () => { 
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <MainLayout />}>
        {/* Home */}
        <Route index element={<HomePage/>}/>
        {/* Search */}
        <Route path="search" element={<SearchPage/>}/>
        {/* Favorites */}
        <Route path="favorites" element={<FavoritesPage/>}/>
        {/* Message */}
        <Route path="message" element={<MessagePage/>}/>
        {/* Add Listing  */}
        <Route path="createListing" element={<CreateListingPage/>}/>
        {/* Menu */}
        <Route path="/menuPage"  element={<MenuPage/>}/>
        </Route>
      </Routes>
    </Router>
  )
 }

export default App
