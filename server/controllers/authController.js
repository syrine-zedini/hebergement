import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode"; // Ajoutez cette ligne
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import dotenv from "dotenv";
import crypto from 'crypto';

dotenv.config(); // Load environment variables

//-----------register -------------
/*export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    //send verification email
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: email,
      subject: "Welcome to PEGASIO",
      text: `Hello ${name},\n\nPlease verify your account by clicking the link: `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};*/
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    
    // password encryption
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      email,
      password: hashedPassword,
    });

     // Generate OTP and set expiration time
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.verifyOtp = otp;
    user.verifyOtpExpiresAt = expiresAt;
    await user.save();
    
    // In register controller
    const preAuthToken = jwt.sign(
      { id: user._id, type: "pre-verification" },
      process.env.JWT_SECRET,
      { expiresIn: "30m" } // Short expiration
    );

    res.cookie("preAuthToken", preAuthToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 30 * 60 * 1000, // 30 minutes
    });

   
    // Send OTP via email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "🔐 Verify your PEGASIO Account",
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px 40px; border-radius: 12px; box-shadow: 0 0 15px rgba(0,0,0,0.1); border-left: 6px solid #e11d48;">
        
        <h2 style="color: #000; text-align: center; font-size: 24px; margin-bottom: 30px;">
          🔐 PEGASIO Email Verification
        </h2>

        <p style="font-size: 16px; color: #333;">Hello <strong>${user.name}</strong>,</p>

        <p style="font-size: 16px; color: #333;">Thank you for signing up. Please use the following OTP code to verify your email address:</p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background-color: #e11d48; color: white; font-size: 28px; padding: 12px 24px; border-radius: 8px; letter-spacing: 5px;">
            ${otp}
          </span>
        </div>

        <p style="font-size: 14px; color: #666;">⏰ This code is valid for <strong>10 minutes</strong>. If you did not request this, you can safely ignore this email.</p>

        <p style="font-size: 14px; color: #999; margin-top: 40px;">— The PEGASIO Team</p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to send verification email",
        });
      } else {
        console.log("Email sent successfully:", info.response);
        return res.status(200).json({
          success: true,
          message: "Verification OTP sent successfully",
        });
      }
    });

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//-----------login -------------
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }
    if (!user.isAccountVerified) {
      return res.status(403).json({
        success: false,
        message: "Account not verified",
        userId: user._id, // Return ID for verification flow
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res
      .status(200)
      .json({ success: true, message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//-----------logout -------------
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// Verify OTP for account verification
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await userModel.findById(userId);

    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.verifyOtp = otp;
    user.verifyOtpExpiresAt = expiresAt;
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.MAIL_USER,
      to: user.email,
      subject: "🔐 Verify your PEGASIO Account",
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px 40px; border-radius: 12px; box-shadow: 0 0 15px rgba(0,0,0,0.1); border-left: 6px solid #e11d48;">
        
        <h2 style="color: #000; text-align: center; font-size: 24px; margin-bottom: 30px;">
          🔐 PEGASIO Email Verification
        </h2>

        <p style="font-size: 16px; color: #333;">Hello <strong>${user.name}</strong>,</p>

        <p style="font-size: 16px; color: #333;">Thank you for signing up. Please use the following OTP code to verify your email address:</p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background-color: #e11d48; color: white; font-size: 28px; padding: 12px 24px; border-radius: 8px; letter-spacing: 5px;">
            ${otp}
          </span>
        </div>

        <p style="font-size: 14px; color: #666;">⏰ This code is valid for <strong>10 minutes</strong>. If you did not request this, you can safely ignore this email.</p>

        <p style="font-size: 14px; color: #999; margin-top: 40px;">— The PEGASIO Team</p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to send verification email",
        });
      } else {
        console.log("Email sent successfully:", info.response);
        return res.status(200).json({
          success: true,
          message: "Verification OTP sent successfully",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
//-----------verifyEmail using OTP -------------
/*export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "User ID and OTP are required" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    if (user.verifyOtp !== otp || user.verifyOtp === "") {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpiresAt) {
      return res.status(400).json({ success: false, message: "Expired OTP" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiresAt = 0;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};*/
/*export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  if ( !otp) {
    return res
      .status(400)
      .json({ success: false, message: "User ID and OTP are required" });
  }
  try {
    const user = await userModel.findOne({ verifyOtp: otp });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    if (user.verifyOtp !== otp || user.verifyOtp === "") {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpiresAt) {
      return res.status(400).json({ success: false, message: "Expired OTP" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiresAt = 0;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};*/

export const verifyEmail = async (req, res) => {
  const { otp } = req.body;
   const userId = req.userId;
  if (!otp) {
    return res
      .status(400)
      .json({ success: false, message: "User ID and OTP are required" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res
        .status(400)
        .json({ success: false, message: "Account already verified" });
    }

    if (user.verifyOtp !== otp || user.verifyOtp === "") {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpiresAt) {
      return res.status(400).json({ success: false, message: "Expired OTP" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiresAt = 0;
    await user.save();
    // In verifyEmail controller after successful verification:
res.clearCookie('preAuthToken');

    return res
      .status(200)
      .json({ success: true, message: "Account verified successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


// ------------ check if user is authenticated -------------
// Dans authController.js
export const isAuthenticated = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ success: false, message: "Non authentifié" });
    }

    const user = await userModel.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: "Utilisateur non trouvé" });
    }

    return res.status(200).json({ 
      success: true, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error("Error in isAuthenticated:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Erreur serveur",
      error: error.message 
    });
  }
};
//-------------- Reset Password OTP-------------
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes
    user.resetOtp = otp;
    user.resetOtpExpiresAt = expiresAt;
    await user.save();

    // Send OTP via email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "🔑 PEGASIO Password Reset OTP",
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background-color: white; padding: 30px 40px; border-radius: 12px; box-shadow: 0 0 15px rgba(0,0,0,0.1); border-left: 6px solid #e11d48;">
        
        <h2 style="color: #000; text-align: center; font-size: 24px; margin-bottom: 30px;">
          🔑 PEGASIO Password Reset
        </h2>

        <p style="font-size: 16px; color: #333;">Hello <strong>${user.name}</strong>,</p>

        <p style="font-size: 16px; color: #333;">We received a request to reset your password. Please use the OTP code below to continue:</p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background-color: #e11d48; color: white; font-size: 28px; padding: 12px 24px; border-radius: 8px; letter-spacing: 5px;">
            ${otp}
          </span>
        </div>

        <p style="font-size: 14px; color: #666;">⏳ This OTP is valid for <strong>15 minutes</strong>. If you didn't request a password reset, please ignore this email.</p>

        <p style="font-size: 14px; color: #999; margin-top: 40px;">— The PEGASIO Security Team</p>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({
          success: false,
          message: "Failed to send verification email",
        });
      } else {
        console.log("Email sent successfully:", info.response);
        return res.status(200).json({
          success: true,
          message: "Verification OTP sent successfully",
        });
      }
    });
    return res
      .status(200)
      .json({ success: true, message: "Reset OTP sent successfully" });
  } catch (error) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
};

//-------------- Reset Password -------------
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.resetOtp !== otp || user.resetOtp === "") {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.resetOtpExpiresAt) {
      return res.status(400).json({ success: false, message: "Expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpiresAt = 0;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Password has been reset successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const handleGoogleAuth = async (req, res) => {
  try {
    const { credential } = req.body;
    
    if (!credential) {
      return res.status(400).json({ 
        success: false, 
        message: "Google token is required" 
      });
    }

    const decoded = jwtDecode(credential);
    
    // Validation basique du token Google
    if (!decoded.email || !decoded.sub) {
      return res.status(400).json({
        success: false,
        message: "Invalid Google token"
      });
    }

    let user = await userModel.findOne({ 
      $or: [
        { email: decoded.email },
        { googleId: decoded.sub }
      ]
    });

    // Nouvel utilisateur
    if (!user) {
      user = new userModel({
        name: decoded.name || `${decoded.given_name} ${decoded.family_name}`,
        email: decoded.email,
        password: crypto.randomBytes(16).toString('hex'),
        googleId: decoded.sub,
        profilePicture: decoded.picture,
        isAccountVerified: true
      });
      await user.save();
    } 
    // Mise à jour si l'utilisateur existait mais sans googleId
    else if (!user.googleId) {
      user.googleId = decoded.sub;
      user.profilePicture = decoded.picture;
      await user.save();
    }

    // Génération du token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    // Configuration du cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400000, // 1 jour
      domain: process.env.NODE_ENV === 'production' ? '.votredomaine.com' : undefined
    });

    return res.status(200).json({
      success: true,
      message: 'Google authentication successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      },
      token
    });

  } catch (error) {
    console.error("Google auth error:", error);
    return res.status(500).json({
      success: false,
      message: 'Google authentication failed',
      error: error.message
    });
  }
};