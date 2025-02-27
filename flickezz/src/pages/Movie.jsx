import React, { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieCard from "../components/MovieCard";
import useLoadMovieData from "../hooks/useLoadMovieData";
import { useNavigate, useParams } from "react-router-dom";
import useLoadRecommended from "../hooks/useLoadRecommended";

import ReactPlayer from "react-player";
import { BACKEND_URL } from "../api/urls";
import { Helmet } from "react-helmet";
import Banner1 from "../components/Ads/Banner1";
import SocialBar from "../components/Ads/SocialBar";
import Cookies from "js-cookie";
import Banner2 from "../components/Ads/Banner2";
import JSZip from "jszip";

const Movie = () => {
  const params = useParams();

  const [movie, setMovie] = useState(null);
  const { loadMovieData } = useLoadMovieData();

  const [torrents, setTorrents] = useState([]);
  const [activeTorrent, setActiveTorrent] = useState(0);

  const [activeVideo, setActiveVideo] = useState(false);

  const [subtitles, setSubtitles] = useState([]);

  useEffect(() => {
    const load = async () => {
      const movie = await loadMovieData(params.slug);
      setMovie(movie);
      downloadAndExtractSubtitles(movie?.subtitles);
      const torr = [
        ...movie.Torrents.filter(
          (t) =>
            t.quality.toUpperCase() !== "3D" &&
            t.quality.toUpperCase() !== "2160P" &&
            t.quality.toUpperCase() !== "1440P"
        ),
      ];
      setTorrents(torr);
      if (torr.length > 0) {
        setActiveTorrent(torr[0].id);
      }
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

  const [clickedCount, setClickedCount] = useState(0);

  const handleChangeQuality = (quality) => {
    if ((clickedCount + 1) % 2 !== 0) {
      setClickedCount(clickedCount + 1);
      // Open the specified link
      window.open(
        "https://seatedsaintinsist.com/npnbmfpc8v?key=1491e2f7240193af708e384dc88888cd",
        "_blank"
      );
    } else {
      setClickedCount(clickedCount + 1);
      window.scrollTo(0, 0);
      setActiveTorrent(quality);
      setStreamUrl(null);

      setTimeout(() => {
        const videoUrl = `${BACKEND_URL}movies/stream/${activeTorrent}`;
        setStreamUrl(videoUrl);
      }, 100);
    }
  };

  const downloadMovie = async (q) => {
    if ((clickedCount + 1) % 2 !== 0) {
      setClickedCount(clickedCount + 1);
      // Open the specified link
      window.open(
        "https://seatedsaintinsist.com/npnbmfpc8v?key=1491e2f7240193af708e384dc88888cd",
        "_blank"
      );
    } else {
      Cookies.set("download_link", `${BACKEND_URL}movies/download/${q}`, {
        expires: 1 / 24,
      });
      window.open("/pending-download", "_blank");
    }
    // const downloadUrl = `${BACKEND_URL}movies/download/${q}`;
    // // Create a link to trigger the download
    // const a = document.createElement("a");
    // a.href = downloadUrl;
    // a.download = "";
    // document.body.appendChild(a);
    // a.click();
    // document.body.removeChild(a);
  };

  //

  const downloadAndExtractSubtitles = async (subs) => {
    const subtitleFiles = [];
    for (let k = 0; k < subs.length; k++) {
      const sub = subs[k];
      try {
        const url = `https://dl.subdl.com${sub?.url}`; // Replace with your ZIP file URL
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to download file");
        const blob = await response.blob();

        const zip = await JSZip.loadAsync(blob);

        for (const filename of Object.keys(zip.files)) {
          if (filename.endsWith(".srt")) {
            // Check for .srt files
            const fileContent = await zip.files[filename].async("string");
            const vttContent = convertSrtToVtt(fileContent); // Convert to WebVTT
            subtitleFiles.push({
              filename,
              content: vttContent,
              language: sub.lang,
              languageCode: sub.language,
            });
            break;
          }
        }
      } catch (error) {
        console.error("Subtitles error", error);
      }
    }
    setSubtitles(subtitleFiles);
  };

  // Converts .srt to .vtt (basic conversion)
  const convertSrtToVtt = (srt) => {
    const vtt =
      "WEBVTT\n\n" + srt.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2"); // Replace ',' with '.'
    return vtt;
  };

  return (
    <>
      <Helmet>
        <title>
          {movie?.title
            ? `${movie?.title} | Watch ${movie?.title} Online - Flickezz`
            : "Flickezz - Watch Movies Online"}
        </title>

        <meta
          name="description"
          content={
            movie?.title
              ? `Watch "${movie?.title}" online in HD on Flickezz. Enjoy the latest release of "${movie?.title}" with a detailed storyline, cast, and reviews. Watch this movie for free with no subscription required.`
              : "Watch the latest movies online in HD quality for free on Flickezz. Browse movies by genres and enjoy free streaming."
          }
        />
        <meta
          name="keywords"
          content={
            movie?.title
              ? `${movie?.title}, watch ${movie?.title} online, free movie website, latest movies, free HD movies, movies online, best movie sites, movie genres, ${movie?.genres}, watch movies free, top-rated movies`
              : "free movies, latest movies, watch movies online, HD movies, movie streaming, best movie websites, watch movies free"
          }
        />
        <link
          rel="canonical"
          href={`https://flickezz.com/movies/${movie?.slug || ""}`}
        />
        <meta
          property="og:title"
          content={
            movie?.title
              ? `${movie?.title} | Watch ${movie?.title} Online - Flickezz`
              : "Flickezz - Watch Movies Online"
          }
        />
        <meta
          property="og:description"
          content={
            movie?.title
              ? `Watch "${movie?.title}" online in HD quality for free on Flickezz. Enjoy the latest release of "${movie?.title}" with high-quality video, detailed information, and cast details.`
              : "Watch the latest movies online in HD on Flickezz. Browse a wide selection of movies and enjoy free streaming without any subscription."
          }
        />
        <meta
          property="og:image"
          content={
            movie?.largeCoverImage || "https://flickezz.com/og-image.png"
          }
        />
        <meta
          property="og:url"
          content={`https://flickezz.com/movies/${movie?.slug || ""}`}
        />
        <meta name="author" content="Flickezz" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="container">
        <div className="row">
          <div className="col-12 movie-container movie-box-container gap-3">
            <div
              className={`${
                streamUrl ? "video-view-1-active" : "video-view-1"
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
                  style={{ borderRadius: "14px", aspectRatio: 16 / 9 }}
                  onError={handleError} // Listening for errors
                  id="video-player"
                >
                  <source src={streamUrl} type="video/mp4" />
                  {subtitles.map((subtitle, index) => (
                    <track
                      key={index}
                      label={subtitle.language} // Subtitle language or description
                      kind="subtitles"
                      srcLang={subtitle.languageCode} // Language code (e.g., 'en', 'de')
                      src={URL.createObjectURL(
                        new Blob([subtitle.content], { type: "text/vtt" })
                      )} // Create a Blob URL for each subtitle content
                      default={index === 0} // Set the first subtitle as default
                    />
                  ))}
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
                    {/* Render filled stars */}
                    {Array.from({ length: Math.floor(movie?.rating) }).map(
                      (_, index) => (
                        <i
                          key={`full-${index}`}
                          className="bi bi-star-fill theme-color fs-3"
                        ></i>
                      )
                    )}

                    {/* Render empty stars */}
                    {Array.from({ length: 10 - Math.floor(movie?.rating) }).map(
                      (_, index) => (
                        <i
                          key={`empty-${index}`}
                          className="bi bi-star theme-color fs-3"
                        ></i>
                      )
                    )}

                    {/* Display rating text */}
                    <div>
                      <strong className="text-white fs-3 mt-3">
                        {movie?.rating}/10
                      </strong>
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
          <div className="col-12 d-inline-flex gap-3 overflow-x-auto small-overflow">
            {torrents.map(
              (torrent, index) =>
                torrent.quality.toUpperCase() !== "3D" &&
                torrent.quality.toUpperCase() !== "2160P" &&
                torrent.quality.toUpperCase() !== "1440P" && (
                  <button
                    key={index}
                    className={`btn btn-light mb-2 ${
                      torrent.id === activeTorrent &&
                      "bg-theme border-0 text-white"
                    }`}
                    onClick={() => handleChangeQuality(torrent.id)}
                  >
                    {torrent.quality}
                  </button>
                )
            )}
          </div>
        </div>
      </div>

      <Banner1 />

      <SocialBar />

      <div className="container mt-5">
        <h4 className="title-3">Download</h4>
        <div className="row mt-3">
          <div className="col-12 d-inline-flex gap-3 overflow-x-auto small-overflow">
            {torrents.map(
              (torrent, index) =>
                torrent.quality.toUpperCase() !== "3D" &&
                torrent.quality.toUpperCase() !== "2160P" &&
                torrent.quality.toUpperCase() !== "1440P" && (
                  <button
                    key={index}
                    className={`btn btn-success mb-2`}
                    onClick={() => downloadMovie(torrent.id)}
                  >
                    Download {torrent.quality}
                  </button>
                )
            )}
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

      <div className="mb-5">
        <Banner1 />
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
          </div>
        </div>
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
          </div>
        </div>
        <Banner1 />
      </div>
    </>
  );
};

export default Movie;
