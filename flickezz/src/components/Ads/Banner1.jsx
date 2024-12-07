import { useEffect, useRef } from "react";
export default function Banner1({
  url = "seatedsaintinsist.com",
  code = "1c722696104eaabddbb8ea94b4a4940e",
}) {
  return (
    <div className="container text-center text-white mt-5">
      <iframe
        src={`//${url}/watchnew?key=${code}`}
        width="728px"
        height="90px"
        scrolling="no"
      />
    </div>
  );
}
