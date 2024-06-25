const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapasync.js");
const {isLoggedIn,validateListing, isOwner} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// index route
// For create post route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(listingController.createListing));
  // .post(upload.single("listing[image]"),(req,res)=>{
  //   res.send(req.file);
  // })

// For create New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

// Update route
// Delete route
// show route
router
  .route("/:id")
  .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
  .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))
  .get(wrapAsync(listingController.showListing));

// edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports = router;