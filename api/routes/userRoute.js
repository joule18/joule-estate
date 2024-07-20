import express from "express";
const router = express.Router();

import userController from "../controllers/userController.js";

router.get("/", userController);

export default router;
