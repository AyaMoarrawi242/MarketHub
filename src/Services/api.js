let MOCK_FAVORITES = ["1", "3"];
let MOCK_BOOKMARKS = ["2"];

// تعريف المستخدم الحالي (يتم تحميله من التخزين المحلي أو إنشاؤه جديد)
let MOCK_USER = JSON.parse(localStorage.getItem("mockUser") || "null");

// الإعلانات الوهمية (تخص بائعين آخرين، وليست لك)
let MOCK_LISTINGS = [
  {
    id: "1",
    title: "شقة مفروشة للإيجار في المزة",
    description: "شقة مفروشة بالكامل مكونة من غرفتي نوم وصالة ومطبخ، قريبة من جميع الخدمات",
    price: 500000,
    category: "عقارات",
    location: "دمشق، المزة",
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500&q=80", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500&q=80"],
    featured: true,
    status: "active",
    userId: "seller_1", // بائع آخر
    seller: { name: "أحمد محمد", email: "ahmed@email.com" },
    createdAt: "2025-01-15T10:00:00Z",
  },
  {
    id: "2",
    title: "سيارة هيونداي النترا 2020",
    description: "سيارة بحالة ممتازة، موديل 2020، ماشية 50 ألف كم",
    price: 25000000,
    category: "سيارات",
    location: "حلب",
    images: ["https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=500&q=80", "https://images.unsplash.com/photo-1549399542-7e3f8b77c02c?w=500&q=80"],
    featured: false,
    status: "active",
    userId: "seller_2", // بائع آخر
    seller: { name: "سارة علي", email: "sara@email.com" },
    createdAt: "2025-02-20T14:30:00Z",
  },
  {
    id: "3",
    title: "آيفون 15 برو ماكس جديد",
    description: "آيفون 15 برو ماكس 256 جيجا، جديد بكرتونه مع ضمان",
    price: 8000000,
    category: "إلكترونيات",
    location: "دمشق، حمص",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80"],
    featured: false,
    status: "active",
    userId: "seller_1", // بائع آخر
    seller: { name: "أحمد محمد", email: "ahmed@email.com" },
    createdAt: "2025-03-10T09:00:00Z",
  },
  {
    id: "4",
    title: "طقم كنب مودرن",
    description: "طقم كنب مكون من 3 قطع، قماش إيطالي عالي الجودة",
    price: 1500000,
    category: "أثاث",
    location: "اللاذقية",
    images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80", "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&q=80"],
    featured: true,
    status: "active",
    userId: "seller_3", // بائع آخر
    seller: { name: "خالد حسن", email: "khaled@email.com" },
    createdAt: "2025-04-05T16:00:00Z",
  },
];

const delay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

// دالة لجلب المستخدم الحالي من التخزين
const getCurrentUser = () => {
  const stored = localStorage.getItem("mockUser");
  return stored ? JSON.parse(stored) : null;
};

const setCurrentUser = (user) => {
  localStorage.setItem("mockUser", JSON.stringify(user));
  MOCK_USER = user;
};

const request = async (url, options = {}) => {
  await delay();

  if (url.includes("/auth/login")) {
    const body = JSON.parse(options.body);
    if (body.email && body.password) {
      // تسجيل الدخول: إذا كان المستخدم موجوداً في التخزين نرجعه، وإلا ننشئ حساب جديد لك
      let user = getCurrentUser();
      if (!user) {
        user = { id: "current_user", name: body.email.split("@")[0], email: body.email, joined: new Date().toISOString() };
        setCurrentUser(user);
      }
      return {
        user: user,
        token: "mock-token-12345",
      };
    }
    throw new Error("بيانات الدخول غير صحيحة");
  }

  if (url.includes("/auth/register")) {
    const body = JSON.parse(options.body);
    const newUser = { id: "current_user", name: body.name, email: body.email, joined: new Date().toISOString() };
    setCurrentUser(newUser);
    return { message: "تم إنشاء الحساب بنجاح" };
  }

  if (url.includes("/auth/me")) {
    const user = getCurrentUser();
    return user || { id: "current_user", name: "زائر", email: "" };
  }

  if (url.includes("/favorites")) {
    if (url.includes("/toggle")) {
      const id = url.split("/")[url.split("/").length - 2];
      const index = MOCK_FAVORITES.indexOf(id);
      if (index === -1) {
        MOCK_FAVORITES.push(id);
        return { action: "added", favorites: [...MOCK_FAVORITES] };
      }
      MOCK_FAVORITES.splice(index, 1);
      return { action: "removed", favorites: [...MOCK_FAVORITES] };
    }
    return { favorites: [...MOCK_FAVORITES] };
  }

  if (url.includes("/bookmarks")) {
    if (url.includes("/toggle")) {
      const id = url.split("/")[url.split("/").length - 2];
      const index = MOCK_BOOKMARKS.indexOf(id);
      if (index === -1) {
        MOCK_BOOKMARKS.push(id);
        return { action: "added", bookmarks: [...MOCK_BOOKMARKS] };
      }
      MOCK_BOOKMARKS.splice(index, 1);
      return { action: "removed", bookmarks: [...MOCK_BOOKMARKS] };
    }
    return { bookmarks: [...MOCK_BOOKMARKS] };
  }

  if (url.includes("/listings")) {
    const currentUser = getCurrentUser();
    const currentUserId = currentUser ? currentUser.id : "current_user";

    if (options.method === "POST") {
      const body = JSON.parse(options.body);
      const newListing = {
        id: String(Date.now()),
        ...body,
        userId: currentUserId, // الإعلان يخص المستخدم المسجل دخوله
        seller: { name: currentUser?.name || "مستخدم", email: currentUser?.email || "" },
        featured: false,
        status: "active",
        createdAt: new Date().toISOString(),
      };
      MOCK_LISTINGS = [newListing, ...MOCK_LISTINGS];
      return newListing;
    }

    if (options.method === "PUT") {
      const id = url.split("/").pop();
      const body = JSON.parse(options.body);
      MOCK_LISTINGS = MOCK_LISTINGS.map(l => l.id === id ? { ...l, ...body } : l);
      return MOCK_LISTINGS.find(l => l.id === id);
    }

    if (options.method === "DELETE") {
      const id = url.split("/").pop();
      const exists = MOCK_LISTINGS.find(l => l.id === id);
      if (exists) {
        MOCK_LISTINGS = MOCK_LISTINGS.filter(l => l.id !== id);
        return { message: "تم الحذف" };
      }
      throw new Error("الإعلان غير موجود");
    }

    const listingIdMatch = url.match(/\/listings\/(\w+)/);
    if (listingIdMatch) {
      const listing = MOCK_LISTINGS.find((l) => l.id === listingIdMatch[1]);
      if (listing) return listing;
      throw new Error("الإعلان غير موجود");
    }

    return {
      listings: [...MOCK_LISTINGS],
      totalPages: 1,
      currentPage: 1,
    };
  }

  if (url.includes("/profile")) {
    const user = getCurrentUser();
    if (!user) throw new Error("يجب تسجيل الدخول");
    
    // جلب الإعلانات التي تخص المستخدم الحالي فقط
    const myListings = MOCK_LISTINGS.filter(l => l.userId === user.id);
    return { profile: user, listings: myListings };
  }

  throw new Error("الصفحة غير موجودة");
};

// تصدير الدوال
export const loginService = (email, password) =>
  request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });

export const registerService = (userData) =>
  request("/auth/register", { method: "POST", body: JSON.stringify(userData) });

export const fetchUserService = () => request("/auth/me");

export const logoutService = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("mockUser"); // مسح بيانات المستخدم الوهمي
  return Promise.resolve();
};

export const getListingsService = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/listings${query ? `?${query}` : ""}`);
};

export const getListingDetailService = (id) => request(`/listings/${id}`);
export const createListingService = (listingData) => request("/listings", { method: "POST", body: JSON.stringify(listingData) });
export const updateListingService = (id, listingData) => request(`/listings/${id}`, { method: "PUT", body: JSON.stringify(listingData) });
export const deleteListingService = (id) => request(`/listings/${id}`, { method: "DELETE" });

export const toggleFavoriteService = (id) => request(`/favorites/${id}/toggle`);
export const getFavoritesService = () => request("/favorites");
export const toggleBookmarkService = (id) => request(`/bookmarks/${id}/toggle`);
export const getBookmarksService = () => request("/bookmarks");

export const fetchProfileService = () => request("/profile");
export const fetchPublicProfileService = (userId) => {
  const user = { id: userId, name: "مستخدم آخر", email: "user@example.com", joined: "2024-11-15" };
  const publicListings = MOCK_LISTINGS.filter((l) => l.userId === userId);
  return { profile: user, listings: publicListings };
};

export const updateProfileService = (data) => {
  const user = getCurrentUser();
  if (!user) throw new Error("غير مسجل");
  const updatedUser = { ...user, ...data };
  setCurrentUser(updatedUser);
  return updatedUser;
};
