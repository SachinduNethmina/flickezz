import React from "react";
import "../styles/PrivacyPolicy.css";
import { Helmet } from "react-helmet";
import Banner1 from "../components/Ads/Banner1";
import SocialBar from "../components/Ads/SocialBar";
import Banner2 from "../components/Ads/Banner2";

const PrivacyPolicy = () => {
  return (
    <div>
      <Helmet>
        <title>
          Privacy Policy | Flickezz - Watch Free Movies Online with Confidence
        </title>
        <meta
          name="description"
          content="Read the privacy policy of Flickezz, where we ensure your data protection while you watch free movies online. Learn how we collect, use, and safeguard your information."
        />
        <meta
          name="keywords"
          content="privacy policy, Flickezz privacy policy, free movie websites, online privacy, data protection, watch free movies online, movie platform privacy"
        />
        <link rel="canonical" href="https://flickezz.com/privacy-policy" />
        <meta
          property="og:title"
          content="Privacy Policy | Flickezz - Watch Free Movies Online with Confidence"
        />
        <meta
          property="og:description"
          content="Learn about the privacy practices at Flickezz, ensuring your information is protected while you watch free movies online. Your privacy is our priority."
        />
        <meta property="og:image" content="https://flickezz.com/og-image.png" />
        <meta property="og:url" content="https://flickezz.com/privacy-policy" />
        <meta name="author" content="Flickezz" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="privacy-policy container text-white">
        <Banner1 />

        <SocialBar />

        <div className="row mt-5">
          <div className="col-12 text-center">
            <h1 className="privacy-policy-title">Privacy Policy</h1>
            <p className="privacy-policy-intro mt-3">
              At <span className="highlight">Flickezz</span>, we are committed
              to protecting your privacy. This Privacy Policy outlines how we
              collect, use, and safeguard your information when you use our
              platform.
            </p>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-12">
            <h2 className="privacy-policy-subtitle">Information We Collect</h2>
            <p className="privacy-policy-text">
              When you use Flickezz, we may collect the following information:
            </p>
            <ul className="privacy-policy-list">
              <li>
                Personal details, such as your name, email, and contact
                information.
              </li>
              <li>Account details, including your login credentials.</li>
              <li>
                Usage data, such as the movies you watch, your preferences, and
                interactions with the platform.
              </li>
              <li>
                Technical data like your IP address, browser type, and device
                details.
              </li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h2 className="privacy-policy-subtitle">
              How We Use Your Information
            </h2>
            <p className="privacy-policy-text">
              The information we collect is used for the following purposes:
            </p>
            <ul className="privacy-policy-list">
              <li>To provide and improve our services.</li>
              <li>To personalize your experience on the platform.</li>
              <li>To communicate updates, offers, and promotions.</li>
              <li>To maintain security and prevent unauthorized access.</li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h2 className="privacy-policy-subtitle">Your Privacy Rights</h2>
            <p className="privacy-policy-text">
              You have the right to access, modify, or delete your personal data
              at any time. If you wish to exercise these rights, please contact
              us at{" "}
              <a href="mailto:privacy@flickezz.com" className="highlight">
                privacy@flickezz.com
              </a>
              .
            </p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <h2 className="privacy-policy-subtitle">Updates to This Policy</h2>
            <p className="privacy-policy-text">
              We may update this Privacy Policy from time to time. Any changes
              will be reflected on this page, and we encourage you to review it
              regularly.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <Banner1 />
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <Banner2 />
            </div>
          </div>
        </div>
        <Banner1 />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
