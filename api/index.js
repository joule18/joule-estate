import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";

const app = express();

//routes
import userRouter from "./routes/userRoute.js";
import authRouter from "./routes/authRoute.js";

///////////////////////////////////////

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";
  if (message.includes("User validation failed: ")) {
    const cleanMessage = message.split(",");
    message = cleanMessage.map((el) => {
      const elParts = el.split(":");
      const max = elParts.length - 1;
      return elParts[max];
    });
  }
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

start();
