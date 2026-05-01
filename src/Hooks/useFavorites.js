import { useDispatch, useSelector } from "react-redux";
import {
  fetchFavoritesStart,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  fetchBookmarksStart,
  fetchBookmarksSuccess,
  fetchBookmarksFailure,
  toggleFavorite,
  toggleBookmark,
} from "../Store/slices/favoritesSlice";
import {
  toggleFavoriteService,
  getFavoritesService,
  toggleBookmarkService,
  getBookmarksService,
} from "../Services/api";

export const useFavorites = () => {
  const dispatch = useDispatch();
  const { favorites, bookmarks, loading, error } = useSelector((state) => state.favorites);

  const toggleFav = async (id) => {
    try {
      dispatch(toggleFavorite(id));
      await toggleFavoriteService(id);
    } catch (err) {
      dispatch(toggleFavorite(id));
    }
  };

  const toggleBkmk = async (id) => {
    try {
      dispatch(toggleBookmark(id));
      await toggleBookmarkService(id);
    } catch (err) {
      dispatch(toggleBookmark(id));
    }
  };

  const fetchFavorites = async () => {
    try {
      dispatch(fetchFavoritesStart());
      const data = await getFavoritesService();
      dispatch(fetchFavoritesSuccess(data.favorites));
    } catch (err) {
      dispatch(fetchFavoritesFailure(err.message));
    }
  };

  const fetchBookmarks = async () => {
    try {
      dispatch(fetchBookmarksStart());
      const data = await getBookmarksService();
      dispatch(fetchBookmarksSuccess(data.bookmarks));
    } catch (err) {
      dispatch(fetchBookmarksFailure(err.message));
    }
  };

  return {
    favorites,
    bookmarks,
    loading,
    error,
    toggleFav,
    toggleBkmk,
    fetchFavorites,
    fetchBookmarks,
  };
};
