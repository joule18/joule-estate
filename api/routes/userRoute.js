import express from "express";
const router = express.Router();

import userController from "../controllers/userController.js";

import { updateUser } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

router.get("/", userController);
router.post("/update/:id", verifyToken, updateUser);

export default router;
