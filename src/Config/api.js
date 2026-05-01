export const API_BASE = "http://localhost:3000/api";
export const API_ROUTES = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    me: "/auth/me",
  },
  listings: {
    all: "/listings",
    create: "/listings",
    detail: "/listings",
    update: "/listings",
    delete: "/listings",
  },
  profile: {
    get: "/profile",
    update: "/profile",
    favorites: "/favorites",
    bookmarks: "/bookmarks",
    messages: "/messages",
  },
};
