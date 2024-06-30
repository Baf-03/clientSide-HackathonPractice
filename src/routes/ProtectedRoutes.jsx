import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Fixing the import statement
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { isVerified, setLoading, updateEmail } from "../state/userSlice";
const apiUrl = import.meta.env.VITE_API_URL;
const ProtectedRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {loading ,verified} = useSelector((state) => state.userReducer);

 const pageNav =()=>{
  
  if(!verified){
    dispatch(setLoading(false));
    
    navigate("/auth/login")
  }
 }
    
const validateToken = async (token) => {
    try {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken.email)
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem("token");
        dispatch(isVerified(false))
        dispatch(setLoading(true));
        pageNav()
      } 
      else{
       const resp= await axios.get(`${apiUrl}/api/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(resp)
        console.log(localStorage.getItem("token"))
        if(localStorage.getItem("token")){
          console.log("mae andr hon 1")
          if(resp?.data?.status===false && resp?.data?.email){
          console.log("mae andr hon 1 2")

            dispatch(updateEmail(decodedToken.email))
            dispatch(setLoading(false));
            dispatch(isVerified(true))
            navigate("/auth/otp-verify")
            return
          }
        }
        
        
        console.log("hello",resp)
        dispatch(setLoading(false));
        dispatch(isVerified(true))
        dispatch(updateEmail(decodedToken.email))

        const timeoutDuration = (decodedToken.exp - currentTime) * 1000;
        setTimeout(() => {
          localStorage.removeItem("token");
          dispatch(setLoading(true));
          dispatch(isVerified(false));
          pageNav()
        }, timeoutDuration);
      }
    } catch (error) {
      localStorage.removeItem("token");
      dispatch(isVerified(false))
      dispatch(setLoading(true));
      pageNav()
     
    }
  };

  useEffect(() => {
    dispatch(setLoading(true));
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        dispatch(isVerified(false))
        dispatch(setLoading(true));
        pageNav()
      } else {
        validateToken(token);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    handleStorageChange();
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return loading ? <div className='h-screen flex justify-center items-center'>loading...</div> : verified ? <Outlet /> : "User not verified";
};

export default ProtectedRoute;