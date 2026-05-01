import React, { useEffect } from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "../../Hooks/useFavorites";
import { useListing } from "../../Hooks/useListing";
import ListingCard from "../../Components/Content/ListingCard";

const Favorites = () => {
  const { favorites, fetchFavorites } = useFavorites();
  const { listings, loading, fetchListings } = useListing();

  useEffect(() => {
    fetchFavorites();
    fetchListings();
  }, []);

  const favoriteListings = listings.filter((l) => favorites.includes(l.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6 flex items-center gap-2">
        <Heart className="fill-red-500 text-red-500 w-6 h-6" />
        المفضلة ({favoriteListings.length})
      </h1>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-spin h-8 w-8 border-4 border-accent-main border-t-transparent rounded-full"></div>
        </div>
      ) : favoriteListings.length === 0 ? (
        <div className="text-center py-12 bg-light-card dark:bg-dark-card rounded-xl shadow-sm border border-light-border dark:border-dark-border">
          <Heart className="w-16 h-16 mx-auto mb-4 text-light-muted dark:text-dark-muted" />
          <p className="text-light-muted dark:text-dark-muted text-lg font-bold">لا توجد إعلانات في المفضلة</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
