import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import listingsReducer from "./slices/listingsSlice";
import favoritesReducer from "./slices/favoritesSlice";
import profileReducer from "./slices/profileSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    listings: listingsReducer,
    favorites: favoritesReducer,
    profile: profileReducer,
  },
});
