import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Tag, Heart, Bookmark } from "lucide-react";
import { useFavorites } from "../../Hooks/useFavorites";

const ListingCard = ({ listing }) => {
  const { favorites, bookmarks, toggleFav, toggleBkmk } = useFavorites();
  const isFavorite = favorites.includes(listing.id);
  const isBookmarked = bookmarks.includes(listing.id);

  return (
    <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-md border border-light-border dark:border-dark-border overflow-hidden hover:shadow-xl hover:border-accent-main/50 transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <Link to={`/listing/${listing.id}`}>
          <img
            src={listing.images?.[0] || "/placeholder.jpg"}
            alt={listing.title}
            className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        
        <div className="absolute top-0 right-0 p-2 flex flex-col gap-2">
          {listing.featured && (
            <span className="bg-accent-main text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
              مميز
            </span>
          )}
        </div>

        <button
          onClick={(e) => { e.preventDefault(); toggleFav(listing.id); }}
          className="absolute bottom-2 left-2 p-2 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-red-50 dark:hover:bg-red-900/50 transition-colors"
        >
          <Heart className={`w-5 h-5 transition-colors ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-500 dark:text-gray-400 hover:text-red-500"}`} />
        </button>
        
        <button
          onClick={(e) => { e.preventDefault(); toggleBkmk(listing.id); }}
          className="absolute bottom-2 right-2 p-2 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-blue-50 dark:hover:bg-blue-900/50 transition-colors"
        >
          <Bookmark className={`w-5 h-5 transition-colors ${isBookmarked ? "fill-market-primary text-market-primary" : "text-gray-500 dark:text-gray-400 hover:text-market-primary"}`} />
        </button>
      </div>

      <Link to={`/listing/${listing.id}`}>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-base text-light-text dark:text-dark-text truncate pr-2">{listing.title}</h3>
            {listing.category && (
              <span className="bg-blue-50 dark:bg-blue-900/30 text-market-primary px-2 py-0.5 rounded text-[10px] font-bold whitespace-nowrap">
                {listing.category}
              </span>
            )}
          </div>

          <p className="text-light-muted dark:text-dark-muted text-sm mt-1 line-clamp-2 min-h-[2.5em]">{listing.description}</p>

          <div className="mt-4 flex items-center justify-between text-xs text-light-muted dark:text-dark-muted font-medium">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{listing.location || "غير محدد"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(listing.createdAt).toLocaleDateString("ar-EG")}</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-light-border dark:border-dark-border flex items-center justify-between">
            <span className="font-extrabold text-market-primary text-lg">
              {listing.price ? `${listing.price.toLocaleString()} ل.س` : "مجاني"}
            </span>
            {listing.status === "sold" && (
              <span className="bg-red-50 dark:bg-red-900/20 text-red-600 px-2 py-0.5 rounded text-xs font-bold">
                مبيع
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
