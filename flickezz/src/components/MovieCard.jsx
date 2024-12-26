import React from "react";
import { SwiperSlide } from "swiper/react";

const MovieCard = ({ title, image, year, runtime, slug }) => {
  return (
    <div
      className="card p-0 border-0 shadow-sm bg-dark mb-5"
      style={{ borderRadius: "14px", cursor: "pointer" }}
      onClick={() => {
        window.location.href = `/movies/${slug}`;
      }}
    >
      <img
        src={image}
        alt={`${title} - Watch Online on Flickezz.com | New Movies and Movie Streaming`}
        className="card-img-top"
        style={{
          borderTopLeftRadius: "14px",
          borderTopRightRadius: "14px",
          width: "100%",
          objectFit: "cover",
          aspectRatio: "3/4",
        }}
      />
      <div className="card-body">
        <h6 className="title-4">{title}</h6>
        <div className="card-footer-box">
          <small>{year}</small>
          <small>{runtime} min</small>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
