import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../components/BlogCard";
import BlogCardX from "../components/BlogCardX";
import Tag from "../components/Tag";

const ViewBlog = () => {
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
          <div className="bg-1-container-1 mt-5 text-start">
            <h1 className="title-1 mt-5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </h1>
            <h5 className="card-title theme-color mt-2">TRAVEL</h5>
            <small className="text-white mt-1">20, April 2023</small>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-9"></div>

          <div className="col-12 col-lg-3"></div>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
