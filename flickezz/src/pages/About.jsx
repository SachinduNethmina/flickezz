import React from "react";
import "../styles/About.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>
          About Us | Flickezz - The Best Platform to Watch Free Movies Online
        </title>
        <meta
          name="description"
          content="Discover Flickezz, the best platform where you can watch top-rated films, the latest movie releases, and classic favorites online in high-definition quality for free."
        />
        <meta
          name="keywords"
          content="about Flickezz, watch free movies online, best free movie site, movie website, top-rated films, latest movie releases, free HD movies, movie lovers, movie platform, free movies online"
        />
        <link rel="canonical" href="https://flickezz.com/about-us" />
        <meta
          property="og:title"
          content="About Us | Flickezz - The Best Platform to Watch Free Movies Online"
        />
        <meta
          property="og:description"
          content="Learn more about Flickezz, a platform offering the latest movie releases, top-rated films, and classic favorites in HD quality for free. Join us today!"
        />
        <meta property="og:image" content="https://flickezz.com/og-image.png" />
        <meta property="og:url" content="https://flickezz.com/about-us" />
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
            <h1 className="title-1 mt-5">About Us</h1>
          </div>
        </div>
      </div>
      <div className="about-us container text-white">
        <div className="row align-items-center">
          <div className="col-lg-8 col-md-12 mt-5">
            <h1 className="about-us-title">Welcome to Flickezz</h1>
            <p className="about-us-text">
              Flickezz is your ultimate destination for free streaming of
              movies, TV shows, and a variety of entertainment content. Our
              platform offers an extensive library of high-quality videos,
              allowing users to enjoy a seamless viewing experience without the
              need for subscriptions or sign-ups. Whether you're a fan of the
              latest blockbusters or classic series, Flickezz provides a
              convenient and accessible way to stream your favorites at no cost,
              anytime and anywhere.
            </p>
            <p className="about-us-text">
              At Flickezz, we believe in making entertainment accessible to
              everyone. Our mission is to provide users with a user-friendly
              platform to explore and enjoy movies and TV shows without
              barriers. We are committed to offering a diverse range of content
              in various genres, ensuring there's something for everyone. With a
              focus on simplicity and ease of use, Flickezz is your go-to source
              for endless hours of free entertainment, all at the click of a
              button.
            </p>
            <div className="mt-4">
              <Link
                to={"/contact"}
                className="btn btn-light mt-3 d-flex justify-content-center align-items-center w-25"
              >
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
    </>
  );
};

export default About;
