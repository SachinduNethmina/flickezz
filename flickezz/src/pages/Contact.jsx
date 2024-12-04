import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-us container text-white mb-5">
      <div className="row align-items-center pt-5">
        <div className="col-lg-6 col-md-12 mt-5">
          <img
            src="https://leroux.ca/wtl-content/uploads/2024/01/2023-Watchlist-1200x764.jpg"
            alt="Contact Flickezz"
            className="img-fluid rounded contact-us-image w-100"
          />
        </div>
        <div className="col-lg-6 col-md-12 mt-5">
          <h1 className="contact-us-title fw-bold">Get in Touch with Flickezz</h1>
          <p className="contact-us-text">
            Have questions, suggestions, or need assistance? We’d love to hear
            from you! At <span className="highlight">Flickezz</span>, we value
            your feedback and strive to provide the best support possible.
          </p>
          <div className="contact-info mt-4">
            <p className="contact-item">
              <i className="fas fa-envelope contact-icon"></i>
              Email:{" "}
              <a href="mailto:support@flickezz.com">support@flickezz.com</a>
            </p>
            <p className="contact-item">
              <i className="fas fa-phone-alt contact-icon"></i>
              Phone: <a href="tel:+1234567890">+1 234 567 890</a>
            </p>
            <p className="contact-item">
              <i className="fas fa-map-marker-alt contact-icon"></i>
              Address: 123 Cinema Lane, Movietown, USA
            </p>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-6 col-md-12">
          <h2 className="contact-us-subtitle">Our Mission</h2>
          <p className="contact-us-text">
            We believe in bringing stories to life and creating a space where
            everyone can explore, connect, and be inspired by the magic of
            cinema. Flickezz is dedicated to offering quality content with
            top-notch support to ensure you enjoy every moment.
          </p>
        </div>
        <div className="col-lg-6 col-md-12">
          <h2 className="contact-us-subtitle">Connect with Us</h2>
          <p className="contact-us-text">
            Stay updated on our latest offerings and features by following us on
            social media. We love to interact with our community and keep you
            informed about everything new at Flickezz.
          </p>
          <ul className="social-media-links">
            <li>
              <i className="fab fa-facebook contact-icon"></i>{" "}
              <a
                href="https://facebook.com/flickezz"
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <i className="fab fa-twitter contact-icon"></i>{" "}
              <a
                href="https://twitter.com/flickezz"
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <i className="fab fa-instagram contact-icon"></i>{" "}
              <a
                href="https://instagram.com/flickezz"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Contact;
