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
            <Link to={"/"} style={{ cursor: "pointer" }}>
              <img
                src="/logo.png"
                alt="Flickezz - Best Free Movies Online and Latest Movie Releases"
                className="logo-header-sm"
              />
            </Link>
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
                  <Link to="/">Home</Link>
                  <Link to="/movies">Movies</Link>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 mt-4 mt-md-5">
                <h5>Genres</h5>
                <div className="mt-3 d-flex flex-column gap-2">
                  <Link to="/movies">Action</Link>
                  <Link to="/movies">Advanture</Link>
                  <Link to="/movies">Animation</Link>
                  <Link to="/movies">Sci-fi</Link>
                  <Link to="/movies">Comedy</Link>
                  <Link to="/movies">Crime</Link>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 mt-4 mt-md-5">
                <h5>About</h5>
                <div className="mt-3 d-flex flex-column gap-2">
                  <Link to="/about">About Us</Link>
                  <Link to="/contact">Contact</Link>
                  <Link>Faq</Link>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 mt-4 mt-md-5">
                <h5>Join with us</h5>
                <div className="mt-3 d-flex flex-column gap-2">
                  <Link onClick={() => toggleSignInModal(false)}>Login</Link>
                  <Link onClick={() => toggleSignInModal(true)}>Register</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 mt-4 d-inline-flex gap-5 align-items-center">
            <small className="copyright">&copy; 2024 Flickezz</small>
            <small className="copyright">
              <Link to="/privacy-policies">
                <small>Privacy policies</small>
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
