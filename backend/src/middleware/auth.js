const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const { JWT_SECRET } = require("../config");

// Middleware for admin authentication
function adminMiddleware(req, res, next) {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
        return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    // Expect: "Bearer <token>"
    const parts = tokenHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        return res.status(401).json({ message: "Unauthorized: Invalid token format" });
    }

    const token = parts[1];

    let decoded;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }

    // Find the admin using decoded data
    Admin.findById(decoded.id)
        .then((admin) => {
            if (!admin) {
                return res.status(401).json({ message: "Unauthorized: Admin not found" });
            }

            req.admin = admin; // attach admin data to request
            next();
        })
        .catch((err) => {
            return res.status(500).json({ message: "Internal Server Error" });
        });
}

module.exports = adminMiddleware;
