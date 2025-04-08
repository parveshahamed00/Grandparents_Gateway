const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
  g_id: {
    type: Number,
    required: true,
  },
  a_id: {
    type: Number,
    required: true,
  },
  date: {
    type: String, 
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted"],
    default: "pending",
  },
  reason: {
    type: String,
    required: true,
  },
});

const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;
