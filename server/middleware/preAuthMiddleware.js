import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config(); // <-- Load .env variables here!

export const preAuth = (req, res, next) => {
  const token =
    process.env.NODE_ENV === 'production'
      ? req.cookies.preAuthToken
      : req.cookies.preAuthToken || req.headers['x-preauth-token'];

  if (!token) {
    return res.status(401).json({ success: false, message: "Token missing" });
  }

  console.log("🔐 Token received:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);

    if (decoded.type !== "pre-verification") {
      return res.status(401).json({ success: false, message: "Invalid token type" });
    }

    req.userId = decoded.id; // Attach userId to request object
    next();
  } catch (error) {
    console.error("❌ Token error:", error.message);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
