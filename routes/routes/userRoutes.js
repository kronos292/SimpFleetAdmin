const Joi = require('joi');

const express = require('express');
const router = express.Router();

const User = require('simpfleet_models/models/User');

const keys = require('../config/keys');
const constants = require('../services/constantTypes');
const emailMethods = require("../services/emailMethods");

router.post('/', async(req, res) => {
    const { error } = validateSignUp(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {email, firstName, lastName, companyName, contactNumber, password} = req.body;

    // Check if user exists
    let user = await User.findOne({ email: email.toLowerCase()}, null, {collation: {locale: 'en', strength: 2 }});
    if(!user) {
        user = new User({
            email: email.toLowerCase(),
            firstName,
            lastName,
            companyName,
            contactNumber,
            userType: constants.USER_TYPE_JOB_OWNER,
            registerDate: new Date().toString()
        });
        user.password = user.generateHash(password);
        await user.save();

        // Send automated email to notify user sign up
        const subject = 'User Sign Up Alert';
        const htmlText = '<h1>A new user has registered an account! The account is now pending approval.</h1>'
            + "<p>User's name is: " + user.firstName + ' ' + user.lastName + '</p>'
            + "<p>User's email is: " + user.email + '</p>'
            + '<p>User Type is: ' + user.userType + '</p>'
            + "<p>User's company is: " + user.companyName + "</p>"
            + "<p>User's contact number is: " + user.contactNumber + "</p>";
        await emailMethods.sendAutomatedEmail(keys.SHIP_SUPPLIES_DIRECT_SALES_EMAIL, subject, htmlText, null);

        // Send sign up confirmation email to user
        await emailMethods.sendUserSignUpConfirmationEmail(user);

        res.send(user);
    } else {
        res.send({error: 'User already exists'});
    }
});

// Validate sign up
validateSignUp = function(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        firstName: Joi.string().min(1).max(255).required(),
        lastName: Joi.string().min(1).max(255).required(),
        companyName: Joi.string().min(1).max(255).required(),
        contactNumber: Joi.string().min(1).max(255).required(),
        password: Joi.string().min(8).max(255).required(),
        confirmPassword: Joi.string().min(8).max(255).required()
    };

    return Joi.validate(req, schema);
};

module.exports = router;
