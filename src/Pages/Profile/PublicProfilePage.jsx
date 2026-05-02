import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { User, Mail, Calendar, Users } from "lucide-react";
import { useProfile } from "../../Hooks/useProfile";
import { useFollow } from "../../Hooks/useFollow";
import FollowButton from "../../Components/Common/FollowButton";
import ListingCard from "../../Components/Content/ListingCard";
import SkeletonCard from "../../Components/Ui/SkeletonCard";
import { formatDate } from "../../Utils/format";

const PublicProfilePage = () => {
  const { id } = useParams();
  const { publicProfile, publicListings, loading, fetchOtherProfile } = useProfile();
  const { followersCount, followingCount, fetchFollows } = useFollow();

  useEffect(() => {
    if (id) {
      fetchOtherProfile(id);
      fetchFollows();
    }
  }, [id]);

  if (loading && !publicProfile) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="animate-pulse space-y-8">
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard /> <SkeletonCard /> <SkeletonCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden mb-8 border border-light-border dark:border-dark-border">
        <div className="bg-light-muted dark:bg-dark-bg h-32 sm:h-48 relative">
          <div className="absolute -bottom-12 right-6 sm:right-10">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-light-input dark:bg-dark-bg rounded-full border-4 border-light-card dark:border-dark-card flex items-center justify-center shadow-md">
              <User className="w-10 h-10 sm:w-16 sm:h-16 text-light-muted dark:text-dark-muted" />
            </div>
          </div>
        </div>

        <div className="pt-16 px-6 sm:px-10 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text">{publicProfile?.name || "مستخدم"}</h1>
              <p className="text-light-muted dark:text-dark-muted mt-1 flex items-center gap-2">
                <Mail className="w-4 h-4" /> {publicProfile?.email}
              </p>
              <p className="text-light-muted/80 dark:text-dark-muted text-sm mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> عضو منذ {formatDate(publicProfile?.joined)}
              </p>
            </div>
            <FollowButton targetUserId={publicProfile?.id} />
          </div>

          <div className="flex items-center gap-6 mt-6 pt-4 border-t border-light-border dark:border-dark-border">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-light-muted dark:text-dark-muted" />
              <span className="font-bold text-light-text dark:text-dark-text">{followersCount}</span>
              <span className="text-light-muted dark:text-dark-muted text-sm">متابع</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-light-muted dark:text-dark-muted" />
              <span className="font-bold text-light-text dark:text-dark-text">{followingCount}</span>
              <span className="text-light-muted dark:text-dark-muted text-sm">يتابع</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-6">إعلانات {publicProfile?.name} ({publicListings.length})</h2>

      {publicListings.length === 0 ? (
        <div className="text-center py-12 bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted font-bold">
          لا توجد إعلانات لهذا المستخدم
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicProfilePage;
