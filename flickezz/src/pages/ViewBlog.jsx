import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../components/BlogCard";
import BlogCardX from "../components/BlogCardX";
import Tag from "../components/Tag";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL, BASE_URL, MEDIA_URL } from "../api/urls";
import { formatDate } from "../helpers/DateHelper";
import useSubmitComment from "../hooks/useSubmitComment";
import { Helmet } from "react-helmet";

const ViewBlog = () => {
  const { slug } = useParams();

  const [blog, setBlog] = useState({});

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}blog/${slug}`);
        setBlog(data.blog);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, [loaded]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });

  const handleChangeData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { addComment } = useSubmitComment();
  const handleSubmit = async () => {
    const status = await addComment(formData, blog?.id);
    if (status) {
      setFormData({
        name: "",
        email: "",
        description: "",
      });
      setLoaded(!loaded);
    }
  };

  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}blog/recommended-cid/${blog?.categoryId}?id=${blog?.id}`
        );
        setRecommended(data.blogs);
      } catch (error) {
        console.log(error);
      }
    };
    load();
  }, [blog]);

  return (
    <>
      <Helmet>
        <title>
          {`Flickezz Blog - Read ${blog?.title} on Beauty, Style, Tech & More`}
        </title>
        <meta
          name="description"
          content={`Dive into ${blog?.title} on Flickezz Blog. Explore engaging content on Beauty, Style, Tech, Home, and Lifestyle to inspire and enrich your everyday life.`}
        />
        <meta
          name="keywords"
          content={`${blog?.title}, Flickezz Blog, Beauty tips, Style trends, Tech insights, Home decor, Lifestyle advice, Fashion, Wellness, Creative living, ${blog?.keywords}`}
        />
        <link rel="canonical" href={`https://flickezz.com/blog/${slug}`} />
        <meta
          property="og:title"
          content={`Flickezz Blog - ${blog?.title} | Beauty, Style, Tech & Lifestyle`}
        />
        <meta
          property="og:description"
          content={`Read ${blog?.title} on Flickezz Blog. ${blog?.metaDescription}`}
        />
        <meta property="og:image" content="https://flickezz.com/og-image.png" />
        <meta property="og:url" content={`https://flickezz.com/blog/${slug}`} />
        <meta name="author" content="Flickezz" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div
        className="container-fluid bg-2 p-0"
        style={{
          backgroundImage: `url(${BASE_URL}${blog?.image})`,
        }}
      >
        <div className="bg-1-container d-flex flex-column justify-content-center align-items-center">
          <div className="bg-1-container-1 mt-5 text-start">
            <h1 className="title-1 mt-5">{blog?.title}</h1>
            <h5 className="card-title theme-color mt-3">
              {blog?.Category?.name}
            </h5>
            <small className="text-white mt-1">
              {formatDate(blog?.createdAt)}
            </small>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-12 d-flex flex-column col-lg-9 text-white">
            <div
              className="blog-artical-div"
              dangerouslySetInnerHTML={{ __html: blog?.description }}
            ></div>

            {blog?.BlogContents?.map((content, index) => (
              <div key={index} className="col-12 d-flex flex-column mt-3">
                {content?.title && <h2>{content?.title}</h2>}
                {content?.image && (
                  <div>
                    <img
                      src={`${BASE_URL}${content?.image}`}
                      alt=""
                      className="mt-3 img-blog-bg"
                    />
                  </div>
                )}

                <div
                  className="mt-3 blog-artical-div"
                  dangerouslySetInnerHTML={{ __html: content?.description }}
                ></div>
              </div>
            ))}

            <div className="row mt-4">
              <h4 className="title-3">Comments</h4>
              <div className="col-12 mt-4">
                <div className="row">
                  {blog?.Comments?.length === 0 && (
                    <p className="text-primary">No comments yet...</p>
                  )}
                  {blog?.Comments?.map((comment, index) => (
                    <div
                      key={index}
                      className="col-12 d-inline-flex gap-2 mt-2"
                    >
                      <div>
                        <img
                          src={`https://avatar.iran.liara.run/username?username=${comment?.name}`}
                          alt=""
                          className="profile-img-b"
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <span>{comment?.name}</span>

                        <small className="mt-1">{comment?.description}</small>

                        <small className="mt-1 text-primary">
                          {formatDate(comment?.createdAt)}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="row mt-4">
                  <h5 className="title-3">Add Your Comment</h5>
                </div>
                <div className="row">
                  <div className="col-12 col-lg-6">
                    <div className="row">
                      <div className="col-12 col-lg-6 mt-2">
                        <label htmlFor="" className="form-label">
                          Your name
                        </label>
                        <input
                          type="text"
                          className="form-control h-45 bg-dark text-white inpp-1"
                          placeholder="Enter name.."
                          value={formData.name}
                          name="name"
                          onChange={handleChangeData}
                        />
                      </div>
                      <div className="col-12 col-lg-6 mt-2">
                        <label htmlFor="" className="form-label">
                          Your email
                        </label>
                        <input
                          type="text"
                          className="form-control h-45 bg-dark text-white inpp-1"
                          placeholder="Enter email.."
                          value={formData.email}
                          name="email"
                          onChange={handleChangeData}
                        />
                      </div>
                      <div className="col-12 mt-2">
                        <label htmlFor="" className="form-label">
                          Comment
                        </label>
                        <textarea
                          value={formData.description}
                          name="description"
                          onChange={handleChangeData}
                          className="form-control bg-dark text-white inpp-1"
                          placeholder="Enter comment.."
                          id=""
                          rows={5}
                        ></textarea>
                      </div>
                      <div className="col-12 mt-3 d-flex justify-content-end">
                        <button
                          className="btn btn-themed rounded-2"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-4 mb-5">
              <h4 className="title-3">More Posts</h4>
              <div className="col-12 mt-4">
                <div className="row">
                  {recommended.map((blog, index) => (
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
          </div>

          <div className="col-12 col-lg-3"></div>
        </div>
      </div>
    </>
  );
};

export default ViewBlog;
