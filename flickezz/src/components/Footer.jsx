import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark container-fluid footer p-3 p-md-5">
      <div className="col-12 col-lg-10 offset-0 offset-lg-1">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-5">
            <img
              src="/logo.png"
              alt=""
              className="logo-header-sm"
            />
            <p className="mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est,
              magni eligendi porro qui minima autem, quo veniam exercitationem
              iste soluta sunt impedit sed ipsa? Nam, sequi delectus! Qui,
              libero ipsa!
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              corrupti ipsam consequuntur odit dolor nemo natus
            </p>
          </div>
          <div className="col-12 col-md-6 col-lg-7">
            <div className="row">
              <div className="col-6 col-md-4 col-lg-3 mt-4 mt-md-5">
                <h5>Categories</h5>
                <div className="mt-3 d-flex flex-column gap-2">
                  <a href="">Movies</a>
                  <a href="">Tv Series</a>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 mt-4 mt-md-5">
                <h5>Discover</h5>
                <div className="mt-3 d-flex flex-column gap-2">
                  <a href="">New Released</a>
                  <a href="">Popular</a>
                  <a href="">2024 Movies</a>
                  <a href="">2023 Movies</a>
                  <a href="">2022 Movies</a>
                  <a href="">2021 Movies</a>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 mt-4 mt-md-5">
                <h5>Genres</h5>
                <div className="mt-3 d-flex flex-column gap-2">
                  <a href="">Action</a>
                  <a href="">Advanture</a>
                  <a href="">Animation</a>
                  <a href="">Sci-fi</a>
                  <a href="">Comedy</a>
                  <a href="">Crime</a>
                </div>
              </div>

              <div className="col-6 col-md-4 col-lg-3 mt-4 mt-md-5">
                <h5>About</h5>
                <div className="mt-3 d-flex flex-column gap-2">
                  <a href="">About Us</a>
                  <a href="">Contact</a>
                  <a href="">Faq</a>
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
