import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../components/BlogCard";
import BlogCardX from "../components/BlogCardX";
import Tag from "../components/Tag";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../api/urls";
import { Helmet } from "react-helmet";
import Banner1 from "../components/Ads/Banner1";
import SocialBar from "../components/Ads/SocialBar";
import Banner2 from "../components/Ads/Banner2";

const BlogCategory = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const search = queryParams.get("q");

  const [activeCategory, setActiveCategory] = useState("");
  const [blogs, setBlogs] = useState([]);

  const load = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}blog/latest/blog/search?category=${category}&search=${search}&offset=${blogs.length}`
      );
      setBlogs([...blogs, ...data.blogs]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    load();
  }, [category, search]);

  const [searchTxt, setSearchTxt] = useState("");

  return (
    <>
      <Helmet>
        <title>
          Search Flickezz Blog - Find Beauty, Style, Tech & Lifestyle Ideas
        </title>
        <meta
          name="description"
          content="Search through the Flickezz Blog for the best in Beauty, Style, Tech, Home, and Lifestyle. Quickly find expert tips, trending news, and creative ideas tailored to your interests."
        />
        <meta
          name="keywords"
          content="Flickezz Blog search, Beauty tips, Style trends, Tech news, Home decor, Lifestyle inspiration, Fashion advice, Technology updates, Wellness, DIY ideas"
        />
        <link rel="canonical" href="https://flickezz.com/blogs/search" />
        <meta
          property="og:title"
          content="Search Flickezz Blog - Explore Beauty, Style, Tech & Lifestyle Topics"
        />
        <meta
          property="og:description"
          content="Search the Flickezz Blog for beauty, tech, home, and lifestyle tips. Discover trending topics and expert advice tailored to your needs."
        />
        <meta property="og:image" content="https://flickezz.com/og-image.png" />
        <meta property="og:url" content="https://flickezz.com/blogs/search" />
        <meta name="author" content="Flickezz" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div
        className="container-fluid bg-2 p-0"
        style={{
          backgroundImage:
            "url('https://leroux.ca/wtl-content/uploads/2024/01/2023-Watchlist-1200x764.jpg')",
        }}
      >
        <div className="bg-1-container d-flex flex-column justify-content-center align-items-center">
          <div className="bg-1-container-1 mt-5">
            <h1 className="title-1 mt-5">{category || search || "Search"}</h1>
            <div className="d-inline-flex gap-2 mt-4 mt-md-5">
              <input
                type="text"
                className="form-control themed-input-1 px-4"
                placeholder="Search posts..."
                value={searchTxt || search || searchTxt}
                onChange={(e) => setSearchTxt(e.target.value)}
              />
              <button
                className="btn btn-themed"
                onClick={() => {
                  window.location.href = `/blogs/search?q=${searchTxt}`;
                }}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <Banner1 />

      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-9">
            <div className="row mt-5">
              <h4 className="title-3">All Posts</h4>

              <div className="col-12 mt-4">
                <div className="row">
                  {blogs?.map((blog, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
                      <BlogCard
                        category={blog?.Category?.name}
                        date={blog?.createdAt}
                        image={blog?.image}
                        title={blog?.title}
                        slug={blog?.slug}
                        categorySlug={blog?.Category?.slug}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="row mt-5 mb-5">
              <div className="col-12 d-flex justify-content-center">
                <button className="btn btn-light w-50" onClick={load}>
                  Load More...
                </button>
              </div>
            </div>

            <Banner1 />
            <SocialBar />
            <Banner1 />
          </div>

          <div className="col-12 col-lg-3">
            <Banner2 />
            <Banner2 />
            <Banner2 />
            <Banner2 />
            <Banner2 />
            <Banner2 />
            <Banner2 />
            <Banner2 />
            <Banner2 />
            <Banner2 />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCategory;
