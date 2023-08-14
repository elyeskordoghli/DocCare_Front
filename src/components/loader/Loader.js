import React from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import "./Loader.css";

const override = css`
  display: block;
  margin: 0 auto;
`;

const CustomLoader = () => {
  return (
    <div className="fullpage-loader">
    <div className="custom-loader-container">
     <div className="custom-centering">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120.29 71.29">
        <title>coop-logo-loader</title>
        <g className="custom-left-circle">
          <path style={{ fill: "#f3753e" }} d="M48.18,2.3l-2-.76V8h.94l-.5,1.19a28.63,28.63,0,0,1,0,52.92l.5,1.19h-.94v6.46l2-.77a35.61,35.61,0,0,0,0-66.69Z" />
          <path style={{ fill: "#37474f" }} d="M35.65,7A28.37,28.37,0,0,1,46.59,9.19l2.56,1.09V2.64l-1-.36-.36-.13L47.48,2A35.64,35.64,0,1,0,35.65,71.29a35.47,35.47,0,0,0,11.86-2l.31-.11.36-.12,1-.39V61l-2.1.91-.46.19h0a28.36,28.36,0,0,1-10.94,2.18A28.65,28.65,0,1,1,35.65,7Z" />
        </g>
        <g className="custom-right-circle">
          <path style={{ fill: "#f3753e" }} d="M74.15,1.54l-2,.76a35.61,35.61,0,0,0,0,66.69l2,.77V63.3h-.94l.49-1.19a28.63,28.63,0,0,1,0-52.92L73.21,8h.94Z" />
          <path style={{ fill: "#37474f" }} d="M84.65,0A35.29,35.29,0,0,0,72.78,2.05l-.3.1-.36.13-1,.39v7.62l2.1-.92.45-.18h0a28.64,28.64,0,1,1,11,55.1,28.45,28.45,0,0,1-11-2.18L71.15,61v7.64l1,.37.36.12.33.12A35.64,35.64,0,1,0,84.65,0Z" />
        </g>
      </svg>
    </div>
    </div>
    </div>
  );
};

export default CustomLoader;
