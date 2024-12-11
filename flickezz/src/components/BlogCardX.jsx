import React from "react";

const BlogCardX = () => {
  return (
    <div className="col-12 col-lg-6 d-inline-flex align-items-center gap-3 text-white mb-3">
      <div>
        <img
          src="https://neilpatel.com/wp-content/uploads/2017/09/blog-post-image-guide.jpg"
          className="card-x-img"
          alt=""
        />
      </div>

      <div className="d-flex flex-column gap-3">
        <h5 className="card-title theme-color">TRAVEL</h5>
        <h5 className="card-title">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </h5>
        <small className="text-white">20, April 2023</small>
      </div>
    </div>
  );
};

export default BlogCardX;
