import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./Components/Layout/MainLayout";
import ProtectedRoute from "./Components/Common/ProtectedRoute";
import ErrorBoundary from "./Components/Common/ErrorBoundary";

import HomePage from "./Pages/HomePage";
import CategoriesPage from "./Pages/CategoriesPage";
import SearchPage from "./Pages/SearchPage";
import MenuPage from "./Pages/MenuPage";
import CreateListingPage from "./Pages/content/CreateListing";
import DetailListingPage from "./Pages/content/DetailListing";
import EditListingPage from "./Pages/content/EditListing";
import FavoritesPage from "./Pages/Profile/Favorites";
import BookMarkPage from "./Pages/Profile/BookMark";
import ProfilePage from "./Pages/Profile/ProfilePage";
import PublicProfilePage from "./Pages/Profile/PublicProfilePage";
import FollowList from "./Pages/Profile/FollowList";
import MessagePage from "./Pages/Profile/Message";
import SettingsPage from "./Pages/Profile/SettingsPage";
import NotFoundPage from "./Pages/NotFoundPage";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
            <Route path="bookmarks" element={<ProtectedRoute><BookMarkPage /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="profile/follows" element={<ProtectedRoute><FollowList /></ProtectedRoute>} />
            <Route path="user/:id" element={<PublicProfilePage />} />
            <Route path="message" element={<ProtectedRoute><MessagePage /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
            <Route path="createListing" element={<ProtectedRoute><CreateListingPage /></ProtectedRoute>} />
            <Route path="listing/:id" element={<DetailListingPage />} />
            <Route path="listing/:id/edit" element={<ProtectedRoute><EditListingPage /></ProtectedRoute>} />
            <Route path="menuPage" element={<MenuPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
