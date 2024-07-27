import bcrypt from "bcryptjs";

import errorHandler from "../utils/error.js";
import UserModel from "../models/UserModel.js";
import ListingModel from "../models/ListingModel.js";

const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(
        401,
        "You do not have permission to update this user's profile."
      )
    );
  }
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    // used "set" method so maupdate lang yung mga need maupdate. di mawala ang iba
    const { password, ...userData } = updatedUser._doc;
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only delete your own account."));
  }
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token").status(200).json("User has been deleted.");
  } catch (error) {
    next(error);
  }
};

const getUserListing = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await ListingModel.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    next(errorHandler(401, "You can only view your own listings."));
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return next(errorHandler(404, "User not found."));
    }
    const { password: pass, ...data } = user._doc;
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export { updateUser, deleteUser, getUserListing, getUser };
