import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  myListings: [],
  publicProfile: null,
  publicListings: [],
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    fetchProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.profile = action.payload.profile;
      state.myListings = action.payload.listings;
      state.loading = false;
      state.error = null;
    },
    fetchProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchPublicProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchPublicProfileSuccess: (state, action) => {
      state.publicProfile = action.payload.profile;
      state.publicListings = action.payload.listings;
      state.loading = false;
      state.error = null;
    },
    fetchPublicProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
      state.loading = false;
      state.error = null;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearPublicProfile: (state) => {
      state.publicProfile = null;
      state.publicListings = [];
    },
  },
});

export const {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  fetchPublicProfileStart,
  fetchPublicProfileSuccess,
  fetchPublicProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure,
  clearPublicProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
