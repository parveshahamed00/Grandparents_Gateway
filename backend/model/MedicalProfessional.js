const mongoose = require("mongoose");

const MedicalProfessionalSchema = new mongoose.Schema({
  a_id: {
    type: Number,
    unique: true,
    default: () => Math.floor(1000 + Math.random() * 9000), // Random 4-digit ID
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  specialization: {
    type: String,
    required: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = mongoose.model("Admin", MedicalProfessionalSchema);

module.exports = Admin;
