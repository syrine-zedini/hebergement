import React, { useState, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const { verifyAccount } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only digits allowed
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    try {
      const res = await verifyAccount(code);
      console.log("Verification successful:", res);
      navigate("/");
    } catch (err) {
      setError("Code invalide ou expiré.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 bg-gray-100 relative overflow-hidden px-4">
      {/* 🔴 Background pulse */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-red-500 to-pink-700 opacity-30 dark:opacity-20 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl p-8 sm:p-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-center text-xl font-semibold text-gray-800 dark:text-white">
          Vérification du compte
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-300">
          Entrez le code à 6 chiffres envoyé à votre adresse e-mail
        </p>

        {/* 🔢 OTP Boxes */}
        <div className="flex justify-center gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl font-semibold rounded-lg bg-white dark:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          ))}
        </div>

        {/* ⚠️ Error */}
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Vérifier
        </button>
      </form>
    </div>
  );
};

export default VerifyAccount;
