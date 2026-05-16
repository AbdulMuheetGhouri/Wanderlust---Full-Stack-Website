const User = require("../Models/user");
module.exports.create = async (req, res, next) => {

  try {
    let { username, email, password } = req.body;
    const user = new User({
      email, username
    });
    let registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }


      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
      console.log("ye he registered USer ka username", registeredUser.username);
      console.log(req.body);
    });
    // res.redirect("/listings");

  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }

};

module.exports.userLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You're Logged Out.");
    res.redirect("/listings");
  })
};

module.exports.userPostLogin = (req, res) => {

    console.log(req.flash());
    req.flash("success", "Welcome back!");
    let redirectUrl = res.locals.redirectUrl || "/listings"; 
    res.redirect(redirectUrl);
  };