import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  following: [],
  followers: [],
  followingCount: 0,
  followersCount: 0,
  loading: false,
  error: null,
};

const followSlice = createSlice({
  name: "follow",
  initialState,
  reducers: {
    fetchFollowsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFollowsSuccess: (state, action) => {
      state.loading = false;
      state.following = action.payload.following || state.following;
      state.followers = action.payload.followers || state.followers;
      state.followingCount = action.payload.followingCount ?? state.followingCount;
      state.followersCount = action.payload.followersCount ?? state.followersCount;
    },
    fetchFollowsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateFollowStatus: (state, action) => {
      const { targetId, action: followAction, user } = action.payload;
      if (followAction === "followed") {
        if (!state.following.find((u) => u.id === targetId)) {
          state.following.push(user || { id: targetId, name: "مستخدم" });
        }
        state.followingCount = state.following.length;
      } else if (followAction === "unfollowed") {
        state.following = state.following.filter((u) => u.id !== targetId);
        state.followingCount = state.following.length;
      } else if (followAction === "new_follower") {
        if (!state.followers.find((u) => u.id === targetId)) {
          state.followers.push(user || { id: targetId, name: "مستخدم" });
        }
        state.followersCount = state.followers.length;
      }
    },
    clearFollows: (state) => {
      state.following = [];
      state.followers = [];
      state.followingCount = 0;
      state.followersCount = 0;
    },
  },
});

export const {
  fetchFollowsStart,
  fetchFollowsSuccess,
  fetchFollowsFailure,
  updateFollowStatus,
  clearFollows,
} = followSlice.actions;

export default followSlice.reducer;
