import React, { useState, useEffect } from "react";

export default function Banner1({ url = "seatedsaintinsist.com" }) {
  const [iframeSettings, setIframeSettings] = useState({
    width: 728,
    height: 90,
    code: "1c722696104eaabddbb8ea94b4a4940e", // Default for lg
  });

  useEffect(() => {
    const updateIframeSettings = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 576) {
        // Small screen
        setIframeSettings({
          width: 320,
          height: 50,
          code: "d50b3bed6580e165e10fc76a59984255",
        });
      } else if (screenWidth < 768) {
        // Medium screen
        setIframeSettings({
          width: 468,
          height: 60,
          code: "56512f7a5bf2b4258fb20ea47edeb107",
        });
      } else {
        // Large screen
        setIframeSettings({
          width: 728,
          height: 90,
          code: "1c722696104eaabddbb8ea94b4a4940e",
        });
      }
    };

    // Set settings on load
    updateIframeSettings();

    // Update settings on window resize
    window.addEventListener("resize", updateIframeSettings);

    return () => {
      window.removeEventListener("resize", updateIframeSettings);
    };
  }, []);

  return (
    <div className="container text-center text-white mt-5">
      <iframe
        src={`//${url}/watchnew?key=${iframeSettings.code}`}
        width={`${iframeSettings.width}px`}
        height={`${iframeSettings.height}px`}
        scrolling="no"
        style={{
          border: "none",
        }}
      />
    </div>
  );
}
