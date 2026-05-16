const Listing = require("./Models/listings");
const Review = require("./Models/reviews");
module.exports.isLoggedIn = (req,res,next)=>{
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "You must be Logged in to Create a Listing");
       return res.redirect("/login");
    }
    next();
};
module.exports.savedurl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};
module.exports.isOwner = async  (req,res,next)=>{
    
    let { id } = req.params;
    let list = await Listing.findById(id);
    if(!list.owner._id.equals(res.locals.curruser._id)){
        req.flash("error","you don't have access.");        
     return res.redirect(`/listings`);
    }
    next();
}


module.exports.isReviewOwner = async  (req,res,next)=>{
    
    let { reviewID } = req.params;
    let review = await Review.findById(reviewID);
    if(!review.author._id.equals(res.locals.curruser._id)){
        req.flash("error","you don't have access.");        
         return res.redirect(`/listings`);
    }
    next();
}