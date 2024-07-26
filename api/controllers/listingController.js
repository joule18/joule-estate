import ListingModel from "../models/ListingModel.js";
import errorHandler from "../utils/error.js";

const createListing = async (req, res, next) => {
  try {
    const listing = await ListingModel.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

const deleteListing = async (req, res, next) => {
  try {
    const listing = await ListingModel.findById(req.params.id);

    if (!listing) {
      return next(errorHandler(404, "Listing not found."));
    }

    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only delete your own listing."));
    }

    await ListingModel.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing has been deleted");
  } catch (error) {
    next(error);
  }
};

export { createListing, deleteListing };
