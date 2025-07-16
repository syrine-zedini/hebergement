import React, { createContext, useState, useEffect, useContext } from 'react';
import { checkAuthUser, loginUser, logoutUser, signupUser,sendResetOtpUser,verifyAccountUser ,resetPasswordUser} from '../api/auth'; // Adjust the import path as necessary
import axios from 'axios';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const init = async () => {
      try {
        const res = await checkAuthUser();
        if (res.data.success) {
          setUser(res.data.user);
          setIsAuthenticated(true);
          
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

   // Signup 
  const signup = async (formData) => {
    try {
      const res = await signupUser(formData);
      return res.data;
    } catch (err) {
      throw err;
    }
  };
  

  // Login standard
  const login = async (formData) => {
    try {
      const res = await loginUser(formData);
      if (res.data.success) {
        setUser(res.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('token', res.data.token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      }
      return res.data;
    } catch (err) {
      throw err;
    }
  };

 const loginWithGoogle = async (googleData) => {
  try {
    const res = await axios.post('http://localhost:8080/api/auth/google', googleData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    if (res.data?.success) {
      setUser(res.data.user);
      setIsAuthenticated(true);
      localStorage.setItem('token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      
      return {
        success: true,
        user: res.data.user,
        token: res.data.token
      };
    }
    throw new Error(res.data?.message || 'Google authentication failed');
  } catch (err) {
    console.error('Google login error:', err);
    throw err;
  }
};


  // Verify email
  const verifyAccount = async (otp) => {
    try {
      const res = await verifyAccountUser(otp);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

   // Resend OTP
  const sendResetOtp = async (email) => {
    try {
      const res = await sendResetOtpUser(email);
      return res.data;
    } catch (err) {
      throw err;
    }
  };
 // Logout
  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  //resetPassword
  const resetPassword = async (formData) => {
    try {
      const res = await resetPasswordUser(formData);
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login,loginWithGoogle, logout, signup, sendResetOtp, resetPassword, verifyAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
