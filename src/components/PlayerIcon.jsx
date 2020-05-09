import React from "react";

const UserGameIcon = (props) => {
  return (
    <div className="player__icon">
      {props.symbol === "x" && (
        <svg
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 51.6 51.6"
          style={{ enableBackground: "new 0 0 51.6 51.6" }}
          xmlSpace="preserve"
        >
          <line className="icon__line" x1="10.4" y1="10" x2="41.2" y2="41.6" />
          <line className="icon__line" x1="41.6" y1="10.4" x2="10" y2="41.2" />
        </svg>
      )}

      {props.symbol === "o" && (
        <svg
          className="icon"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 60 60"
          style={{ enableBackground: "new 0 0 60 60" }}
          xmlSpace="preserve"
        >
          <circle className="icon__line" cx="30" cy="30" r="20" />
        </svg>
      )}
    </div>
  );
};

export default UserGameIcon;
