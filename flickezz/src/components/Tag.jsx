import React from "react";

const Tag = ({ text, active = false, onClick }) => {
  return (
    <div
      className={`card p-0 border-0 shadow-sm ${
        !active ? "bg-dark" : "bg-theme"
      } mb-5`}
      style={{
        borderRadius: "50px",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <div className="card-body d-flex justify-content-center align-items-center">
        <span className="title-5">
          {text.slice(0, 7)}
          {text.length > 7 && ".."}
        </span>
      </div>
    </div>
  );
};

export default Tag;
