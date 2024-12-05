import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../api/urls";

const useGetLoggedUser = () => {
  const getLoggedUser = async (formData) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return false;
      const { data } = await axios.get(`${BACKEND_URL}auth/get-logged-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("exp", data.exp);

      return data.user;
    } catch (error) {
      return false;
    }
  };
  return { getLoggedUser };
};

export default useGetLoggedUser;
