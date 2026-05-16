const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../Models/listings.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust"
// const Listing = require("./models/listings.js");


// Connection to MongoDB.
async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then(()=> console.log("Connection Successfull.")).catch((e)=> console.log("Failed to Connect",e));

const initdb = async ()=>{
    await Listing.deleteMany({});
   initdata.data =  initdata.data.map((obj) => ({...obj,owner: "690108f3ed97dc214478702c" })) ;
    await Listing.insertMany(initdata.data);
    console.log("Data initialized successfully");
}
initdb();