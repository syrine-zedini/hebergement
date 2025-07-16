import React from "react";

const UserHome = () => {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Bienvenue 👋</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Vous êtes connecté en tant qu’utilisateur. Explorez les fonctionnalités !
      </p>
    </div>
  );
};

export default UserHome;