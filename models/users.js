const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

const user_model = mongoose.model("users", UserSchema);
module.exports  = user_model;