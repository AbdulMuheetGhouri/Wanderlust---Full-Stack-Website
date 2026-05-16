const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrap_async.js");
const { isLoggedIn, isOwner } = require("../middlewares.js");
const listingController = require("../Controllers/listings.js");
const multer = require("multer");
let { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const {listingSchema} = require("../schema.js"); 

const ExpressError = require("../utils/ExpressErrors.js");

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        throw new ExpressError(400, errMsg); 
    } else {
        next();
    }
};

// New route
router.get("/new", isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render("listings/create.ejs");
});

// Listing routes
router.route("/")
    .get(wrapasync(listingController.index))
    .post(
        isLoggedIn, 
        upload.single("listing[image]"), 
        validateListing,   // ✅ validate before creating
        wrapasync(listingController.create)
    );

router.route("/:id")
    .get(wrapasync(listingController.show))
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single("listing[image]"), 
        validateListing,   // ✅ validate before updating
        wrapasync(listingController.update)
    )
    .delete(isLoggedIn, isOwner, wrapasync(listingController.destroy));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapasync(listingController.edit));

module.exports = router;
