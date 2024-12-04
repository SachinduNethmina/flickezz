import axios from "axios";
import { BACKEND_URL } from "../api/urls";

const useSearchMovies = () => {
  const searchMovies = async (page = 1, search = "", genre = "") => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}movies/search?page=${page}&search=${search}&genre=${genre}`
      );
      if (data.results) return data.results;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  return { searchMovies };
};

export default useSearchMovies;
