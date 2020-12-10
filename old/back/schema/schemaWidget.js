const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

const widgetSchema = mongoose.Schema(
  {
    name: {
        type: String,
        required: true
    },
    value: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true
    },
    position: {
      type: Number,
    },
    refresh_time: {
      type: Number,
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

module.exports = mongoose.model("User", widgetSchema);