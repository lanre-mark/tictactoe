import React from "react";

const BoardSize = (props) => {
  console.log("BoardSize Props::", props);
  const availableSizes = [3, 5, 7, 9, 11, 13, 15, 17];
  return (
    // <div id="boardsizecontrol">
    <div className="keys">
      {availableSizes.map((sz, ndx) => (
        <div
          key={ndx}
          data-key="65"
          data-value={sz}
          className="key__button"
          onClick={(e) => {
            alert("youClickedMe @ 3!");
          }}
        >
          {sz}
        </div>
      ))}
    </div>
    // </div>
  );
};

export default BoardSize;
