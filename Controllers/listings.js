const Listing = require("../Models/listings");
module.exports.create = async (req, res, next) => {

    let url = req.file.path;
    let filename = req.file.filename;

    console.log(url,filename);

    console.log(req.body);

    if (!req.body.listing) {
        throw new ExpressError(400, "Send Valid Data for Listing");
    }

    let listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image = {url,filename};
    await listing.save();

    req.flash("listsuccess", "New Listing was Added Successfully!");
    res.redirect("/listings");

};

module.exports.index = async (req, res) => {
    let listings = await Listing.find();
    res.render("listings/index", { listings });
};

module.exports.show = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id)
  .populate({ path: "reviews", populate: { path: "author", } })
  .populate("owner");

    if (!list) {
        req.flash("error", "Listing you requested for, does not exit");
        return res.redirect("/listings");
    }
    res.render("listings/read.ejs", { list });

};
module.exports.edit = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);

    res.render("listings/update.ejs", { list });
};

module.exports.update = async (req, res) => {

    if (!req.body.listing) {
        throw new ExpressError(400, "Send Valid Data for Listing");
    }


    let { id } = req.params;
    let list = await Listing.findById(id);
    let updataedList = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
   
    if( typeof req.file != "undefined"){
         let url = req.file.path;
    let filename = req.file.filename;

    updataedList.image = {url,filename};
    await updataedList.save();

    }
    req.flash("listupdate", "Changes saved — your listing looks even better now!");

    res.redirect(`/listings/${id}`);
};

module.exports.destroy = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);

    req.flash("listdlt", "That listing has been removed from your account.");
    res.redirect("/listings");
};