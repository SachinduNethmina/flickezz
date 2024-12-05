import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../api/urls";

const useRegister = () => {
  const register = async (formData) => {
    const status = handleErrors(formData);
    if (!status) return false;
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return true;
    } catch (error) {
      if (error.response.data && error.response.data.message)
        toast.error(error.response.data.message);
      return false;
    }
  };
  return { register };
};

const handleErrors = (formData) => {
  if (!formData.name || formData.name.trim().length === 0) {
    toast.error("Name is required");
  } else if (!formData.email || formData.email.trim().length === 0) {
    toast.error("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    toast.error("Invalid email address");
  } else if (!formData.password || formData.password.trim().length === 0) {
    toast.error("Password is required");
  } else if (formData.password.length < 6) {
    toast.error("Password should 6 characters long");
  } else if (
    !formData.retypePassword ||
    formData.retypePassword.trim().length === 0
  ) {
    toast.error("Retype password is required");
  } else if (formData.password !== formData.retypePassword) {
    toast.error("Password and retype password should be same");
  } else {
    return true;
  }

  return false;
};

export default useRegister;
