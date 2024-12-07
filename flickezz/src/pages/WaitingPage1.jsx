import React, { useEffect, useState } from "react";
import SocialBar from "../components/Ads/SocialBar";
import Banner1 from "../components/Ads/Banner1";
import Banner2 from "../components/Ads/Banner2";

const WaitingPage1 = () => {
  const [clickedCount, setClickedCount] = useState(0);

  const buttonClick = () => {
    if ((clickedCount + 1) % 3 === 0) {
      window.location.href = "/waiting-download";
    } else {
      setClickedCount(clickedCount + 1);
      // Open the specified link
      window.open(
        "https://seatedsaintinsist.com/npnbmfpc8v?key=1491e2f7240193af708e384dc88888cd",
        "_blank"
      );
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
          </div>

          <div className="container d-flex justify-content-center">
            <h1 className="text-white">Download Here</h1>
          </div>

          <div className="container d-flex justify-content-center mt-5">
            <button
              className="btn btn-success rounded-0"
              style={{ width: "200px", height: "60px" }}
              onClick={buttonClick}
            >
              Download
            </button>
          </div>

          <div className="container mt-5 mb-5">
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

export default WaitingPage1;
