import express from "express";
const router = express.Router();

import { createListing } from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post("/create", verifyToken, createListing);

export default router;
