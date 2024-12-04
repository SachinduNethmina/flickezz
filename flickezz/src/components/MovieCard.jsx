import React from "react";
import { useNavigate } from "react-router-dom";
import { SwiperSlide } from "swiper/react";

const MovieCard = ({ title, image, year, runtime, slug }) => {
  const navigate = useNavigate();
  return (
    <div
      className="card p-0 border-0 shadow-sm bg-dark mb-5"
      style={{ borderRadius: "14px", cursor: "pointer" }}
      onClick={() => navigate(`/movies/${slug}`)}
    >
      <div
        className="card-img-box"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      ></div>
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
