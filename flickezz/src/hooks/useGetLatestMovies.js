import axios from "axios";
import { BACKEND_URL } from "../api/urls";

const useGetLatestMovies = () => {
  const getLatestMovies = async (page = 1) => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}movies/latest?page=${page}`
      );
      if (data.latest) return data.latest;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  return { getLatestMovies };
};

export default useGetLatestMovies;
