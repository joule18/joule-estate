import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name must be provided"],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Email must be provided"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Valid Email must be provided",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password must be provided"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

//add to database as collection
const User = mongoose.model("User", UserSchema);

export default User;
