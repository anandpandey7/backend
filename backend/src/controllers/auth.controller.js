import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";
const JWT_SECRET = process.env.JWT_SECRET;

import {
  adminSignupSchema,
  adminSigninSchema,
  changePasswordSchema,
} from "../validators/admin.schema.js";

// Signup
const signup = async (req, res) => {
  try {
    const parsed = adminSignupSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    const { name, email, password } = parsed.data;

    const exists = await Admin.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Admin already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const admin = await Admin.create({ name, email, password: hashed });

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      adminId: admin._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Signin
const signin = async (req, res) => {
  try {
    const parsed = adminSigninSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    const { email, password } = parsed.data;

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Change Password
const changePassword = async (req, res) => {
  try {
    const parsed = changePasswordSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: parsed.error.issues[0].message });
    }

    const { oldPassword, newPassword } = parsed.data;

    const admin = await Admin.findById(req.admin._id);
    if (!admin)
      return res.status(404).json({ message: "Admin not found" });

    const valid = await bcrypt.compare(oldPassword, admin.password);
    if (!valid)
      return res.status(401).json({ message: "Old password incorrect" });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  signup,
  signin,
  changePassword,
};

