import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/MovieCard";
import MovieCard2 from "../components/MovieCard2";
import Tag from "../components/Tag";

const Discover = () => {
  const [activeGenre, setActiveGenre] = useState(0);
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
            <h1 className="title-1 mt-5">Discover</h1>
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
                      onClick={() => setActiveGenre(genre.id)}
                      active={activeGenre === genre.id}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-3 px-md-5 mt-5 mb-5">
        <h4 className="title-3">Highlights</h4>

        <div className="mt-4">
          <Swiper
            slidesPerView={2}
            spaceBetween={15}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              0: {
                slidesPerView: 1, // Show 2 slides for small screens
                spaceBetween: 10, // Reduce spacing for smaller screens
              },
              768: {
                slidesPerView: 2, // Show 3 slides for medium screens
                spaceBetween: 15,
              },
              1024: {
                slidesPerView: 2, // Show 4 slides for larger screens
                spaceBetween: 15,
              },
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              <MovieCard2 />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard2 />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard2 />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard2 />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard2 />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <h4 className="title-3">Popular Movies</h4>

        <div className="mt-4 row movie-card-container">
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
        </div>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-dark w-50"><i className="bi bi-plus-lg text-white"></i> Load more..</button>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <h4 className="title-3">Popular Tv Series</h4>

        <div className="mt-4 row movie-card-container">
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
          <div className="col-6 col-md-3 col-lg-2 movie-card-box">
            <MovieCard />
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <button className="btn btn-dark w-50"><i className="bi bi-plus-lg text-white"></i> Load more..</button>
        </div>
      </div>
    </>
  );
};

export default Discover;
