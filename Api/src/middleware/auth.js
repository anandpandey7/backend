import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

import { JWT_SECRET } from "../config/config.js";

// ✅ Named export (matches your routes import)
export const authMiddleware = async (req, res, next) => {
  try {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      return res.status(401).json({ 
        message: "Unauthorized: Token missing" 
      });
    }

    // Expect: "Bearer <token>"
    const parts = tokenHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ 
        message: "Unauthorized: Invalid token format" 
      });
    }

    const token = parts[1];

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the admin
    const admin = await Admin.findById(decoded.id);
    
    if (!admin) {
      return res.status(401).json({ 
        message: "Unauthorized: Admin not found" 
      });
    }

    // Attach admin to request
    // console.log("Authenticated admin:", admin.email);
    req.admin = admin;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        message: "Unauthorized: Invalid or expired token" 
      });
    }
    return res.status(500).json({ 
      message: "Internal Server Error" 
    });
  }
};