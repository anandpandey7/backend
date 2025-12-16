import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Admin = mongoose.model("Admin", adminSchema);

// ✅ CORRECT: ES6 default export
export default Admin;

// ❌ WRONG (what you had):
// exports = { Admin }