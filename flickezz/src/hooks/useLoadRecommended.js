import axios from "axios";
import { BACKEND_URL } from "../api/urls";

const useLoadRecommended = () => {
  const loadRecommended = async (genres) => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}movies/recommended?genres=${genres}`);
      if (data.movies) return data.movies;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  return { loadRecommended };
};

export default useLoadRecommended;
