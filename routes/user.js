const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const Booking = require("../models/booking");
const userController = require("../controllers/users.js");
const { route } = require("./listing");

router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signup));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(saveRedirectUrl, passport.authenticate("local", { failureRedirect: '/login', failureFlash: true }), userController.login);

router.get("/logout", userController.logout)
router.get("/dashboard/:id", async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.params.id
        }).populate("listing");

        res.render("users/dashboard.ejs", {
            bookings
        });

    } catch (err) {

        req.flash("error", "Unable to load dashboard");

        res.redirect("/listings");

    }

});
module.exports = router;