import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/MovieCard";
import useLoadMovieData from "../hooks/useLoadMovieData";
import { useParams } from "react-router-dom";
import useLoadRecommended from "../hooks/useLoadRecommended";

import ReactPlayer from "react-player";
import { BACKEND_URL } from "../api/urls";

const Movie = () => {
  const params = useParams();

  const [movie, setMovie] = useState(null);
  const { loadMovieData } = useLoadMovieData();

  const [torrents, setTorrents] = useState([]);
  const [activeTorrent, setActiveTorrent] = useState(0);

  const [activeVideo, setActiveVideo] = useState(false);

  useEffect(() => {
    const load = async () => {
      const movie = await loadMovieData(params.slug);
      setMovie(movie);
      setTorrents(movie.Torrents);
      setActiveTorrent(movie.Torrents[0].id);
    };
    load();
  }, [params]);

  const [recommended, setRecommended] = useState([]);
  const { loadRecommended } = useLoadRecommended();

  useEffect(() => {
    const load = async () => {
      const data = await loadRecommended(movie.genres);
      setRecommended(data);
    };
    if (movie) {
      load();
    }
    setStreamUrl(null);
  }, [movie]);

  const videoRef = useRef(null);

  const handleError = () => {
    console.error("Video failed to load or is unplayable.");
    alert("Video playing error. please try again later");
    setStreamUrl(null);
  };

  const [streamUrl, setStreamUrl] = useState(null);

  const handleChangeQuality = (quality) => {
    window.scrollTo(0, 0);
    setActiveTorrent(quality);
    setStreamUrl(null);

    setTimeout(() => {
      const videoUrl = `${BACKEND_URL}movies/stream/${activeTorrent}`;
      setStreamUrl(videoUrl);
    }, 100);
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 movie-container movie-box-container gap-3">
            <div
              className={`${
                activeVideo ? "video-view-1-active" : "video-view-1"
              }`}
              style={{
                backgroundImage:
                  !streamUrl && `url('${movie?.backgroundImage}')`,
              }}
            >
              {!streamUrl ? (
                <div className="play-view">
                  <button
                    className="btn btn-light btn-play-1"
                    onClick={() => handleChangeQuality(activeTorrent)}
                  >
                    <i
                      className="bi bi-play-fill"
                      style={{
                        color: "white",
                        fontSize: "50px",
                      }}
                    ></i>
                  </button>
                </div>
              ) : (
                <video
                  width="100%"
                  height="auto"
                  controls
                  controlsList="nodownload"
                  style={{ borderRadius: "14px" }}
                  onError={handleError} // Listening for errors
                >
                  <source src={streamUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <div
              className="movie-box-right bg-dark py-4 px-4 px-md-4 gap-5"
              style={{ borderRadius: "14px" }}
            >
              <div>
                <div
                  className="card-img-box card-img-box-3"
                  style={{
                    backgroundImage: `url('${movie?.largeCoverImage}')`,
                  }}
                ></div>
              </div>

              <div className="movie-box-description">
                <div className="d-flex flex-column gap-2">
                  <h2 className="txt1">
                    {movie?.title}{" "}
                    <span className="txt1 span1">({movie?.year})</span>{" "}
                  </h2>
                  <div className="d-inline-flex align-items-end gap-5">
                    <div className="d-inline-flex align-items-end gap-2">
                      <div className="text-white border border-2 border-white px-1 py-2">
                        <strong>IMDB</strong>
                      </div>
                      <h5 className="text-white fw-bold">{movie?.rating}</h5>
                    </div>
                    <h6 className="text-white-gray">
                      Duration: {movie?.runtime}min
                    </h6>
                    <h6 className="text-white-gray">
                      Language: {movie?.language}
                    </h6>
                  </div>
                  <div className="mt-3">
                    <h6 className="text-white-gray">Genres: {movie?.genres}</h6>
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
                      {movie?.summary.slice(0, 500)}
                      {movie?.summary.length > 500 ? "..." : ""}
                    </p>
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
            {torrents.map((torrent, index) => (
              <button
                key={index}
                className={`btn btn-light ${
                  torrent.id === activeTorrent && "bg-theme border-0 text-white"
                }`}
                onClick={() => handleChangeQuality(torrent.id)}
              >
                {torrent.quality}
              </button>
            ))}
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
            {recommended.map((movie, index) => (
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
    </>
  );
};

export default Movie;
