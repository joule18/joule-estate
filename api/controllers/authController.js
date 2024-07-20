import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    //hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default signup;
