import axios from "axios";
import { BACKEND_URL } from "../api/urls";

const useLoadForYouMovies = () => {
  const getForYouMovies = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}movies/for-you`);
      if (data.forYou) return data.forYou;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  return { getForYouMovies };
};

export default useLoadForYouMovies;
