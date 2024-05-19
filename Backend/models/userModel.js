const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      maxLength: 10,
    },
    forgetKey: {
      type: String,
      required: true,
      trim: true,
      maxLength: 10,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
