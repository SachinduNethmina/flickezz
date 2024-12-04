import axios from "axios";
import { BACKEND_URL } from "../api/urls";

const useLoadMovieData = () => {
  const loadMovieData = async (slug) => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}movies/movie/${slug}`);
      if (data.movie) return data.movie;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  return { loadMovieData };
};

export default useLoadMovieData;
