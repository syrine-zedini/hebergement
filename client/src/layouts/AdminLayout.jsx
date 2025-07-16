import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import LogOutConfirmationModal from "../components/LogOutConfirmationModal"; // Adjust the import path as necessary
const AdminLayout = () => {
       const [showLogoutModal, setShowLogoutModal] = useState(false);
  
      const { logout } = useAuth();
        const navigate = useNavigate();
const handleLogout = async () => {
    await logout();
    navigate('/login');
  };
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4 hidden md:block">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin" className="block hover:text-red-400">Dashboard</Link>
          <Link to="/admin/users" className="block hover:text-red-400">Users</Link>
          <Link to="/admin/settings" className="block hover:text-red-400">Settings</Link>
          <button
              onClick={() => setShowLogoutModal(true)}
              className="text-gray-700 dark:text-gray-200 hover:text-red-500">
              <span className="inline-flex justify-center items-center ml-4">
                <svg className="w-5 h-5" fill="currentColor" stroke="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z" clipRule="evenodd" />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Log out</span>
            </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 dark:bg-gray-950 p-6">
        <Outlet />
      </main>
       {showLogoutModal && (
              <LogOutConfirmationModal
                onConfirm={handleLogout}
                onCancel={() => setShowLogoutModal(false)}
              />
            )}
    </div>
  );
};

export default AdminLayout;
