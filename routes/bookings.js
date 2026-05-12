const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");

router.post("/create", async (req, res) => {

    try {

        const booking = new Booking(req.body);

        await booking.save();

        res.status(201).json({
            success: true,
            booking
        });

    } catch (err) {

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

module.exports = router;