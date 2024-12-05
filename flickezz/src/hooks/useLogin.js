import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../api/urls";

const useLogin = () => {
  const login = async (formData) => {
    const status = handleErrors(formData);
    if (!status) return false;
    try {
      const { data } = await axios.post(`${BACKEND_URL}auth/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("exp", data.exp);

      return data.user;
    } catch (error) {
      if (error.response.data && error.response.data.message)
        toast.error(error.response.data.message);
      return false;
    }
  };
  return { login };
};

const handleErrors = (formData) => {
  if (!formData.email || formData.email.trim().length === 0) {
    toast.error("Email is required");
  } else if (!formData.password || formData.password.trim().length === 0) {
    toast.error("Password is required");
  } else {
    return true;
  }

  return false;
};

export default useLogin;
