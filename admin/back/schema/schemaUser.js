const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jwt = require("jwt-simple");
const config = require("../config/config");

const ThirdSchema = new mongoose.Schema({
  provider_name: {
      type: String,
      default: null
  },
  provider_id: {
      type: String,
      default: null
  },
  provider_data: {
      type: {},
      default: null
  }
});


const userSchema = mongoose.Schema(
  { 
    email: {
      type: String,
      lowercase: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
    },
    uuid: {
      type: String,
    },
    steamAuth: [ThirdSchema],
    date: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = User = mongoose.model("User", userSchema);