import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config(); // <-- Load .env variables here!

const userAuth = async (req, res, next) => {
  const token =
    process.env.NODE_ENV === 'production'
      ? req.cookies.token
      : req.cookies.token || req.headers['x-token'];
      console.log("🔐 Token received:", token);

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: req.cookies });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.userId = decoded.id;
    } else {
      return res.status(401).json({ success: false, message: decoded });
    }
    next();
  } catch (error) {
  console.error("JWT verification error:", error.message);
  return res.status(401).json({ success: false, message: error.message });
}

};
export default userAuth;