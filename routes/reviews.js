const express = require("express");
const router = express.Router({mergeParams:true});
const wrapasync = require("../utils/wrap_async.js");
const ExpressError = require("../utils/ExpressErrors.js");
const { reviewSchema } = require("../schema.js");
const { isLoggedIn, isReviewOwner } = require("../middlewares.js");
const reviewController = require("../controllers/reviews.js");

// validation with Joi,
const vaildateReviews = (req, res, next) => {
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(404, errMsg);
    } else {
        next();
    }
};


// review create

router.post("/", isLoggedIn, vaildateReviews, wrapasync(reviewController.index));

// review delete
router.delete("/:reviewID",  isLoggedIn, isReviewOwner ,wrapasync(reviewController.destroy));

module.exports = router;