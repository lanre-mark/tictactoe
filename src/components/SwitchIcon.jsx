import React from "react";
import styled, { keyframes } from "styled-components";

const shrinkTransitions = keyframes`
                                    "0%": {
                                      transform: "scale(1)"
                                    },
                                    "33%": {
                                      transform: "scale(0.85)"
                                    },
                                    "100%": {
                                      transform: "scale(1)"
                                    }
                                  `;

const StatePreservationDescription = styled.label`
  position: "relative",
  display: "flex",
  margin: "0.6em 0",
  alignItems: "center",
  color: "#9e9e9e",
  font-size: 14px;
  transition: "color 250ms cubic-bezier(0.4, 0, 0.23, 1)",
  "&::after": {
    content: "''",
  },
  "&::before": {
    content: "''",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "1em",
    width: "1em",
    height: "1em",
    background: "transparent",
    boxShadow: "0 0 0 2px #9e9e9e inset",
    borderRadius: "50%",
    cursor: "pointer",
    transition: "all 250ms cubic-bezier(0.4, 0, 0.23, 1)",
  },
`;

const PreserveSwitchIcon = (props) => {
  return (
    <div className="preserve__icon">
      <StatePreservationDescription>
        {props.switch === true ? "ON" : "OFF"}
      </StatePreservationDescription>
    </div>
  );
};

export default PreserveSwitchIcon;
