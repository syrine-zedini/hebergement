// src/components/Mascotte.jsx
import React from "react";
import Lottie from "lottie-react";
import robotAnimation from "../assets/robot.json"; // Ton fichier JSON

const Mascotte = ({ mood }) => {
  const message = {
    idle: "Je suis là pour t'aider ! 🤖",
    loading: "Un instant... je traite tes infos 🔄",
    success: "Bien joué, c'est validé ! 🎉",
    error: "Hmm, il y a des erreurs à corriger 😓",
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="w-40 h-40">
        <Lottie animationData={robotAnimation} loop autoplay />
      </div>
      <p className="text-sm text-center text-gray-600 dark:text-gray-300">
        {message[mood]}
      </p>
    </div>
  );
};

export default Mascotte;