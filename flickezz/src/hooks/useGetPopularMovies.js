import axios from "axios";
import { BACKEND_URL } from "../api/urls";

const useGetPopularMovies = () => {
  const getPopularMovies = async (page = 1) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}movies/popular?page=${page}`
      );
      if (data.popular) return data.popular;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  return { getPopularMovies };
};

export default useGetPopularMovies;
