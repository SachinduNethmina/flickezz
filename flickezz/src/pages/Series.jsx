import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/MovieCard";

const Series = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 movie-container movie-box-container gap-3">
            <div
              className="video-view-1"
              style={{
                backgroundImage:
                  "url('https://w0.peakpx.com/wallpaper/375/846/HD-wallpaper-movies-superhero-spider-man-the-amazing-spider-man-midnight-screenshot-computer-fictional-character-album-cover-rare-gallery-amazing-spiderman.jpg')",
              }}
            >
              <div className="play-view">
                <button className="btn btn-light btn-play-1">
                  <i
                    className="bi bi-play-fill"
                    style={{
                      color: "white",
                      fontSize: "50px",
                    }}
                  ></i>
                </button>
              </div>
            </div>

            <div
              className="movie-box-right bg-dark py-4 px-4 px-md-4 gap-5"
              style={{ borderRadius: "14px" }}
            >
              <div>
                <div
                  className="card-img-box card-img-box-3"
                  style={{
                    backgroundImage:
                      "url('https://ridomovies.tv/uploads/posters/webp/alien-romulus.webp')",
                  }}
                ></div>
              </div>

              <div className="movie-box-description">
                <div className="d-flex flex-column gap-2">
                  <h2 className="txt1">
                    Alien Romulus <span className="txt1 span1">(2024)</span>{" "}
                  </h2>
                  <div className="d-inline-flex align-items-end gap-5">
                    <div className="d-inline-flex align-items-end gap-2">
                      <div className="text-white border border-2 border-white px-1 py-2">
                        <strong>IMDB</strong>
                      </div>
                      <h5 className="text-white fw-bold">6.1</h5>
                    </div>
                    <h6 className="text-white-gray">Duration: 1h 50min</h6>
                    <h6 className="text-white-gray">
                      Country: United Status Of America
                    </h6>
                  </div>
                  <div className="mt-3">
                    <h6 className="text-white-gray">
                      Genres: Action, Comedy, Horror
                    </h6>
                  </div>
                  <div className="mt-3">
                    <h6 className="text-white-gray">
                      Director: Juan Carlos Fresnadillo
                    </h6>
                  </div>
                  <div className="d-inline-flex gap-2 align-items-end">
                    <i className="bi bi-star-fill theme-color fs-3"></i>
                    <i className="bi bi-star-fill theme-color fs-3"></i>
                    <i className="bi bi-star-fill theme-color fs-3"></i>
                    <i className="bi bi-star-fill theme-color fs-3"></i>
                    <i className="bi bi-star-fill theme-color fs-3"></i>
                    <i className="bi bi-star theme-color fs-3"></i>
                    <i className="bi bi-star theme-color fs-3"></i>
                    <i className="bi bi-star theme-color fs-3"></i>
                    <i className="bi bi-star theme-color fs-3"></i>
                    <i className="bi bi-star theme-color fs-3"></i>
                    <div>
                      <strong className="text-white fs-3 mt-3">8.1/10</strong>
                    </div>
                  </div>
                  <div>
                    <p className="text-white">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Expedita exercitationem pariatur quas laboriosam quae.
                      Ratione enim totam aliquam soluta officiis aliquid ut
                      laborum saepe est quia, debitis magnam, nihil eius?
                    </p>
                  </div>
                  <div className="mt-3">
                    <h6 className="text-white-gray">
                      Cast: Juan Carlos Fresnadillo, Juan Carlos Fresnadillo,
                      Juan Carlos Fresnadillo
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h4 className="title-3">Quality</h4>
        <div className="row mt-3">
          <div className="col-12 d-inline-flex gap-3">
            <button className="btn btn-light bg-theme border-0 text-white">
              720P
            </button>
            <button className="btn btn-light">1080P</button>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h4 className="title-3">Episodes</h4>
        <div className="row mt-3">
          <div className="col-12 d-inline-flex gap-3 flex-wrap">
            <button className="btn btn-light bg-theme border-0 text-white">
              Episode 01
            </button>
            <button className="btn btn-light">Episode 2</button>
            <button className="btn btn-light">Episode 3</button>
            <button className="btn btn-light">Episode 4</button>
            <button className="btn btn-light">Episode 5</button>
            <button className="btn btn-light">Episode 6</button>
            <button className="btn btn-light">Episode 7</button>
            <button className="btn btn-light">Episode 8</button>
            <button className="btn btn-light">Episode 9</button>
            <button className="btn btn-light">Episode 10</button>
            <button className="btn btn-light">Episode 2</button>
            <button className="btn btn-light">Episode 3</button>
            <button className="btn btn-light">Episode 4</button>
            <button className="btn btn-light">Episode 5</button>
            <button className="btn btn-light">Episode 6</button>
            <button className="btn btn-light">Episode 7</button>
            <button className="btn btn-light">Episode 8</button>
            <button className="btn btn-light">Episode 9</button>
            <button className="btn btn-light">Episode 10</button>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <h4 className="title-3">Recommended</h4>

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
            <SwiperSlide>
              <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard />
            </SwiperSlide>
            <SwiperSlide>
              <MovieCard />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Series;
