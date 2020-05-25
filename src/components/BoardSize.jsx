import React from "react";

const BoardSize = (props) => {
  // console.log("BoardSize Props::", props);
  const availableSizes = [3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25];
  return (
    <div className="keys">
      {availableSizes.map((sz, ndx) => (
        <div
          key={ndx}
          data-key="65"
          data-value={sz}
          className="key__button"
          onClick={(e) => {
            props.onSizeSelection(e, sz);
          }}
        >
          {sz}
        </div>
      ))}
    </div>
  );
};

export default BoardSize;
