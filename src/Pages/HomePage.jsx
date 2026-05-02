import React, { useEffect } from "react";
import { useListing } from "../Hooks/useListing";
import ListingCard from "../Components/Content/ListingCard";

const HomePage = () => {
  const { listings, loading, error, fetchListings } = useListing();

  useEffect(() => {
    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin h-10 w-10 border-4 border-accent-main border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg font-bold">{error}</p>
        <button
          onClick={() => fetchListings()}
          className="mt-4 px-6 py-2.5 bg-accent-main text-white rounded-lg hover:bg-blue-700 font-bold transition-colors shadow-md"
        >
          إعادة المحاولة
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-light-text dark:text-dark-text mb-8 text-center">أحدث الإعلانات</h1>

      {listings.length === 0 ? (
        <div className="text-center py-16 bg-light-bg dark:bg-dark-bg  rounded-xl shadow-sm border border-light-border dark:border-dark-border">
          <p className="text-light-muted dark:text-dark-muted text-lg font-bold">لا توجد إعلانات حالياً</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
