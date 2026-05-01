import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useListing } from "../Hooks/useListing";
import { Search, Filter, MapPin, DollarSign } from "lucide-react";
import ListingCard from "../Components/Content/ListingCard";

const CATEGORIES = ["الكل", "عقارات", "سيارات", "إلكترونيات", "أثاث", "خدمات", "أخرى"];

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { listings, loading, fetchListings } = useListing();

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "الكل",
    location: "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  });

  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  const applyFilters = () => {
    let filtered = [...listings];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.title.toLowerCase().includes(query) ||
          l.description.toLowerCase().includes(query)
      );
    }

    if (filters.category !== "الكل") {
      filtered = filtered.filter((l) => l.category === filters.category);
    }

    if (filters.location) {
      filtered = filtered.filter((l) =>
        l.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter((l) => l.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((l) => l.price <= parseFloat(filters.maxPrice));
    }

    if (filters.sort === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (filters.sort === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.category !== "الكل") params.set("category", filters.category);
    setSearchParams(params);
  };

  const filteredListings = applyFilters();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-6">البحث عن إعلانات</h1>

      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-muted dark:text-dark-muted" />
          <input
            type="text"
            placeholder="ابحث عن شيء..."
            className="w-full pl-4 pr-10 py-2.5 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 bg-accent-main text-white rounded-lg hover:bg-accent-active transition-colors font-bold shadow-md"
        >
          بحث
        </button>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2.5 border border-light-border dark:border-dark-border rounded-lg hover:bg-light-input dark:hover:bg-dark-input text-light-text dark:text-dark-text transition-colors flex items-center gap-2"
        >
          <Filter className="w-5 h-5" /> فلاتر
        </button>
      </form>

      {showFilters && (
        <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shadow-sm border border-light-border dark:border-dark-border">
          <div>
            <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-1">الفئة</label>
            <select
              className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main bg-light-input dark:bg-dark-bg text-light-text dark:text-dark-text"
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-light-bg dark:bg-dark-bg">{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-1">الموقع</label>
            <div className="relative">
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-muted dark:text-dark-muted" />
              <input
                type="text"
                placeholder="مثال: دمشق"
                className="w-full pl-3 pr-9 py-2 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main bg-light-input dark:bg-dark-bg text-light-text dark:text-dark-text"
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-1">السعر الأدنى</label>
            <div className="relative">
              <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-muted dark:text-dark-muted" />
              <input
                type="number"
                placeholder="0"
                className="w-full pl-3 pr-9 py-2 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main bg-light-input dark:bg-dark-bg text-light-text dark:text-dark-text"
                value={filters.minPrice}
                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-1">السعر الأعلى</label>
            <div className="relative">
              <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-muted dark:text-dark-muted" />
              <input
                type="number"
                placeholder="∞"
                className="w-full pl-3 pr-9 py-2 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main bg-light-input dark:bg-dark-bg text-light-text dark:text-dark-text"
                value={filters.maxPrice}
                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-end gap-2">
            <select
              className="flex-1 px-3 py-2 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main bg-light-input dark:bg-dark-bg text-light-text dark:text-dark-text"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="newest" className="bg-light-bg dark:bg-dark-bg">الأحدث</option>
              <option value="price-low" className="bg-light-bg dark:bg-dark-bg">الأرخص</option>
              <option value="price-high" className="bg-light-bg dark:bg-dark-bg">الأغلى</option>
            </select>
            <button
              type="button"
              onClick={() => setFilters({ search: "", category: "الكل", location: "", minPrice: "", maxPrice: "", sort: "newest" })}
              className="px-4 py-2 border border-light-border dark:border-dark-border rounded-lg hover:bg-light-input dark:hover:bg-dark-input text-light-text dark:text-dark-text transition-colors text-sm font-bold"
            >
              إعادة تعيين
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-light-muted dark:text-dark-muted font-bold">تم العثور على {filteredListings.length} نتيجة</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <div className="animate-spin h-8 w-8 border-4 border-accent-main border-t-transparent rounded-full"></div>
        </div>
      ) : filteredListings.length === 0 ? (
        <div className="text-center py-12 bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border">
          <p className="text-light-muted dark:text-dark-muted text-lg font-bold">لا توجد نتائج</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
