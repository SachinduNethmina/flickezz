import React from "react";
import "../styles/About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-us container text-white">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-12 mt-5">
          <img
            src="https://leroux.ca/wtl-content/uploads/2024/01/2023-Watchlist-1200x764.jpg"
            alt="About Flickezz"
            className="img-fluid rounded about-us-image w-100"
          />
        </div>
        <div className="col-lg-6 col-md-12 mt-5">
          <h1 className="about-us-title">Welcome to Flickezz</h1>
          <p className="about-us-text">
            At <span className="highlight">Flickezz</span>, we bring the world
            of cinema right to your screen. From timeless classics to the latest
            blockbusters, Flickezz is your one-stop destination for discovering
            and streaming movies from every genre and era. Whether you’re a fan
            of drama, action, romance, or documentaries, we have it all for you.
          </p>
          <p className="about-us-text">
            Our mission is to create a seamless and enjoyable experience for
            movie enthusiasts. With an extensive library that covers movies from
            around the globe, we ensure you never run out of options to explore.
            Flickezz is more than just a website—it’s a community of movie
            lovers.
          </p>
          <div className="mt-4">
            <Link to={"/contact"} className="btn btn-light mt-3 d-flex justify-content-center align-items-center w-25">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-12 text-center mb-5">
          <h2 className="about-us-subtitle">Why Choose Flickezz?</h2>
        </div>
        <div className="col-md-4 text-center">
          <i className="fas fa-film about-us-icon"></i>
          <h5 className="about-us-feature mt-3">Extensive Movie Library</h5>
          <p className="about-txt">
            Thousands of movies, from Hollywood hits to international gems.
          </p>
        </div>
        <div className="col-md-4 text-center">
          <i className="fas fa-tv about-us-icon"></i>
          <h5 className="about-us-feature mt-3">High-Quality Streaming</h5>
          <p className="about-txt">
            Enjoy movies in HD and 4K with seamless playback.
          </p>
        </div>
        <div className="col-md-4 text-center">
          <i className="fas fa-users about-us-icon"></i>
          <h5 className="about-us-feature mt-3">Community of Cinephiles</h5>
          <p className="about-txt">
            Connect with movie lovers and share your passion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
