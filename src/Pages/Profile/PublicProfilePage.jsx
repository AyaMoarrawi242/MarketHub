import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { User, Mail, Calendar } from "lucide-react";
import { useProfile } from "../../Hooks/useProfile";
import ListingCard from "../../Components/Content/ListingCard";

const PublicProfilePage = () => {
  const { id } = useParams();
  const { publicProfile, publicListings, loading, fetchOtherProfile } = useProfile();

  useEffect(() => {
    if (id) {
      fetchOtherProfile(id);
    }
  }, [id]);

  if (loading && !publicProfile) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="animate-spin h-8 w-8 border-4 border-accent-main border-t-transparent rounded-full"></div>
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
          <h1 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text">{publicProfile?.name}</h1>
          <p className="text-light-muted dark:text-dark-muted mt-1 flex items-center gap-2">
            <Mail className="w-4 h-4" /> {publicProfile?.email}
          </p>
          <p className="text-light-muted/80 dark:text-dark-muted text-sm mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> عضو منذ {new Date(publicProfile?.joined).toLocaleDateString("ar-EG")}
          </p>
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
