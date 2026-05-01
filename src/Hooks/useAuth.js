import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure, logout as logoutAction, registerStart, registerSuccess, registerFailure } from "../Store/slices/authSlice";
import { loginService, registerService, fetchUserService, logoutService } from "../Services/api";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const login = async (email, password) => {
    try {
      dispatch(loginStart());
      const data = await loginService(email, password);
      dispatch(loginSuccess(data));
      return data;
    } catch (err) {
      dispatch(loginFailure(err.message));
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      dispatch(registerStart());
      await registerService(userData);
      dispatch(registerSuccess());
    } catch (err) {
      dispatch(registerFailure(err.message));
      throw err;
    }
  };

  const logout = async () => {
    try {
      await logoutService();
    } finally {
      dispatch(logoutAction());
    }
  };

  const fetchUser = async () => {
    try {
      const data = await fetchUserService();
      dispatch(loginSuccess({ user: data, token }));
    } catch {
      dispatch(logoutAction());
    }
  };

  return { user, token, isAuthenticated, loading, error, login, register, logout, fetchUser };
};
