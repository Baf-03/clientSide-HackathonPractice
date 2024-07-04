import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Fixing the import statement
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { isVerified, setLoading, updateEmail } from "../state/userSlice";

const apiUrl = import.meta.env.VITE_API_URL;

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, verified } = useSelector((state) => state.userReducer);

  const pageNav = () => {
    if (!verified) {
      dispatch(setLoading(false));
      navigate("/auth/login");
    }
  };

  const validateToken = async (token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        dispatch(isVerified(false));
        dispatch(setLoading(false));
        pageNav();
      } else {
        console.log("verified api hit protected",)
        const resp = await axios.get(`${apiUrl}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (localStorage.getItem("token")) {
          if (resp?.data?.status === false && resp?.data?.email) {
            dispatch(updateEmail(decodedToken.email));
            dispatch(setLoading(false));
            dispatch(isVerified(true));
            navigate("/auth/otp-verify");
            return;
          }
        }

        dispatch(setLoading(false));
        dispatch(isVerified(true));
        dispatch(updateEmail(decodedToken.email));

        const timeoutDuration = (decodedToken.exp - currentTime) * 1000;
        setTimeout(() => {
          localStorage.removeItem("token");
          dispatch(setLoading(true));
          dispatch(isVerified(false));
          pageNav();
        }, timeoutDuration);
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("token");
      dispatch(isVerified(false));
      dispatch(setLoading(false));
      pageNav();
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(isVerified(false));
        dispatch(setLoading(false));
        pageNav();
      } else {
        validateToken(token);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate, dispatch]);

  return loading ? (
    <div className="h-screen flex justify-center items-center">loading...</div>
  ) : verified ? (
    <Outlet />
  ) : (
    <div>User not verified</div>
  );
};

export default ProtectedRoute;