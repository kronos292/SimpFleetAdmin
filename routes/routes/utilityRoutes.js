const express = require('express');
const router = express.Router();

const axios = require('axios');

const keys = require('../config/keys');
const constants = require('../services/constantTypes');
const emailMethods = require('../services/emailMethods');

// Check whether the current environment is a production environment
router.get('/production_environment', async(req, res) => {
    res.send(process.env.NODE_ENV === constants.ENV_TYPE_PRODUCTION);
});

// Send contact form details to admin email
router.post('/contact_mail', async(req, res) => {
    const {email, firstName, lastName, contactNumber, remarks} = req.body;

    const htmlText = `<h1>A user has sent us a contact request:</h1>`
            + `<p><strong>First Name:</strong> ${firstName}</p>`
            + `<p><strong>Last Name:</strong> ${lastName}</p>`
            + `<p><strong>Email:</strong> ${email}</p>`
            + `<p><strong>Contact Number:</strong> ${contactNumber}</p>`
            + `<p><strong>Remarks:</strong> ${remarks}</p>`;
    await emailMethods.sendAutomatedEmail(keys.SHIP_SUPPLIES_DIRECT_SALES_EMAIL, 'Contact Form Request', htmlText, null);

    res.send(null);
});

// Get position of vessel
router.get('/vessel_position', async(req, res) => {
    let vesselPosition = null;
    axios.get(`https://sg-mdh-api.mpa.gov.sg/v1/vessel/positions/imonumber/000${req.query.vesselIMO}`, { 'headers': { 'apiKey': keys.MPA_DH_API_KEY } }).then(response => {
        vesselPosition = {
            lat: response.data[0].latitudeDegrees,
            lng: response.data[0].longitudeDegrees
        };
    }).catch(err => {
        console.log(err.response.data);
    }).finally(f => {
        res.send(vesselPosition);
    });
});

module.exports = router;
