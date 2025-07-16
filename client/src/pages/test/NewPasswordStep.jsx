import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EmailStep from "./EmailStep";
import OtpStep from "./OtpStep";


const NewPasswordStep = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef(null);

  const handleSendEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    if (!email) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setStatus(`Verification code sent to ${email}`);
    setStep(2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-br from-red-500 to-pink-700 opacity-30 rounded-full blur-3xl animate-pulse top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-blue-500 to-cyan-700 opacity-20 rounded-full blur-3xl animate-pulse top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 z-0" />
      <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-purple-500 to-indigo-700 opacity-20 rounded-full blur-3xl animate-pulse bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2 z-0" />

      <motion.div 
        ref={formRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl w-full max-w-md overflow-hidden"
      >
        {/* Card background image */}
        <div className="absolute inset-0 z-0 opacity-10">
          <svg 
            viewBox="0 0 1000 1000" 
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect x="0" y="0" width="20" height="20" fill="white" opacity="0.1"/>
                <rect x="20" y="20" width="20" height="20" fill="white" opacity="0.1"/>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="text-center">
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-2xl font-bold text-white flex items-center justify-center gap-2"
            >
              {step === 1 ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Reset Password
                </>
              ) : step === 2 ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  Verify Code
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  </svg>
                  New Password
                </>
              )}
            </motion.h2>
            <motion.p 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-sm text-white/70 mt-1"
            >
              {step === 1 ? "Enter your email to receive a verification code" : 
               step === 2 ? "We sent a code to your email" : 
               "Create a new password"}
            </motion.p>
          </div>

          {status && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 bg-green-500/20 text-green-400 rounded-lg text-sm text-center flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {status}
            </motion.div>
          )}

          {error && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-3 bg-red-500/20 text-red-400 rounded-lg text-sm text-center flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {step === 1 && (
              <EmailStep 
                email={email}
                setEmail={setEmail}
                setStep={setStep}
                setStatus={setStatus}
                setIsLoading={setIsLoading}
                setError={setError}
              />
            )}

            {step === 2 && (
              <OtpStep 
                email={email}
                otp={otp}
                setOtp={setOtp}
                setStep={setStep}
                setStatus={setStatus}
                setIsLoading={setIsLoading}
                setError={setError}
                handleSendEmail={handleSendEmail}
              />
            )}

            {step === 3 && (
              <NewPasswordStep 
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                setStatus={setStatus}
                setIsLoading={setIsLoading}
                setError={setError}
              />
            )}
          </AnimatePresence>
        </div>

        {step === 3 && status && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="bg-green-500/20 p-4 border-t border-green-500/30 mt-6 rounded-b-lg"
          >
            <div className="flex items-center justify-center text-green-400">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="font-medium">Password reset successfully!</span>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NewPasswordStep;