import React, { useState, useEffect } from "react";
import { UserPlus, UserCheck } from "lucide-react";
import { useFollow } from "../../Hooks/useFollow";
import { useAuth } from "../../Hooks/useAuth";


const FollowButton = ({ targetUserId, className = "" }) => {
  const { user: currentUser } = useAuth();
  const { toggleFollow, checkFollowStatus } = useFollow();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (targetUserId) {
      checkFollowStatus(targetUserId).then(setIsFollowing);
    }
  }, [targetUserId, checkFollowStatus]);

  if (!currentUser || currentUser.id === targetUserId) {
    return null;
  }

  const handleClick = async () => {
    setLoading(true);
    const result = await toggleFollow(targetUserId, isFollowing);
    if (result.success) {
      setIsFollowing(!isFollowing);
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all duration-200 ${
        isFollowing
          ? "bg-light-muted dark:bg-dark-bg text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 hover:border-red-300 dark:hover:border-red-700"
          : "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
      } ${loading ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : isFollowing ? (
        <>
          <UserCheck className="w-4 h-4" />
          <span>متابع</span>
        </>
      ) : (
        <>
          <UserPlus className="w-4 h-4" />
          <span>متابعة</span>
        </>
      )}
    </button>
  );
};

export default FollowButton;
