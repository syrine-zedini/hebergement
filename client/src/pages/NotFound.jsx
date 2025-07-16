import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-white px-4 relative overflow-hidden">
      {/* 🔴 Glowing red gradient background */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-red-500 to-pink-600 opacity-30 dark:opacity-20 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

      {/* 🧊 Glass-style content */}
      <div className="relative z-10 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-8 sm:p-10 text-center max-w-md w-full">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">Page non trouvée</h2>
        <p className="text-sm mb-6 opacity-80">
          Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
        </p>

        <Link
          to="/"
          className="inline-block bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 px-6 rounded-lg font-medium hover:opacity-90 transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
