import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import walkAnimation from "../assets/mascotte-walk.json";
import image from '../assets/logo8.png'
const MascotteIntro = ({ onFinish }) => {
  const [shouldPlay, setShouldPlay] = useState(true);

  useEffect(() => {
    setShouldPlay(false);
    const reset = setTimeout(() => setShouldPlay(true), 10);
    return () => clearTimeout(reset);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 1700); // adapte selon ta durée réelle
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 min-h-screen bg-transparent">
      {shouldPlay && (
       <div className="logo-wrapper">
  <img src={image} alt="Logo" className="logo-img" />
  <div className="spinner-ring"></div>
</div>
      )}

      <div className="text-center animate-fade-in-down">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent tracking-wide">
          Bienvenue !
        </h1>
        <p className="mt-2 text-lg font-medium text-pink-600 animate-pulse">
          Préparons votre inscription...
        </p>
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default MascotteIntro;
