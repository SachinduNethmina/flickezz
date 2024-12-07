import React, { useEffect, useState } from "react";
import SocialBar from "../components/Ads/SocialBar";
import Banner1 from "../components/Ads/Banner1";
import Cookies from "js-cookie";
import { useAuthContext } from "../context/AuthContext";
import Banner2 from "../components/Ads/Banner2";

const WaitingPage2 = () => {
  const { setIsLoading } = useAuthContext();
  const [timeLeft, setTimeLeft] = useState(10); // Timer starts at 5 seconds
  const [showButton, setShowButton] = useState(false); // State to show button when timer ends

  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Circumference of the circle

  // Calculate the stroke-dashoffset based on the remaining time
  const strokeDashoffset = (timeLeft / 10) * circumference;

  useEffect(() => {
    if (timeLeft === 0) {
      // When the timer reaches 0, show the button
      setShowButton(true);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    // Cleanup interval on component unmount or when the timer ends
    return () => clearInterval(interval);
  }, [timeLeft]);

  const [clickedCount, setClickedCount] = useState(0);

  const downloadMovie = async (q) => {
    if ((clickedCount + 1) % 3 !== 0) {
      setClickedCount(clickedCount + 1);
      // Open the specified link
      window.open(
        "https://seatedsaintinsist.com/npnbmfpc8v?key=1491e2f7240193af708e384dc88888cd",
        "_blank"
      );
    } else {
      //   setIsLoading(true);
      setClickedCount(clickedCount + 1);
      const downloadUrl = Cookies.get("download_link");
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = "";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      //   setIsLoading(false);
    }
  };

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src =
      "//seatedsaintinsist.com/ec/f9/c9/ecf9c937b00367fbf118d3d4bf155faf.js";
    script1.type = "text/javascript";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src =
      "//seatedsaintinsist.com/ec/f9/c9/ecf9c937b00367fbf118d3d4bf155faf.js";
    script2.type = "text/javascript";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      // Clean up scripts when the component is unmounted
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="container mt-5">
            <SocialBar />
            <Banner1 />
          </div>

          <div className="container text-center mt-5">
            <h1 className="text-white">Wait</h1>
          </div>

          <div className="container mt-2">
            <div style={{ textAlign: "center" }}>
              <svg width="120" height="120" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="10"
                />
                <circle
                  cx="60"
                  cy="60"
                  r={radius}
                  fill="none"
                  stroke="#00cc00"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  transform="rotate(-90 60 60)" // Rotates the circle so it starts from the top
                  style={{ transition: "stroke-dashoffset 1s linear" }}
                />
              </svg>

              <h1 className="text-white">{timeLeft} seconds</h1>
            </div>
          </div>

          <div className="container d-flex justify-content-center">
            <h1 className="text-white">Download Here</h1>
          </div>

          <div className="container d-flex justify-content-center mt-5">
            <button
              disabled={!showButton}
              className="btn btn-success rounded-0"
              style={{ minWidth: "200px", height: "60px", fontSize: "16px" }}
              onClick={downloadMovie}
            >
              Download Now
            </button>
          </div>

          <div className="container mb-5">
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
      </div>
    </>
  );
};

export default WaitingPage2;
