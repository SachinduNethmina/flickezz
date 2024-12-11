import React from "react";

const BlogCard = () => {
  return (
    <div className="card border-0 rounded-0 bg-black">
      <img
        src="https://neilpatel.com/wp-content/uploads/2017/09/blog-post-image-guide.jpg"
        className="card-img-top rounded-0"
        alt="..."
      />
      <div className="card-body text-white py-3 px-1">
        <h5 className="card-title theme-color">TRAVEL</h5>
        <h5 className="card-title">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </h5>
        <small className="text-white">20, April 2023</small>
      </div>
    </div>
  );
};

export default BlogCard;
