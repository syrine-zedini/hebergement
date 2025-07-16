import userModel from "../models/userModel.js";

const requireAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
    next();
  } catch (err) {
    console.error("Admin check error:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default requireAdmin;
