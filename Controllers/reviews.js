const Review = require("../models/reviews");
const Listing = require("../models/listings");
module.exports.index = async (req, res, next) => {
    const { id } = req.params;
    console.log("RECEIVED ID:", id);

    const list = await Listing.findById(id);
    console.log("LIST FOUND:", list);

    const review = new Review(req.body.review);
    review.author = req.user._id;

    req.flash('reviewsuccess', "Review Added Successfully!\nThanks for your feedback! 🌟");
    await review.save();

    list.reviews.push(review);
    await list.save();

    res.redirect(`/listings/${id}`);
};
module.exports.destroy = async (req, res, next) => {

    let { id, reviewID } = req.params;
    console.log("The id of listings:", id);
    console.log("\nand the id of the review itself", reviewID);

    await Review.findByIdAndDelete(reviewID);

    req.flash('reviewdlt', 'Your feedback has been removed.');
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });

    res.redirect(`/listings/${id}`);

};