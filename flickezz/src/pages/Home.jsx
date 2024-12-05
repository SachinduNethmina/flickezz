import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/MovieCard";
import useGetPopularMovies from "../hooks/useGetPopularMovies";
import useGetLatestMovies from "../hooks/useGetLatestMovies";
import useLoadForYouMovies from "../hooks/useLoadForYouMovies";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Home = () => {
  const navigate = useNavigate();

  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const [forYou, setForYou] = useState([]);

  const { getPopularMovies } = useGetPopularMovies();
  useEffect(() => {
    const load = async () => {
      const popular = await getPopularMovies();
      setPopular(popular);
    };
    load();
  }, []);

  const { getLatestMovies } = useGetLatestMovies();
  useEffect(() => {
    const load = async () => {
      const latest = await getLatestMovies();
      setLatest(latest);
    };
    load();
  }, []);

  const { getForYouMovies } = useLoadForYouMovies();
  useEffect(() => {
    const load = async () => {
      const forYou = await getForYouMovies();
      setForYou(forYou);
    };
    load();
  }, []);

  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim().length > 0) navigate(`/movies?q=${search}`);
  };

  return (
    <div>
      <Helmet>
        <title>
          Flickezz | Watch Free Movies Online - Latest Movies and Top Films
        </title>
        <meta
          name="description"
          content="Flickezz offers a wide selection of free movies to watch online, including the latest releases, top-rated films, and classic favorites. Enjoy high-quality movie watching for free."
        />
        <meta
          name="keywords"
          content="watch free movies online, free movie websites, movies online, new movies, top movies, movie watching, best free movie sites, free online movies, latest movies, movie theater movies, avatar 2, top gun maverick, free movie websites, disney plus movies, movie theaters near me, twister movie, megamind the movie, latest movies at theater, romance movies, best movies, movies of all time, korean movies, hindi movies, tamil movies"
        />
        <link rel="canonical" href="https://flickezz.com/" />
        <meta
          property="og:title"
          content="Flickezz | Watch Free Movies Online - Latest Movies and Top Films"
        />
        <meta
          property="og:description"
          content="Watch free movies on Flickezz. Discover new releases, top-rated films, and classic favorites. Enjoy movies online in HD quality for free."
        />
        <meta property="og:image" content="https://flickezz.com/og-image.png" />
        <meta property="og:url" content="https://flickezz.com/" />
        <meta name="author" content="Flickezz" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div
        className="container-fluid bg-1 p-0"
        style={{
          backgroundImage: "url('/bg/bg1.png')",
        }}
      >
        <div className="bg-1-container d-flex flex-column justify-content-center align-items-center">
          <div className="bg-1-container-1">
            <h1 className="title-1">Unlimited movies, Tv Series, and more</h1>
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
          </div>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <h4 className="title-3">Popular Movies</h4>

        <div className="mt-4">
          <Swiper
            slidesPerView={4}
            spaceBetween={15}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 2, // Show 2 slides for small screens
                spaceBetween: 10, // Reduce spacing for smaller screens
              },
              768: {
                slidesPerView: 4, // Show 3 slides for medium screens
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 6, // Show 4 slides for larger screens
                spaceBetween: 15,
              },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {popular.map((movie, index) => (
              <SwiperSlide key={index}>
                <MovieCard
                  title={`${movie.title.slice(0, 16)}${
                    movie.title.length > 16 ? "..." : ""
                  }`}
                  image={movie.largeCoverImage}
                  year={movie.year}
                  runtime={movie.runtime}
                  slug={movie.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <h4 className="title-3">Latest Movies</h4>

        <div className="mt-4">
          <Swiper
            slidesPerView={4}
            spaceBetween={15}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 2, // Show 2 slides for small screens
                spaceBetween: 10, // Reduce spacing for smaller screens
              },
              768: {
                slidesPerView: 4, // Show 3 slides for medium screens
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 6, // Show 4 slides for larger screens
                spaceBetween: 15,
              },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {latest.map((movie, index) => (
              <SwiperSlide key={index}>
                <MovieCard
                  title={`${movie.title.slice(0, 16)}${
                    movie.title.length > 16 ? "..." : ""
                  }`}
                  image={movie.largeCoverImage}
                  year={movie.year}
                  runtime={movie.runtime}
                  slug={movie.slug}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <h4 className="title-3">For You</h4>

        <div className="mt-4 row movie-card-container">
          {forYou.map((movie, index) => (
            <div key={index} className="col-6 col-md-3 col-lg-2 movie-card-box">
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
      </div>
    </div>
  );
};

export default Home;
