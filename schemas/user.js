const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  avatarURL: { type: String, required: [true, "Upload avatar"] },
  token: { type: String },
  verified: { type: Boolean, default: false },
  verificationToken: {
    type: String,
    required: [true, "Verification token is required"],
  },
});

const User = model("user", userSchema);

module.exports = User;
