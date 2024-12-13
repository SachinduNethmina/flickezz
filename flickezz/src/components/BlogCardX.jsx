import React from "react";
import { formatDate } from "../helpers/DateHelper";
import { BASE_URL } from "../api/urls";

const BlogCardX = ({ image, category, title, date, slug, categorySlug }) => {
  return (
    <div className="col-12 col-lg-6 d-inline-flex align-items-center gap-3 text-white mb-3">
      <div>
        <img
          src={`${BASE_URL}${image}`}
          className="card-x-img"
          alt=""
          onClick={() => (window.location.href = `/blog/${slug}`)}
        />
      </div>

      <div className="d-flex flex-column gap-3">
        <h5
          className="card-title theme-color"
          style={{ cursor: "pointer" }}
          onClick={() =>
            (window.location.href = `/blogs/search?category=${categorySlug}`)
          }
        >
          {category}
        </h5>
        <h5
          className="card-title"
          style={{ cursor: "pointer" }}
          onClick={() => (window.location.href = `/blog/${slug}`)}
        >
          {title?.length > 50 ? `${title?.slice(0, 50)}...` : title}
        </h5>
        <small className="text-white">{formatDate(date)}</small>
      </div>
    </div>
  );
};

export default BlogCardX;
