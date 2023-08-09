import React from "react";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";
import "./Loader.css";
const override = css`
  display: block;
  margin: 0 auto;
`;

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="content">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
};

export default Loader;
