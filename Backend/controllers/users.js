const UserSchema = require("../models/userModel");

exports.registerUser = async (req, res) => {
  const { username, password, forgetKey } = req.body;
  try {
    // Check if username already exists
    const existingUser = await UserSchema.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    // Create a new user
    const newUser = new UserSchema({ username, password, forgetKey });
    await newUser.save();
    res.status(200).json({ message: "Done" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await UserSchema.findOne({ username: username });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "User Not Found" });
  }
};

exports.updatePassword = async (req, res) => {
  const { username, password, forgetKey } = req.body;
  try {
    // Check if username already exists
    const existingUser = await UserSchema.findOne({ username: username });
    if (!existingUser) {
      return res.status(400).json({ message: "User not found" });
    }
    if (forgetKey) {
      const userToUpdate = await UserSchema.findOneAndUpdate(
        { username, forgetKey },
        { password },
        { new: true }
      );

      if (!userToUpdate) {
        return res.status(404).json({ message: "Password key is incorrect" });
      }
      return res.status(200).json({ message: "Done" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
