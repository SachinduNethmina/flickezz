import { useEffect } from "react";

export default function SocialBar({
  url = "seatedsaintinsist.com",
  code = "0301d685d7c1f6aa29f771a30c3c6c71",
}) {
  useEffect(() => {
    // Create the script element dynamically
    const script = document.createElement("script");
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    script.src = `//${url}/${code}/invoke.js`;

    // Append the script to the container
    const container = document.getElementById(`container-${code}`);
    container.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      container.innerHTML = "";
    };
  }, [url, code]);

  return (
    <div className="container text-center text-white mt-5">
      <div id={`container-${code}`}></div>
    </div>
  );
}
