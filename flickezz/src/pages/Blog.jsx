import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../components/BlogCard";
import BlogCardX from "../components/BlogCardX";
import axios from "axios";
import { BACKEND_URL, BASE_URL } from "../api/urls";
import { formatDate } from "../helpers/DateHelper";

const Blog = () => {
  const [latest, setLatest] = useState([]);
  const [categories, setCategories] = useState([]);
  const [moreBlogs, setMoreBlogs] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}blog/latest/blog`);
        setLatest(data.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}blog/latest/blog/3`);
        setCategories(data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}blog/latest/blog1`);
        setMoreBlogs(data.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row" style={{ marginTop: "80px" }}>
            {latest && latest.length > 0 && latest[0] && (
              <div className="col-12 col-lg-8 blog-bg">
                <img
                  src={`${BASE_URL}${latest[0]?.image}`}
                  className="blog-bg-1-image"
                  alt=""
                />
                <div
                  className="blog-bg-1 p-4 p-lg-4 d-flex flex-column justify-content-end gap-1"
                  onClick={() =>
                    (window.location.href = `/blog/${latest[0]?.slug}`)
                  }
                >
                  <h4
                    className="theme-color fw-bold"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      (window.location.href = `/blogs/search?category=${latest[0]?.Category?.slug}`)
                    }
                  >
                    {latest[0]?.Category?.name}
                  </h4>
                  <span
                    className="fs-4 text-white"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      (window.location.href = `/blog/${latest[0]?.slug}`)
                    }
                  >
                    {latest[0]?.title}
                  </span>
                  <small className="text-white">
                    {formatDate(latest[0]?.createdAt)}
                  </small>
                </div>
              </div>
            )}

            <div className="col-12 col-lg-4 mt-4 mt-lg-0">
              <div className="row gap-0 gap-lg-3">
                {latest && latest.length > 1 && latest[1] && (
                  <div className="col-12 col-md-6 col-lg-12 blog-bg">
                    <img
                      src={`${BASE_URL}${latest[1]?.image}`}
                      className="blog-bg-1-image"
                      alt=""
                    />
                    <div
                      className="blog-bg-1 p-4 p-lg-4 d-flex flex-column justify-content-end gap-1"
                      onClick={() =>
                        (window.location.href = `/blog/${latest[0]?.slug}`)
                      }
                    >
                      <h4
                        className="theme-color fw-bold"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          (window.location.href = `/blogs/search?category=${latest[1]?.Category?.slug}`)
                        }
                      >
                        {latest[1]?.Category?.name}
                      </h4>
                      <span
                        className="fs-4 text-white"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          (window.location.href = `/blog/${latest[1]?.slug}`)
                        }
                      >
                        {latest[1]?.title}
                      </span>
                      <small className="text-white">
                        {formatDate(latest[1]?.createdAt)}
                      </small>
                    </div>
                  </div>
                )}

                {latest && latest.length > 2 && latest[2] && (
                  <div
                    className="col-12 col-md-6 col-lg-12 mt-4 mt-md-0 mt-lg-0 blog-bg"
                    onClick={() =>
                      (window.location.href = `/blog/${latest[0]?.slug}`)
                    }
                  >
                    <img
                      src={`${BASE_URL}${latest[2]?.image}`}
                      className="blog-bg-1-image"
                      alt=""
                    />
                    <div className="blog-bg-1 p-4 p-lg-4 d-flex flex-column justify-content-end gap-1">
                      <h4
                        className="theme-color fw-bold"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          (window.location.href = `/blogs/search?category=${latest[2]?.Category?.slug}`)
                        }
                      >
                        {latest[2]?.Category?.name}
                      </h4>
                      <span
                        className="fs-4 text-white"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          (window.location.href = `/blog/${latest[2]?.slug}`)
                        }
                      >
                        {latest[2]?.title}
                      </span>
                      <small className="text-white">
                        {formatDate(latest[2]?.createdAt)}
                      </small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-9">
              <div className="row mt-5">
                <h4 className="title-3">Recent Posts</h4>

                <div className="col-12 mt-4">
                  <div className="row">
                    {latest?.map(
                      (blog, index) =>
                        index > 2 && (
                          <div
                            key={index}
                            className="col-12 col-md-6 col-lg-4 mb-3"
                          >
                            <BlogCard
                              category={blog?.Category?.name}
                              date={blog?.createdAt}
                              image={blog?.image}
                              title={blog?.title}
                              slug={blog?.slug}
                              categorySlug={blog?.Category?.slug}
                            />
                          </div>
                        )
                    )}
                  </div>
                </div>
              </div>

              {categories?.map((category, index) => (
                <div key={index} className="row mt-5">
                  <h4 className="title-3">{category?.name}</h4>

                  <div className="col-12 mt-4">
                    <Swiper
                      slidesPerView={4}
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
                          slidesPerView: 3, // Show 4 slides for larger screens
                          spaceBetween: 15,
                        },
                      }}
                      modules={[Pagination, Navigation]}
                      className="mySwiper"
                    >
                      {category?.Blogs?.map((blog, index) => (
                        <SwiperSlide key={index} className="pb-5">
                          <BlogCard
                            category={category?.name}
                            date={blog?.createdAt}
                            image={blog?.image}
                            title={blog?.title}
                            slug={blog?.slug}
                            categorySlug={blog?.Category?.slug}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </div>
              ))}

              <div className="row mt-5">
                <div className="col-12 mt-4">
                  <div className="row">
                    {moreBlogs?.map((blog, index) => (
                      <BlogCardX
                        key={index}
                        category={blog?.Category?.name}
                        date={blog?.createdAt}
                        image={blog?.image}
                        title={blog?.title}
                        slug={blog?.slug}
                        categorySlug={blog?.Category?.slug}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="row mt-5 mb-5">
                <div className="col-12 d-flex justify-content-center">
                  <button
                    className="btn btn-themed w-50"
                    onClick={() => (window.location.href = "/blogs/search")}
                  >
                    View More...
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
