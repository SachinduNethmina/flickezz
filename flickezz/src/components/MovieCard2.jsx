import React from "react";
import { SwiperSlide } from "swiper/react";

const MovieCard2 = () => {
  return (
    <div
      className="card p-0 border-0 shadow-sm bg-dark mb-5"
      style={{ borderRadius: "14px" }}
    >
      <div
        className="card-img-box-2"
        style={{
          backgroundImage:
            "url('https://ridomovies.tv/uploads/posters/webp/alien-romulus.webp')",
        }}
      ></div>
      <div className="card-body-2 p-3 d-flex flex-column">
        <h4 className="title-4">Alien Romulus</h4>
        <div className="card-footer-box w-25">
          <small>2024</small>
          <small>206 min</small>
        </div>
        <div>
          <button className="btn btn-light mt-3">Watch Now</button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard2;
