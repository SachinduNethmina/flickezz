import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../components/BlogCard";
import BlogCardX from "../components/BlogCardX";
import Tag from "../components/Tag";

const BlogCategory = () => {
  const [categories, setCategories] = useState([
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
  const [activeCategory, setActiveCategory] = useState("");
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
            <h1 className="title-1 mt-5">Categories</h1>
            <form className="d-inline-flex gap-2 mt-4 mt-md-5">
              <input
                type="text"
                className="form-control themed-input-1 px-4"
                placeholder="Search movies..."
              />
              <button className="btn btn-themed" type="submit">
                Search
              </button>
            </form>
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
                {categories.map((category, index) => (
                  <SwiperSlide key={index}>
                    <Tag
                      text={category.name}
                      onClick={() => {
                        activeCategory === category.name
                          ? setActiveCategory("")
                          : setActiveCategory(category.name);
                      }}
                      active={activeCategory === category.name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-9">
            <div className="row mt-5">
              <h4 className="title-3">All Posts</h4>

              <div className="col-12 mt-4">
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>

                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>

                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>

                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>

                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>

                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>

                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>

                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>

                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>

                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>

                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>

                  <div className="col-12 col-md-6 col-lg-4 mb-3">
                    <BlogCard />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-12 d-flex justify-content-center">
                <button className="btn btn-light w-50">Load More...</button>
              </div>
            </div>

            <div className="row mt-5 mb-5">
              <h4 className="title-3">Recommended</h4>
              <div className="col-12 mt-4">
                <div className="row">
                  <BlogCardX />
                  <BlogCardX />
                  <BlogCardX />
                  <BlogCardX />
                  <BlogCardX />
                  <BlogCardX />
                  <BlogCardX />
                  <BlogCardX />
                  <BlogCardX />
                  <BlogCardX />
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-3"></div>
        </div>
      </div>
    </>
  );
};

export default BlogCategory;
