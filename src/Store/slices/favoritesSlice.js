import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
  bookmarks: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    fetchFavoritesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFavoritesSuccess: (state, action) => {
      state.favorites = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFavoritesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchBookmarksStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBookmarksSuccess: (state, action) => {
      state.bookmarks = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchBookmarksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const exists = state.favorites.includes(id);
      if (exists) {
        state.favorites = state.favorites.filter((fid) => fid !== id);
      } else {
        state.favorites.push(id);
      }
    },
    toggleBookmark: (state, action) => {
      const id = action.payload;
      const exists = state.bookmarks.includes(id);
      if (exists) {
        state.bookmarks = state.bookmarks.filter((bid) => bid !== id);
      } else {
        state.bookmarks.push(id);
      }
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
    clearBookmarks: (state) => {
      state.bookmarks = [];
    },
  },
});

export const {
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  fetchBookmarksStart,
  fetchBookmarksSuccess,
  fetchBookmarksFailure,
  toggleFavorite,
  toggleBookmark,
  clearFavorites,
  clearBookmarks,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
