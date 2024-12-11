import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../components/BlogCard";
import BlogCardX from "../components/BlogCardX";

const Blog = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row" style={{ marginTop: "80px" }}>
            <div className="col-12 col-lg-8 blog-bg">
              <img
                src="https://neilpatel.com/wp-content/uploads/2017/09/blog-post-image-guide.jpg"
                className="blog-bg-1-image"
                alt=""
              />
              <div className="blog-bg-1 p-4 p-lg-4 d-flex flex-column justify-content-end gap-1">
                <h4 className="theme-color fw-bold">LIFESTYLE</h4>
                <span className="fs-4 text-white">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Deleniti quidem
                </span>
                <small className="text-white">20, April 2023</small>
              </div>
            </div>
            <div className="col-12 col-lg-4 mt-4 mt-lg-0">
              <div className="row gap-0 gap-lg-3">
                <div className="col-12 col-md-6 col-lg-12 blog-bg">
                  <img
                    src="https://neilpatel.com/wp-content/uploads/2017/09/blog-post-image-guide.jpg"
                    className="blog-bg-1-image"
                    alt=""
                  />
                  <div className="blog-bg-1 p-4 p-lg-4 d-flex flex-column justify-content-end gap-1">
                    <h4 className="theme-color fw-bold">LIFESTYLE</h4>
                    <span className="fs-4 text-white">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Deleniti quidem
                    </span>
                    <small className="text-white">20, April 2023</small>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-12 mt-4 mt-md-0 mt-lg-0 blog-bg">
                  <img
                    src="https://neilpatel.com/wp-content/uploads/2017/09/blog-post-image-guide.jpg"
                    className="blog-bg-1-image"
                    alt=""
                  />
                  <div className="blog-bg-1 p-4 p-lg-4 d-flex flex-column justify-content-end gap-1">
                    <h4 className="theme-color fw-bold">LIFESTYLE</h4>
                    <span className="fs-4 text-white">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Deleniti quidem
                    </span>
                    <small className="text-white">20, April 2023</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12 col-lg-9">
              <div className="row mt-5">
                <h4 className="title-3">Recent Posts</h4>

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
                <h4 className="title-3">Life Style</h4>

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
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>

              <div className="row mt-5">
                <h4 className="title-3">Fashion & Travel</h4>

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
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>

              <div className="row mt-5">
                <h4 className="title-3">Foods & Health</h4>

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
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                    <SwiperSlide>
                      <BlogCard />
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>

              <div className="row mt-5">
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

              <div className="row mt-5 mb-5">
                <div className="col-12 d-flex justify-content-center">
                  <button className="btn btn-themed w-50">View More...</button>
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
