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
      next(errorHandler(404, "Incorrect Credentials."));
      return;
    }

    //password matching

    const validPassword = await bcrypt.compare(password, validUser.password);
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

const google = async (req, res, next) => {
  const { name, email, photo } = req.body;
  try {
    const user = await UserModel.findOne({
      email,
    });
    if (user) {
      //if user exists, login the user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...data } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(data);
    } else {
      //if not, register the user
      //need to generate random password because google doesnt pass password
      //userModel password is required
      //user can change their password eventually (?)
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8); //generates 16 digit password

      //hashing
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(generatedPassword, salt);

      //reconstruct username from google display name
      const username =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        avatar: photo,
      });

      newUser.save();

      //create jwt for user
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password, ...data } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(data);
    }
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("User has been logged out.");
  } catch (error) {
    next(error);
  }
};

export { signup, login, google, logout };
