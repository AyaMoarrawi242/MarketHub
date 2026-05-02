import { useDispatch, useSelector } from "react-redux";
import {
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
} from "../Store/slices/profileSlice";
import {
  fetchProfileService,
  fetchPublicProfileService,
  updateProfileService,
} from "../Services/api";

export const useProfile = () => {
  const dispatch = useDispatch();
  const { profile, myListings, publicProfile, publicListings, loading, error } = useSelector((state) => state.profile);

  const fetchMyProfile = async () => {
    try {
      dispatch(fetchProfileStart());
      const data = await fetchProfileService();
      dispatch(fetchProfileSuccess(data));
    } catch (err) {
      dispatch(fetchProfileFailure(err.message));
    }
  };

  const fetchOtherProfile = async (userId) => {
    try {
      dispatch(fetchPublicProfileStart());
      const data = await fetchPublicProfileService(userId);
      dispatch(fetchPublicProfileSuccess(data));
    } catch (err) {
      dispatch(fetchPublicProfileFailure(err.message));
    }
  };

  const updateProfile = async (data) => {
    try {
      dispatch(updateProfileStart());
      const result = await updateProfileService(data);
      dispatch(updateProfileSuccess(result));
      return { success: true };
    } catch (err) {
      dispatch(updateProfileFailure(err.message));
      return { success: false, error: err.message };
    }
  };

  const clearPublic = () => {
    dispatch(clearPublicProfile());
  };

  return {
    profile,
    myListings,
    publicProfile,
    publicListings,
    loading,
    error,
    fetchMyProfile,
    fetchOtherProfile,
    updateProfile,
    clearPublic,
  };
};
