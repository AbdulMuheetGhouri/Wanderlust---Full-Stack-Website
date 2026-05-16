const express = require("express");
const router = express.Router();
const wrap_async = require("../utils/wrap_async");
const passport = require("passport");
const { savedurl } = require("../middlewares.js");
const usersController = require("../Controllers/users.js");

// get for create.

router.route("/signup")
.get( (req, res, next) => {
  res.render("Users/SignUp.ejs")})
.post(wrap_async(usersController.create));


router.route("/login")
.get( (req, res, next) => {
  res.render("Users/Login.ejs");
})
.post( savedurl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  usersController.userPostLogin
);


// logout
router.get("/logout", usersController.userLogout);

module.exports = router;