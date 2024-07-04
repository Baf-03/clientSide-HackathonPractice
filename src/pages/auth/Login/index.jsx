import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import Slider from "../../../components/Slider";
const apiUrl = import.meta.env.VITE_API_URL;
import logo from "../../../assets/logo.png";
import OrbitingText from "../../../components/OrbitingText";

const Login = () => {
  const images = [
    "https://via.placeholder.com/800x400/FF0000/FFFFFF?text=Slide+1",
    "https://via.placeholder.com/800x400/00FF00/FFFFFF?text=Slide+2",
    "https://via.placeholder.com/800x400/0000FF/FFFFFF?text=Slide+3",
    "https://via.placeholder.com/800x400/FFFF00/FFFFFF?text=Slide+4",
  ];

  const [loadingApi, setLoadingApi] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      toast.error("Email and password cannot be empty", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    setLoadingApi(true);
    try {
      const loginRsp = await axios.post(`${apiUrl}/api/auth/login`, formData);
      localStorage.setItem("token", loginRsp.data.token);
      toast.success(`Welcome ${email}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/");
      console.log(loginRsp);
    } catch (err) {
      toast.error("Either email or password is incorrect", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setLoadingApi(false);
    }
  };

  const paragraphStyle = {
    lineHeight: "1.2",
  };
  const HeadingStyle = {
    lineHeight: "1.4",
  };

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="relative lg:w-[45%] xl:w-[57%] lg:flex lg:flex-col lg:gap-10 hidden bluebg text-white m-10 h-[95vh] rounded-3xl">
        <div className="mt-[4.5rem] ps-7 text-gray-200">
          <h2
            className="lg:text-[2.5rem] xl:text-[3rem] font-bold"
            style={HeadingStyle}
          >
            Welcome to Saylani
            <br /> Student Portal
          </h2>
          <p
            className="lg:w-[80%] xl:w-[45%] lg:mt-5 lg:text-[0.8rem] xl:text-[1rem]"
            style={paragraphStyle}
          >
            Arm the next generation with coding abilities to ready them for
            national progression. Enroll in our Saylani Mass IT Training Scheme
            and hone your skills in Web and Mobile App Development.
          </p>
        </div>

        <Slider images={images} />

        <div className="w-[150px] p-0 absolute bottom-0">
          <OrbitingText color="white" />
        </div>
      </div>
      <div className="w-[150px] p-0 absolute bottom-0 lg:hidden left-0">
        <OrbitingText color="black" />
      </div>
      <div className="xl:p-[1rem] md:p-[5rem] lg:p-10 w-[90%] md:w-[70%] lg:w-[65%] xl:w-[40%] ">
        <div className="text-center mb-5 ">
          <h1 className="text-3xl font-semibold mb-4">Welcome Back</h1>
          <p className="text-[0.8rem]">
            Please enter your registered email address and password to access
            your account
          </p>
        </div>

        <form onSubmit={submitHandler}>
          <div className="mb-4 xl:w-[80%] m-auto">
            <label htmlFor="username" className="block text-gray-600">
              CNIC
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="XXXXX-XXXXXXX-X"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              disabled={loadingApi}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  email: e.target.value,
                }));
              }}
            />
          </div>

          <div className="mb-4 xl:w-[80%] m-auto">
            <label htmlFor="password" className="block text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              disabled={loadingApi}
              placeholder="Enter Your Password here"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`xl:w-[80%] border bluebg hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full ${
                loadingApi ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loadingApi}
            >
              {loadingApi ? "Loading..." : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-blue-500 text-center" disabled={loadingApi}>
          <Link to="/auth/register" className="hover:underline">
            Sign up Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
