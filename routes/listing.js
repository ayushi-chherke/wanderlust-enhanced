// const express = require("express");
// const router = express.Router();
// const wrapAsync = require("../utils/wrapAsync.js");
// const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
// const listingController = require("../controllers/listings.js");
// const multer  = require('multer');
// const { storage } = require("../cloudConfig.js");
// const upload = multer({ storage });

// router
//     .route("/")
//     .get(wrapAsync(listingController.index))
//     .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing));

// router.get("/new", isLoggedIn, listingController.renderNewForm);

// router
//     .route("/:id")
//     .get(wrapAsync(listingController.showListing))
//     .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
//     .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

// // Edit Route

// router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// module.exports = router;

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// All Listings + Create
router
  .route("/")
  .get(wrapAsync(listingController.index)) // Show all listings
  .post(
    isLoggedIn,
    upload.single("listing[image]"), // Upload image
    wrapAsync(listingController.createListing) // Create new listing
  );

// New Listing Form
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Single Listing Routes
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show one listing
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing) // Update listing
  )
  .delete(
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.destroyListing) // Delete listing
  );

// Edit Listing Form
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports = router;
