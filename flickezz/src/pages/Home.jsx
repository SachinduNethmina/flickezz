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

const Home = () => {
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

  return (
    <>
      <div
        className="container-fluid bg-1 p-0"
        style={{
          backgroundImage:
            "url('https://leroux.ca/wtl-content/uploads/2024/01/2023-Watchlist-1200x764.jpg')",
        }}
      >
        <div className="bg-1-container d-flex flex-column justify-content-center align-items-center">
          <div className="bg-1-container-1">
            <h1 className="title-1">Unlimited movies, Tv Series, and more</h1>
            <h5 className="title-2 mt-4">
              Watch your favourite movie online or download
            </h5>
            <div className="d-inline-flex gap-2 mt-4 mt-md-5">
              <input
                type="text"
                className="form-control themed-input-1 px-4"
                placeholder="Search movie or tv series..."
              />
              <button className="btn btn-themed">Search</button>
            </div>
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
    </>
  );
};

export default Home;
