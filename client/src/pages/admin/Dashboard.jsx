import React from "react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Tableau de bord Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-white/10 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Utilisateurs</h3>
          <p className="text-2xl text-red-500">120</p>
        </div>
        <div className="bg-white dark:bg-white/10 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Nouveaux inscrits</h3>
          <p className="text-2xl text-red-500">12</p>
        </div>
        <div className="bg-white dark:bg-white/10 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Messages</h3>
          <p className="text-2xl text-red-500">45</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
