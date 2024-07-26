import express from "express";
const router = express.Router();

import {
  createListing,
  deleteListing,
  updateListing,
} from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);

export default router;
