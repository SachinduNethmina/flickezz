import axios from "axios";
import { BACKEND_URL } from "../api/urls";

const useLoadCategories = () => {
  const loadCategories = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}blog/categories`);
      return data.categories;
    } catch (error) {
      return [];
    }
  };
  return { loadCategories };
};

export default useLoadCategories;
