const express = require('express');
const router = express.Router();

const LogisticsCompany = require('simpfleet_models/models/LogisticsCompany');

router.get('/', async (req, res) => {
    const logisticsCompanies = await LogisticsCompany.find().select();
    res.send(logisticsCompanies);
});

module.exports = router;