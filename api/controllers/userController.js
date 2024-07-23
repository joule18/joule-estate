import bcrypt from "bcryptjs";

import errorHandler from "../utils/error.js";
import UserModel from "../models/UserModel.js";

const userController = (req, res) => {
  res.json({
    message: "Hello world neewww",
  });
};

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

    const { password, ...userData } = updatedUser._doc;
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

export default userController;
export { updateUser };
