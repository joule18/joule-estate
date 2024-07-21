import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    const pwError = new Error("Please fill in the fields.");
    pwError.statusCode = 400;
    next(pwError);
    return;
  }

  //hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
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
    if (error.code === 11000) {
      const errorField = Object.keys(error.keyValue)[0];
      const fieldName = errorField === "email" ? "Email" : "Username";
      const customError = new Error(
        `${fieldName} already exists. Please use a different ${fieldName.toLowerCase()}.`
      );
      customError.statusCode = 400;
      return next(customError);
    } else {
      next(error);
      return;
    }
  }
};

export default signup;
