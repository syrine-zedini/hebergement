// src/components/SuccessAnimation.jsx
import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/Animation_Cart_Cleaned.json"; // Assure-toi que le JSON est bien ici

const SuccessAnimation = ({ loop = false, style = { width: 150, height: 150 } }) => {
  return <Lottie animationData={animationData} loop={loop} style={style} />;
};

export default SuccessAnimation;
