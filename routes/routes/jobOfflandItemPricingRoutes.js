const express = require('express');
const router = express.Router();

const JobOfflandItemPricing = require('simpfleet_models/models/JobOfflandItemPricing');

router.get('/', async(req, res) => {
    const jobOfflandItemPricings = await JobOfflandItemPricing.find().select();
    res.send(jobOfflandItemPricings);
});

module.exports = router;