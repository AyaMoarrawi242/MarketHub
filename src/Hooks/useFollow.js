import { useDispatch, useSelector } from "react-redux";
import {
  fetchFollowsStart,
  fetchFollowsSuccess,
  fetchFollowsFailure,
  updateFollowStatus,
} from "../Store/slices/followSlice";
import {
  followUserService,
  unfollowUserService,
  getFollowingService,
  getFollowersService,
  checkFollowStatusService,
} from "../Services/api";

export const useFollow = () => {
  const dispatch = useDispatch();
  const { following, followers, followingCount, followersCount, loading, error } = useSelector(
    (state) => state.follow
  );

  const fetchFollows = async () => {
    try {
      dispatch(fetchFollowsStart());
      const [followingData, followersData] = await Promise.all([
        getFollowingService(),
        getFollowersService(),
      ]);
      dispatch(
        fetchFollowsSuccess({
          following: followingData.following,
          followers: followersData.followers,
          followingCount: followingData.count,
          followersCount: followersData.count,
        })
      );
    } catch (err) {
      dispatch(fetchFollowsFailure(err.message));
    }
  };

  const followUser = async (targetId) => {
    try {
      const result = await followUserService(targetId);
      dispatch(
        updateFollowStatus({
          targetId,
          action: result.action,
        })
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const unfollowUser = async (targetId) => {
    try {
      const result = await unfollowUserService(targetId);
      dispatch(
        updateFollowStatus({
          targetId,
          action: result.action,
        })
      );
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const toggleFollow = async (targetId, isFollowing) => {
    if (isFollowing) {
      return await unfollowUser(targetId);
    }
    return await followUser(targetId);
  };

  const checkFollowStatus = async (targetId) => {
    try {
      const result = await checkFollowStatusService(targetId);
      return result.isFollowing;
    } catch {
      return false;
    }
  };

  return {
    following,
    followers,
    followingCount,
    followersCount,
    loading,
    error,
    fetchFollows,
    followUser,
    unfollowUser,
    toggleFollow,
    checkFollowStatus,
  };
};
