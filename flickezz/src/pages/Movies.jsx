import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/MovieCard";
import MovieCard2 from "../components/MovieCard2";
import Tag from "../components/Tag";
import useGetLatestMovies from "../hooks/useGetLatestMovies";
import useGetPopularMovies from "../hooks/useGetPopularMovies";
import useSearchMovies from "../hooks/useSearchMovies";
import { useLocation, useParams } from "react-router-dom";

const Movies = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("q");

  const [activeGenre, setActiveGenre] = useState("");
  const [genres, setGenres] = useState([
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
    { id: 3, name: "Animation" },
    { id: 4, name: "Comedy" },
    { id: 5, name: "Drama" },
    { id: 6, name: "Fantasy" },
    { id: 7, name: "Horror" },
    { id: 8, name: "Mystery" },
    { id: 9, name: "Romance" },
    { id: 10, name: "Sci-fi" },
    { id: 11, name: "Thriller" },
    { id: 12, name: "Documentary" },
    { id: 13, name: "Family" },
    { id: 14, name: "Music" },
    { id: 15, name: "History" },
    { id: 16, name: "Crime" },
    { id: 17, name: "War" },
    { id: 18, name: "Western" },
    { id: 19, name: "Sport" },
    { id: 20, name: "Biography" },
  ]);

  const [latest, setLatest] = useState([]);
  const [pageLatest, setPageLatest] = useState(1);

  const { getLatestMovies } = useGetLatestMovies();
  useEffect(() => {
    const load = async () => {
      const data = await getLatestMovies(pageLatest);
      setLatest([...latest, ...data]);
    };
    load();
  }, [pageLatest]);

  const [popular, setPopular] = useState([]);
  const [pagePopular, setPagePopular] = useState(1);

  const { getPopularMovies } = useGetPopularMovies();
  useEffect(() => {
    const load = async () => {
      const data = await getPopularMovies(pagePopular);
      setPopular([...popular, ...data]);
    };
    load();
  }, [pagePopular]);

  const [searchPage, setSearchPage] = useState(1);
  const [search, setSearch] = useState(searchParam || "");
  const [searchedMovies, setSearchedMovies] = useState([]);
  const { searchMovies } = useSearchMovies();
  const [isSearch, setIsSearch] = useState(false);
  const [noSearchedResults, setNoSearchedResults] = useState(false);

  useEffect(() => {
    const handleSearchMovies = async () => {
      const data = await searchMovies(searchPage, search, activeGenre);
      if (activeGenre.trim().length === 0 && search.trim().length === 0) {
        setSearchedMovies([]);
        setNoSearchedResults(false);
      } else {
        const newData = [...searchedMovies, ...data];
        setSearchedMovies([...newData]);
        if (newData.length === 0) {
          setNoSearchedResults(true);
        } else {
          setNoSearchedResults(false);
        }
      }
    };
    handleSearchMovies();
  }, [activeGenre, searchPage, isSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchPage(1);
    setSearchedMovies([]);
    setIsSearch(!isSearch);
  };

  return (
    <>
      <div
        className="container-fluid bg-2 p-0"
        style={{
          backgroundImage:
            "url('https://leroux.ca/wtl-content/uploads/2024/01/2023-Watchlist-1200x764.jpg')",
        }}
      >
        <div className="bg-1-container d-flex flex-column justify-content-center align-items-center">
          <div className="bg-1-container-1 mt-5">
            <h1 className="title-1 mt-5">Movies</h1>
            <h5 className="title-2 mt-4">
              Watch your favourite movie online or download
            </h5>
            <form
              className="d-inline-flex gap-2 mt-4 mt-md-5"
              onSubmit={handleSearch}
            >
              <input
                type="text"
                className="form-control themed-input-1 px-4"
                placeholder="Search movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-themed" type="submit">
                Search
              </button>
            </form>
            <div className="mt-4">
              <Swiper
                spaceBetween={15}
                pagination={false}
                breakpoints={{
                  0: {
                    slidesPerView: 5, // Show 2 slides for small screens
                    spaceBetween: 5, // Reduce spacing for smaller screens
                  },
                  768: {
                    slidesPerView: 8, // Show 3 slides for medium screens
                    spaceBetween: 5,
                  },
                  1024: {
                    slidesPerView: 8, // Show 4 slides for larger screens
                    spaceBetween: 15,
                  },
                }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {genres.map((genre, index) => (
                  <SwiperSlide key={index}>
                    <Tag
                      text={genre.name}
                      onClick={() => {
                        setSearchPage(1);
                        setSearchedMovies([]);
                        activeGenre === genre.name
                          ? setActiveGenre("")
                          : setActiveGenre(genre.name);
                      }}
                      active={activeGenre === genre.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      {searchedMovies.length === 0 && !noSearchedResults && (
        <div className="container mt-5 mb-5">
          <h4 className="title-3">Latest Movies</h4>

          <div className="mt-4 row movie-card-container">
            {latest.map((movie, index) => (
              <div
                key={index}
                className="col-6 col-md-3 col-lg-2 movie-card-box"
              >
                <MovieCard
                  title={`${movie.title.slice(0, 16)}${
                    movie.title.length > 16 ? "..." : ""
                  }`}
                  image={movie.largeCoverImage}
                  year={movie.year}
                  runtime={movie.runtime}
                  slug={movie.slug}
                />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-dark w-50"
              onClick={() => setPageLatest(pageLatest + 1)}
            >
              <i className="bi bi-plus-lg text-white"></i> Load more..
            </button>
          </div>
        </div>
      )}

      {searchedMovies.length === 0 && !noSearchedResults && (
        <div className="container mt-5 mb-5">
          <h4 className="title-3">Popular Movies</h4>

          <div className="mt-4 row movie-card-container">
            {popular.map((movie, index) => (
              <div
                key={index}
                className="col-6 col-md-3 col-lg-2 movie-card-box"
              >
                <MovieCard
                  title={`${movie.title.slice(0, 16)}${
                    movie.title.length > 16 ? "..." : ""
                  }`}
                  image={movie.largeCoverImage}
                  year={movie.year}
                  runtime={movie.runtime}
                  slug={movie.slug}
                />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center">
            <button
              className="btn btn-dark w-50"
              onClick={() => setPagePopular(pagePopular + 1)}
            >
              <i className="bi bi-plus-lg text-white"></i> Load more..
            </button>
          </div>
        </div>
      )}

      {noSearchedResults && (
        <div className="container mt-5 mb-5">
          <h4 className="title-3">Search Results</h4>

          <h6 className="title-3">No Movies Found</h6>
        </div>
      )}

      {searchedMovies.length > 0 && (
        <div className="container mt-5 mb-5">
          <h4 className="title-3">Search Results</h4>

          <div className="mt-4 row movie-card-container">
            {searchedMovies.map((movie, index) => (
              <div
                key={index}
                className="col-6 col-md-3 col-lg-2 movie-card-box"
              >
                <MovieCard
                  title={`${movie.title.slice(0, 16)}${
                    movie.title.length > 16 ? "..." : ""
                  }`}
                  image={movie.largeCoverImage}
                  year={movie.year}
                  runtime={movie.runtime}
                  slug={movie.slug}
                />
              </div>
            ))}
          </div>

          <div className="d-flex justify-content-center gap-3">
            <button
              className="btn btn-dark w-50"
              onClick={() => setSearchPage(searchPage + 1)}
            >
              <i className="bi bi-plus-lg text-white"></i> Load more..
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Movies;
