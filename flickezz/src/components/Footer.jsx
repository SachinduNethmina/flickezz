import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Footer = () => {
  const { toggleSignInModal } = useAuthContext();
  return (
    <div className="bg-dark container-fluid footer p-3 p-md-5">
      <div className="col-12 col-lg-10 offset-0 offset-lg-1">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-5">
            <a href={"/"} style={{ cursor: "pointer" }}>
              <img
                src="/logo.png"
                alt="Flickezz - Best Free Movies Online and Latest Movie Releases"
                className="logo-header-sm"
              />
            </a>
            <p className="mt-3">
              Flickezz is your go-to platform for Watch the latest movies online
              for free. Watch in HD quality without any subscription required.
              Enjoy a wide variety of genres and discover top-rated films!
            </p>

            <p>
              Discover the best in entertainment with Flickezz. Stream your
              favorite movies, TV series, and more for free in high-quality. No
              sign-ups, no hassle—just endless entertainment at your fingertips!
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-7">
            <div className="row">
              <div className="col-6 col-md-4 col-lg-3 mt-4 mt-md-5">
                <h5>Quick Links</h5>
                <div className="mt-3 d-flex flex-column gap-2">
                  <a href="/">Home</a>
                  <a href="/movies">Movies</a>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 mt-4 mt-md-5">
                <h5>Genres</h5>
                <div className="mt-3 d-flex flex-column gap-2">
                  <a href="/movies">Action</a>
                  <a href="/movies">Advanture</a>
                  <a href="/movies">Animation</a>
                  <a href="/movies">Sci-fi</a>
                  <a href="/movies">Comedy</a>
                  <a href="/movies">Crime</a>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 mt-4 mt-md-5">
                <h5>About</h5>
                <div className="mt-3 d-flex flex-column gap-2">
                  <a href="/about">About Us</a>
                  <a href="/contact">Contact</a>
                  <a>Faq</a>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 mt-4 mt-md-5">
                <h5>Join with us</h5>
                <div className="mt-3 d-flex flex-column gap-2">
                  <a onClick={() => toggleSignInModal(false)}>Login</a>
                  <a onClick={() => toggleSignInModal(true)}>Register</a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4 d-inline-flex gap-5 align-items-center">
            <small className="copyright">&copy; 2024 Flickezz</small>
            <small className="copyright">
              <a href="/privacy-policies">
                <small>Privacy policies</small>
              </a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
