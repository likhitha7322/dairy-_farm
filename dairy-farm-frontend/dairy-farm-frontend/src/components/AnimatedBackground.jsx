// AnimatedBackground.jsx
import React from "react";
import bgImage from "../assets/farm-bg.jpg"; // ensure this file exists
import "./Auth.css";

/*
  This component wraps children and draws the farm background.
  Use it at top-level in App.js to make background consistent across pages.
*/
const AnimatedBackground = ({ children }) => {
  const style = {
    backgroundImage: `url(${bgImage})`,
  };

  return (
    <div className="auth-page" style={style}>
      {children}
    </div>
  );
};

export default AnimatedBackground;
