import UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    next(errorHandler(400, "Please fill in the fields."));
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

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      next(errorHandler(400, "Please fill in the fields."));
      return;
    }

    //query

    const validUser = await UserModel.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "Incorrect Credentials. (email haha)"));
      return;
    }

    //password matching

    const validPassword = bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      next(errorHandler(401, "Incorrect Credentials."));
      return;
    }

    ////jwt
    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    //remove password from the return

    const { password: pass, ...userInfo } = validUser._doc;

    //save token into cookie
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    next(error);
  }
};

export { signup, login };
