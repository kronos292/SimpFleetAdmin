const express = require('express');
const router = express.Router();

const VesselLoadingLocation = require('simpfleet_models/models/VesselLoadingLocation');

router.get('/', async (req, res) => {
    const vesselLoadingLocations = await VesselLoadingLocation.find().select();
    res.send(vesselLoadingLocations);
});

module.exports = router;