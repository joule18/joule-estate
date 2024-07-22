import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username must be provided."],
      minlength: 3,
      maxlength: 50,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email must be provided."],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Valid Email must be provided",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password must be provided."],
      minlength: 6,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
  },
  {
    timestamps: true,
  }
);

//add to database as collection
const User = mongoose.model("User", UserSchema);

export default User;
