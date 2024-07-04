import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import zxcvbn from "zxcvbn";
import Slider from "../../../components/Slider";
import OrbitingText from "../../../components/OrbitingText";
const apiUrl = import.meta.env.VITE_API_URL;

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cnic: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    cnic: "",
  });

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateCNIC = (cnic) => {
    const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/;
    return cnicRegex.test(cnic);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name,
    }));

    if (name.trim() === "") {
      setErrors((prev) => ({
        ...prev,
        name: "Name is required",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        name: "",
      }));
    }
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setFormData((prev) => ({
      ...prev,
      email,
    }));

    if (!validateEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Invalid email format",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData((prev) => ({
      ...prev,
      password,
    }));

    const result = zxcvbn(password);
    setPasswordStrength(result.score);

    if (!validatePassword(password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
  };

  const handleCnicChange = (e) => {
    const cnic = e.target.value;
    setFormData((prev) => ({
      ...prev,
      cnic,
    }));

    if (!validateCNIC(cnic)) {
      setErrors((prev) => ({
        ...prev,
        cnic: "Invalid CNIC format",
      }));
    } else {
      setErrors((prev) => ({
        ...prev,
        cnic: "",
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("submit howa");

    if (!formData.name) {
      alert("Please enter your name.");
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      alert("Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      alert(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character."
      );
      setLoading(false);
      return;
    }

    if (!validateCNIC(formData.cnic)) {
      alert("Please enter a valid CNIC.");
      setLoading(false);
      return;
    }

    try {
      const registerRsp = await axios.post(
        `${apiUrl}/api/auth/register`,
        formData
      );
      console.log(registerRsp);
      toast.success(`User Created. Now Login`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/auth/login");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex xl:gap-x-[7rem] items-center h-screen">
      <div className="relative lg:w-[35%] xl:w-[30%] lg:flex lg:flex-col lg:gap-10 hidden bluebg text-white m-10 h-[95vh] rounded-3xl">
        <div className="mt-5">
          <Slider />
        </div>

        <div className="ps-7 text-gray-200">
          <h2
            className="lg:text-[1.5rem] xl:text-[2rem] font-bold"
            style={{ lineHeight: "1.4" }}
          >
            Welcome to Saylani
            <br /> Mass It program
          </h2>
          <p
            className="lg:w-[80%] xl:w-[45%] lg:mt-5 lg:text-[1rem] xl:text-[1rem] font-bold"
            style={{ lineHeight: "1.2" }}
          >
            Register yourself and get started. ``
          </p>
        </div>

        <div className="w-[150px] p-0 absolute bottom-0">
          <OrbitingText color="white" />
        </div>
      </div>
      <div className="w-[150px] p-0 absolute bottom-0 lg:hidden left-0">
        <OrbitingText color="black" />
      </div>

      <div className="w-[90%] m-auto sm:w-fit   lg:m-0">
        <h1 className="text-4xl font-semibold mb-1">Signup</h1>
        <p className="mb-[4rem] font-bold text-sm lg:w-[80%] xl:w-[100%]">
          Please enter your registered email address and password to access your
          account
        </p>
        <form onSubmit={submitHandler} className=" lg:w-[50vw] w-[100%]">
          <div className="w-full flex flex-col gap-y-11 sm:flex-row gap-2 min-h-[6rem]">
            <div className="w-full sm:w-[50%]">
              <label
                htmlFor="name"
                className="block text-gray-600 font-bold text-sm"
              >
                NAME
              </label>
              <input
                type="text"
                disabled={loading}
                id="name"
                name="name"
                className={`w-[100%] border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
                placeholder="John Doe"
                onChange={handleNameChange}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
            <div className="w-full sm:w-[50%]">
              <label
                htmlFor="email"
                className="block text-gray-600 font-bold text-sm"
              >
                Email
              </label>
              <input
                type="text"
                disabled={loading}
                id="email"
                name="email"
                className={`w-full border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
                placeholder="test@gmail.com"
                onChange={handleEmailChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row gap-2 min-h-[6rem]">
            <div className="w-full sm:w-[50%]">
              <label
                htmlFor="password"
                className="block text-gray-600 font-bold text-sm"
              >
                Password
              </label>
              <input
                type="password"
                disabled={loading}
                id="password"
                name="password"
                className={`w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
                onChange={handlePasswordChange}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
              <div className="mt-2">
                <div
                  className={`h-2 rounded-full ${
                    passwordStrength === 0
                      ? "bg-gray-300"
                      : passwordStrength === 1
                      ? "bg-red-500"
                      : passwordStrength === 2
                      ? "bg-yellow-500"
                      : passwordStrength === 3
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${(passwordStrength + 1) * 20}%` }}
                ></div>
                <p className="text-gray-600 text-sm mt-1">
                  Password strength: {passwordStrength ? passwordStrength : 0}/4
                </p>
              </div>
            </div>

            <div className="w-full sm:w-[50%]">
              <label
                htmlFor="cnic"
                className="block text-gray-600 font-bold text-sm"
              >
                CNIC
              </label>
              <input
                type="text"
                disabled={loading}
                id="cnic"
                name="cnic"
                className={`w-[100%] border ${
                  errors.cnic ? "border-red-500" : "border-gray-300"
                } rounded-md py-2 px-3 focus:outline-none focus:border-blue-500`}
                placeholder="XXXXX-XXXXXXX-X"
                onChange={handleCnicChange}
              />
              {errors.cnic && (
                <p className="text-red-500 text-sm mt-1">{errors.cnic}</p>
              )}
            </div>
          </div>

          <div className="mt-5 flex justify-center  m-auto">
            <button
              type="submit"
              disabled={loading}
              className="bluebg w-full text-white font-semibold rounded-md py-2 px-4 "
            >
              {loading ? "loading" : "Signup"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-blue-500 text-center" disabled={loading}>
          <Link to="/auth/login" className="hover:underline">
            Already Logged In ...login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
