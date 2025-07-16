import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { sendResetOtp } = useAuth();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await sendResetOtp(email); // ✅ real API call
      setStatus("Un code OTP a été envoyé à votre e-mail.");
      navigate('/verify-reset-otp', { state: { email } });
    } catch (err) {
      setError("Échec de l'envoi. Vérifiez l'email.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 bg-gray-100 px-4 relative overflow-hidden">
      {/* 🔴 Background gradient circles */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-red-500 to-pink-600 opacity-30 dark:opacity-20 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

      {/* 🧊 Glass card */}
      <form
        onSubmit={handleSendOtp}
        className="relative z-10 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-white">
          Mot de passe oublié
        </h2>

        {/* ✅ Status & Error */}
        {status && (
          <div className="text-green-600 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded text-sm text-center border border-green-300 dark:border-green-500">
            {status}
          </div>
        )}
        {error && (
          <div className="text-red-500 bg-red-100 dark:bg-red-900/30 px-4 py-2 rounded text-sm text-center border border-red-300 dark:border-red-500">
            {error}
          </div>
        )}

        {/* 📧 Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Adresse email
          </label>
          <input
            type="email"
            value={email}
            required
            placeholder="votre@email.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-white/10 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 focus:ring-2 focus:ring-red-500 focus:border-red-500 transition"
          />
        </div>

        {/* 🔘 Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Envoyer OTP
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
