import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useListing } from "../Hooks/useListing";
import { Search, MapPin, DollarSign, Home, Car, Smartphone, Sofa, Wrench, Ellipsis, ArrowLeft } from "lucide-react";
import ListingCard from "../Components/Content/ListingCard";

const CATEGORIES = [
  { id: "عقارات", name: "عقارات", icon: Home, color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" },
  { id: "سيارات", name: "سيارات", icon: Car, color: "bg-accent-main/20 dark:bg-accent-main/10 text-accent-main dark:text-accent-main" },
  { id: "إلكترونيات", name: "إلكترونيات", icon: Smartphone, color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400" },
  { id: "أثاث", name: "أثاث", icon: Sofa, color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" },
  { id: "خدمات", name: "خدمات", icon: Wrench, color: "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400" },
  { id: "أخرى", name: "أخرى", icon: Ellipsis, color: "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300" },
];

const LOCATIONS = ["الكل", "دمشق", "حلب", "حمص", "اللاذقية", "حماة", "طرطوس", "دير الزور", "الرقة", "إدلب"];

const CategoriesPage = () => {
  const navigate = useNavigate();
  const { listings, loading, fetchListings } = useListing();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    location: "الكل",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  const getCategoryListings = () => {
    let filtered = selectedCategory
      ? listings.filter((l) => l.category === selectedCategory)
      : [...listings];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        (l) =>
          l.title.toLowerCase().includes(query) ||
          l.description.toLowerCase().includes(query)
      );
    }

    if (filters.location !== "الكل") {
      filtered = filtered.filter((l) =>
        l.location?.includes(filters.location)
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

  const filteredListings = getCategoryListings();
  const selectedCatData = CATEGORIES.find((c) => c.id === selectedCategory);
  const CategoryIcon = selectedCatData?.icon;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors text-light-text dark:text-dark-text"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">
          {selectedCategory ? `فئة: ${selectedCatData.name}` : "الفئات"}
        </h1>
      </div>

      {!selectedCategory ? (
        /* Category Grid */
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const count = listings.filter((l) => l.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="bg-light-card dark:bg-dark-card rounded-xl shadow-md p-6 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow border border-light-border dark:border-dark-border hover:border-accent-main/50"
              >
                <div className={`w-16 h-16 ${cat.color} rounded-full flex items-center justify-center`}>
                  <Icon className="w-8 h-8" />
                </div>
                <span className="font-bold text-light-text dark:text-dark-text">{cat.name}</span>
                <span className="text-sm text-light-muted dark:text-dark-muted">{count} إعلان</span>
              </button>
            );
          })}
        </div>
      ) : (
        /* Listings View */
        <div>
          {/* Search & Filters */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-light-muted dark:text-dark-muted" />
              <input
                type="text"
                placeholder={`ابحث في ${selectedCatData.name}...`}
                className="w-full pl-4 pr-10 py-2.5 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main focus:border-accent-main bg-light-input dark:bg-dark-input text-light-text dark:text-dark-textInput"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2.5 border border-light-border dark:border-dark-border rounded-lg hover:bg-light-input dark:hover:bg-dark-input text-light-text dark:text-dark-text transition-colors flex items-center gap-2"
            >
              <MapPin className="w-5 h-5" /> فلاتر
            </button>
          </div>

          {showFilters && (
            <div className="bg-light-card dark:bg-dark-card rounded-xl p-6 mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shadow-sm border border-light-border dark:border-dark-border">
              <div>
                <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-1">الموقع</label>
                <select
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main bg-light-input dark:bg-dark-input text-light-text dark:text-dark-textInput"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-1">السعر الأدنى</label>
                <div className="relative">
                  <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-muted dark:text-dark-muted" />
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full pl-3 pr-8 py-2 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main bg-light-input dark:bg-dark-input text-light-text dark:text-dark-textInput"
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
                    className="w-full pl-3 pr-8 py-2 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main bg-light-input dark:bg-dark-input text-light-text dark:text-dark-textInput"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-light-text dark:text-dark-text mb-1">الترتيب</label>
                <select
                  className="w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-lg outline-none focus:ring-2 focus:ring-accent-main bg-light-input dark:bg-dark-input text-light-text dark:text-dark-textInput"
                  value={filters.sort}
                  onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
                >
                  <option value="newest">الأحدث</option>
                  <option value="price-low">الأرخص</option>
                  <option value="price-high">الأغلى</option>
                </select>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-light-muted dark:text-dark-muted font-medium">تم العثور على {filteredListings.length} نتيجة</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center min-h-[40vh]">
              <div className="animate-spin h-8 w-8 border-4 border-accent-main border-t-transparent rounded-full"></div>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="text-center py-12 bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border">
              <div className={`w-20 h-20 ${selectedCatData.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <CategoryIcon className="w-10 h-10" />
              </div>
              <p className="text-light-muted dark:text-dark-muted text-lg font-bold">لا توجد نتائج في هذه الفئة</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
