import { useEffect, useRef } from "react";
export default function Banner2({
  url = "seatedsaintinsist.com",
  code = "15e33156d609af0360d2dade472f2da8",
}) {
  return (
    <div className="container text-center text-white mt-5">
      <iframe
        src={`//${url}/watchnew?key=${code}`}
        width="300px"
        height="250px"
        scrolling="no"
      />
    </div>
  );
}
