const mongoose = require("mongoose");

const GrandParentSchema = new mongoose.Schema({
  g_id: {
    type: Number,
    unique: true,
    default: () => Math.floor(1000 + Math.random() * 9000), // random 4-digit number
  },
  fullName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "prefer_not_to_say"],
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const GrandParent = mongoose.model("User", GrandParentSchema);

module.exports = GrandParent;
