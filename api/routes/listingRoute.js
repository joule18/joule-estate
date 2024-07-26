import express from "express";
const router = express.Router();

import {
  createListing,
  deleteListing,
} from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);

export default router;
