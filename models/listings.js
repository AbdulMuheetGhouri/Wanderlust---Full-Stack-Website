const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews.js");
const User = require('./user.js');
const ListingSchema = new Schema({
    title: {
        type: String,
        required: [true,"Title should not be empty"],
    },
    description: String,
    image: {
        url: String,
        filename: String,
    },
    price:{
        type: Number,
        required: [true, "Price Should not be empty"],
    },
    location: {
        type: String,
        required: [true,"Location should not be empty"],
    },
    country: {
        type: String,
        required: [true,"Country should not be empty"], 
    },
    reviews: [
  {
    type: Schema.Types.ObjectId,
    ref: "Review"
  },
],

  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }

});

ListingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});
const Listing = mongoose.model("Listing",ListingSchema);

module.exports = Listing;