if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressErrors.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Models/user.js");
const listings = require("./routes/listings.js");
const reviews = require("./routes/reviews.js");
const user = require('./routes/users.js');

//  Body parsers sabse pehle
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//  Method override next
app.use(methodOverride("_method"));

//  Static files
app.use(express.static(path.join(__dirname, '/public')));

//  View engine setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "templates"));



const MONGO_URL = process.env.MONGO_ATLAS;


// Connection to MongoDB.
async function main() {
    await mongoose.connect(MONGO_URL);
}

main().then(() => console.log("Connection Successfull.")).catch((e) => console.log("Failed to Connect", e));


const store =  MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: {
        secret: process.env.STORE_SECRET
    },
    touchAfter: 24*3600,
})

store.on("error", (err)=>{
    console.log("Error in Mongo Session Store ",err);
})

const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 20 * 24 * 60 * 60 * 1000,
        maxAge: 20 * 24 * 60 * 60 * 1000,
    },
    httpOnly: true,
};



// Basic Response:
// app.get("/", (req, res) => {
//     res.send("Working...");
// });


app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// flash message,

app.use((req, res, next) => {
    res.locals.listsuccess = req.flash('listsuccess');
    res.locals.listupdate = req.flash('listupdate');
    res.locals.listdlt = req.flash('listdlt');

    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");


    res.locals.reviewsuccess = req.flash('reviewsuccess');
    res.locals.reviewdlt = req.flash('reviewdlt');

    res.locals.curruser = req.user;


    next();
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", user);


// All your valid routes above this...
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

// Centralized Error Handler
app.use((err, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = err;
    res.status(status).render("error.ejs", { status, message });
});

// listening to port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});

module.exports = app;
