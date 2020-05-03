import React from "react";

// -----------
// X Component
// -----------

const X = () => {
  return (
    <svg
      className="x"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 51.6 51.6"
      style={{ enableBackground: "new 0 0 51.6 51.6" }}
      xmlSpace="preserve"
    >
      <line
        className="x__line x__line-2"
        x1="10.4"
        y1="10"
        x2="41.2"
        y2="41.6"
      />
      <line
        className="x__line x__line-1"
        x1="41.6"
        y1="10.4"
        x2="10"
        y2="41.2"
      />
    </svg>
  );
};

export default X;
