import React from "react";
import { formatDate } from "../helpers/DateHelper";
import { BASE_URL } from "../api/urls";

const BlogCard = ({ image, category, title, date, slug, categorySlug }) => {
  return (
    <div className="card border-0 rounded-0 bg-black">
      <img
        src={`${BASE_URL}${image}`}
        className="card-img-top rounded-0"
        alt="..."
        style={{ cursor: "pointer" }}
        onClick={() => (window.location.href = `/blog/${slug}`)}
      />
      <div className="card-body text-white py-3 px-1">
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

export default BlogCard;
