import React, { useEffect } from "react";
import { Bookmark } from "lucide-react";
import { useFavorites } from "../../Hooks/useFavorites";
import { useListing } from "../../Hooks/useListing";
import ListingCard from "../../Components/Content/ListingCard";

const BookMark = () => {
  const { bookmarks, fetchBookmarks } = useFavorites();
  const { listings, loading, fetchListings } = useListing();

  useEffect(() => {
    fetchBookmarks();
    fetchListings();
  }, []);

  const bookmarkedListings = listings.filter((l) => bookmarks.includes(l.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6 flex items-center gap-2">
        <Bookmark className="fill-accent-main text-accent-main w-6 h-6" />
        المحفوظات ({bookmarkedListings.length})
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-spin h-8 w-8 border-4 border-accent-main border-t-transparent rounded-full"></div>
        </div>
      ) : bookmarkedListings.length === 0 ? (
        <div className="text-center py-12 bg-light-card dark:bg-dark-card rounded-xl shadow-sm border border-light-border dark:border-dark-border">
          <Bookmark className="w-16 h-16 mx-auto mb-4 text-light-muted dark:text-dark-muted" />
          <p className="text-light-muted dark:text-dark-muted text-lg font-bold">لا توجد إعلانات محفوظة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bookmarkedListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookMark;
