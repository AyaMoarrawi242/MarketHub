import { useDispatch, useSelector } from "react-redux";
import {
  fetchListingsStart,
  fetchListingsSuccess,
  fetchListingsFailure,
  fetchListingDetailStart,
  fetchListingDetailSuccess,
  fetchListingDetailFailure,
  createListingStart,
  createListingSuccess,
  createListingFailure,
  updateListingStart,
  updateListingSuccess,
  updateListingFailure,
  deleteListingStart,
  deleteListingSuccess,
  deleteListingFailure,
  clearCurrentListing,
} from "../Store/slices/listingsSlice";
import {
  getListingsService,
  getListingDetailService,
  createListingService,
  updateListingService,
  deleteListingService,
} from "../Services/api";

export const useListing = () => {
  const dispatch = useDispatch();
  const { listings, currentListing, loading, error, totalPages, currentPage } = useSelector((state) => state.listings);

  const fetchListings = async (params = {}) => {
    try {
      dispatch(fetchListingsStart());
      const data = await getListingsService(params);
      dispatch(fetchListingsSuccess(data));
    } catch (err) {
      dispatch(fetchListingsFailure(err.message));
    }
  };

  const fetchListingDetail = async (id) => {
    try {
      dispatch(fetchListingDetailStart());
      const data = await getListingDetailService(id);
      dispatch(fetchListingDetailSuccess(data));
    } catch (err) {
      dispatch(fetchListingDetailFailure(err.message));
    }
  };

  const createListing = async (listingData) => {
    try {
      dispatch(createListingStart());
      const data = await createListingService(listingData);
      dispatch(createListingSuccess(data));
      return data;
    } catch (err) {
      dispatch(createListingFailure(err.message));
      throw err;
    }
  };

  const updateListing = async (id, listingData) => {
    try {
      dispatch(updateListingStart());
      const data = await updateListingService(id, listingData);
      dispatch(updateListingSuccess(data));
      return data;
    } catch (err) {
      dispatch(updateListingFailure(err.message));
      throw err;
    }
  };

  const deleteListing = async (id) => {
    try {
      dispatch(deleteListingStart());
      await deleteListingService(id);
      dispatch(deleteListingSuccess(id));
    } catch (err) {
      dispatch(deleteListingFailure(err.message));
      throw err;
    }
  };

  const clearListing = () => {
    dispatch(clearCurrentListing());
  };

  return {
    listings,
    currentListing,
    loading,
    error,
    totalPages,
    currentPage,
    fetchListings,
    fetchListingDetail,
    createListing,
    updateListing,
    deleteListing,
    clearListing,
  };
};
