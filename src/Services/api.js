/*
 * ==========================================
 * 🛠 دليل الربط مع الباك إند (Backend Guide)
 * ==========================================
 * هذا الملف يحتوي حالياً على بيانات وهمية (Mock Data) ليعمل الواجهة.
 * عندما تكون جاهزاً للربط مع السيرفر الحقيقي، اتبع الخطوات التالية:
 * 
 * 1. أنشئ ملف .env في مجلد المشروع الرئيسي:
 *    VITE_API_URL=https://api.yourdomain.com
 * 
 * 2. استبدل دالة request الحالية بمكتبة axios أو fetch:
 *    import axios from 'axios';
 *    const api = axios.create({ baseURL: import.meta.env.VITE_API_URL });
 * 
 * 3. قم بتعديل الدوال في الأسفل (مثل loginService) لتستخدم api.post(...) بدلاً من request.
 * 
 * ملاحظة: أسماء الدوال (loginService, getListingsService, etc.) صحيحة وجاهزة للاستخدام،
 * لن تحتاج لتغيير أي كود في صفحات الـ UI (Components/Pages).
 * ==========================================
 */

// متغيرات البيئة (إذا وجدت)
const API_URL = import.meta.env.VITE_API_URL || ""; 

let MOCK_FAVORITES = ["1", "3"];
let MOCK_BOOKMARKS = ["2"];

let MOCK_FOLLOWS = {
  following: ["seller_1", "seller_2"],
  followers: ["seller_3"],
};

const MOCK_USERS_DB = {
  seller_1: { id: "seller_1", name: "أحمد محمد", email: "ahmed@email.com", joined: "2024-06-10T10:00:00Z" },
  seller_2: { id: "seller_2", name: "سارة علي", email: "sara@email.com", joined: "2024-08-15T14:30:00Z" },
  seller_3: { id: "seller_3", name: "خالد حسن", email: "khaled@email.com", joined: "2024-11-20T09:00:00Z" },
};

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
      // إصلاح: إذا المستخدم موجود بس ما عنده اسم
      if (!user.name) {
        user.name = body.email.split("@")[0];
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
    const fallbackName = user?.email ? user.email.split("@")[0] : "زائر";
    return user ? { ...user, name: user.name || fallbackName } : { id: "current_user", name: "زائر", email: "" };
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
    const fallbackName = user.email ? user.email.split("@")[0] : "مستخدم";
    const profileWithFallback = { ...user, name: user.name || fallbackName };
    const myListings = MOCK_LISTINGS.filter(l => l.userId === user.id);
    return { profile: profileWithFallback, listings: myListings };
  }

  if (url.includes("/follows")) {
    const currentUser = getCurrentUser();
    if (!currentUser) throw new Error("يجب تسجيل الدخول");

    if (url.includes("/follow") && !url.includes("/followers") && !url.includes("/following") && !url.includes("/follows/check")) {
      const segments = url.split("/").filter(Boolean);
      const targetId = segments[segments.length - 2];
      if (targetId === currentUser.id) throw new Error("لا يمكنك متابعة نفسك");
      if (!MOCK_FOLLOWS.following.includes(targetId)) {
        MOCK_FOLLOWS.following.push(targetId);
        if (!MOCK_FOLLOWS.followers.includes(currentUser.id)) {
          MOCK_FOLLOWS.followers.push(currentUser.id);
        }
      }
      return { action: "followed", targetId, following: [...MOCK_FOLLOWS.following] };
    }

    if (url.includes("/unfollow")) {
      const segments = url.split("/").filter(Boolean);
      const targetId = segments[segments.length - 2];
      MOCK_FOLLOWS.following = MOCK_FOLLOWS.following.filter((id) => id !== targetId);
      MOCK_FOLLOWS.followers = MOCK_FOLLOWS.followers.filter((id) => id !== currentUser.id);
      return { action: "unfollowed", targetId, following: [...MOCK_FOLLOWS.following] };
    }

    if (url.includes("/following") && !url.includes("/followers")) {
      return {
        following: MOCK_FOLLOWS.following.map((id) => MOCK_USERS_DB[id] || { id, name: "مستخدم", email: "" }),
        count: MOCK_FOLLOWS.following.length,
      };
    }

    if (url.includes("/followers")) {
      return {
        followers: MOCK_FOLLOWS.followers.map((id) => MOCK_USERS_DB[id] || { id, name: "مستخدم", email: "" }),
        count: MOCK_FOLLOWS.followers.length,
      };
    }

    if (url.match(/\/follows\/check\/[\w]+/)) {
      const targetId = url.split("/").pop();
      return { isFollowing: MOCK_FOLLOWS.following.includes(targetId) };
    }
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

export const followUserService = (targetId) => request(`/follows/${targetId}/follow`, { method: "POST" });
export const unfollowUserService = (targetId) => request(`/follows/${targetId}/unfollow`, { method: "POST" });
export const getFollowingService = () => request("/follows/following");
export const getFollowersService = () => request("/follows/followers");
export const checkFollowStatusService = (targetId) => request(`/follows/check/${targetId}`);
