import express from "express";
const router = express.Router();

import {
  createListing,
  deleteListing,
  updateListing,
  getListing,
  getSearchListings,
} from "../controllers/listingController.js";
import { verifyToken } from "../utils/verifyUser.js";

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/get/:id", getListing);
router.get("/get", getSearchListings);

export default router;
