import express from "express";
const router = express.Router();

import {
  signup,
  login,
  google,
  logout,
} from "../controllers/authController.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/google", google);
router.get("/logout", logout);

export default router;
