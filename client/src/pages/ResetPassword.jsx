import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ResetPassword = () => {
    const location = useLocation();
    const { email, otp } = location.state || {};

  const [formData, setFormData] = useState({
    email: email,
    otp: otp,
    newPassword: "",
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    if (formData.newPassword !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    e.preventDefault();
    try {
      //await resetPassword(formData.email, formData.otp, formData.newPassword);
      await resetPassword(formData);
      setStatus("Mot de passe réinitialisé avec succès.");
    } catch (err) {
      setError("Erreur lors de la réinitialisation.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-red-500 to-pink-700 opacity-30 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

      <form
        onSubmit={handleReset}
        className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-white text-xl font-semibold text-center">
          Réinitialiser le mot de passe
        </h2>

        <input
          name="newPassword"
          type="password"
          placeholder="Nouveau mot de passe"
          value={formData.newPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-red-500"
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirmer le mot de passe"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white/20 text-white placeholder-white/70 focus:ring-2 focus:ring-red-500"
        />

        {status && (
          <p className="text-green-400 text-sm text-center">{status}</p>
        )}
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-lg font-semibold"
        >
          Réinitialiser
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;