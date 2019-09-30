const express = require('express');
const router = express.Router();

const JobItemPricing = require('simpfleet_models/models/JobItemPricing');

router.get('/', async(req, res) => {
    const jobItemPricings = await JobItemPricing.find().select();
    res.send(jobItemPricings);
});

module.exports = router;