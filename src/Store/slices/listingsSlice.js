import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listings: [],
  currentListing: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    fetchListingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchListingsSuccess: (state, action) => {
      state.listings = action.payload.listings;
      state.totalPages = action.payload.totalPages || 1;
      state.currentPage = action.payload.currentPage || 1;
      state.loading = false;
      state.error = null;
    },
    fetchListingsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchListingDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchListingDetailSuccess: (state, action) => {
      state.currentListing = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchListingDetailFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createListingSuccess: (state, action) => {
      state.listings.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    createListingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateListingSuccess: (state, action) => {
      const index = state.listings.findIndex((l) => l.id === action.payload.id);
      if (index !== -1) state.listings[index] = action.payload;
      if (state.currentListing?.id === action.payload.id) {
        state.currentListing = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    updateListingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteListingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteListingSuccess: (state, action) => {
      state.listings = state.listings.filter((l) => l.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteListingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearCurrentListing: (state) => {
      state.currentListing = null;
    },
  },
});

export const {
  fetchListingsStart,
  fetchListingsSuccess,
  fetchListingsFailure,
  fetchListingDetailStart,
  fetchListingDetailSuccess,
  fetchListingDetailFailure,
  createListingStart,
  createListingSuccess,
  createListingFailure,
  updateListingStart,
  updateListingSuccess,
  updateListingFailure,
  deleteListingStart,
  deleteListingSuccess,
  deleteListingFailure,
  clearCurrentListing,
} = listingsSlice.actions;

export default listingsSlice.reducer;
