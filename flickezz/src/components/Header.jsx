import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Header = () => {
  const location = useLocation();
  const { toggleSignInModal, isNavbarOpen, setIsNavbarOpen } = useAuthContext();
  const [isSticky, setIsSticky] = useState(false);

  const handleToggle = () => {
    setIsNavbarOpen((prev) => !prev); // Toggle the state
  };

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight / 4) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  useEffect(() => {
    const isMoviePage = /^\/movies\/[^/]+$/.test(location.pathname);
    const isTvSeriesPage = /^\/tv-series\/[^/]+$/.test(location.pathname);
    setIsSticky(isMoviePage || isTvSeriesPage);
    if (!isMoviePage && !isTvSeriesPage) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-md px-0 px-md-5 w-100 ${
          isNavbarOpen && "bg-black"
        } ${isSticky ? "sticky py-2 bg-black shadow-sm" : "py-3"}`}
        style={{
          position: isSticky ? "sticky" : "fixed",
          top: 0,
          zIndex: 999,
        }}
      >
        <div className="container-fluid gap-3 gap-md-0">
          <a href="">
            <img
              src="/logo.png"
              alt=""
              className={`${isSticky ? "logo-header-sm" : "logo-header"}`}
            />
          </a>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded={isNavbarOpen}
            aria-label="Toggle navigation"
            onClick={handleToggle}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="white"
                viewBox="0 0 30 30"
              >
                <path
                  d="M4 7h22M4 15h22M4 23h22"
                  stroke="white"
                  strokeWidth="2"
                />
              </svg>
            </span>
          </button>
          <div
            className={`collapse navbar-collapse justify-content-end mt-4 mt-md-0 ${
              isNavbarOpen && "show"
            }`}
          >
            <ul className="navbar-nav gap-3 gap-md-1 text-center">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" && "nav-link-active"
                  }`}
                  to={"/"}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/movies" && "nav-link-active"
                  }`}
                  to={"/movies"}
                >
                  Movies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" && "nav-link-active"
                  }`}
                  to={"/about"}
                >
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/contact" && "nav-link-active"
                  }`}
                  to={"/contact"}
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/privacy-policies" && "nav-link-active"
                  }`}
                  to={"/privacy-policies"}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div
            className={`collapse navbar-collapse justify-content-end mb-4 mb-md-0 ${
              isNavbarOpen && "show"
            }`}
          >
            <ul className="navbar-nav gap-3 gap-md-1 text-center">
              <li className="nav-item">
                <button
                  className="btn text-white"
                  onClick={() => toggleSignInModal(true)}
                >
                  Register
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-light"
                  onClick={() => toggleSignInModal(false)}
                >
                  Sign in
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* {isSticky && (
        <div className="w-100 d-flex justify-content-center sticky-search-container">
          <div className="d-inline-flex py-2 bg-black shadow-sm gap-2 px-2 sticky-search-container-1">
            <input type="text" className="form-control themed-input-2" />
            <button className="btn btn-themed-1">Search</button>
          </div>
        </div>
      )} */}
    </>
  );
};

export default Header;
