const Joi = require('joi');

const crypto = require('crypto');

const express = require('express');
const router = express.Router();

const emailMethods = require('../services/emailMethods')
const User = require('simpfleet_models/models/User');

router.get('/', async(req, res) => {
    if(req.session.user) {
        const user = await User.findOne({_id: req.session.user._id}).select();
        if(!user.isApproved) {
            req.session = null;
            res.send(false);
        } else {
            req.session.user = user;
            res.send(req.session.user);
        }
    } else {
        res.send(req.session.user);
    }
});

router.post('/', async(req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const {email, password} = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }, null, {collation: {locale: 'en', strength: 2 }}).select();
    if (user !== null && user.validPassword(password) && user.isApproved) {
        req.session.user = user;
        res.send({
            status: 'Authenticated'
        });
    } else {
        res.send({
            error: 'Invalid Email/Password!'
        });
    }
});

// User forget password and reset
router.post('/forgotPassword', async(req, res) => {
    // Generate random token
    const buffer = await crypto.randomBytes(20);
    const token = buffer.toString('hex');

    // Check if user exists
    const user = await User.findOne({ email: req.body.email }).select();
    if(user === null) {
        res.send({error: 'No account with that email address exists!'});
    } else {
        // Set user reset password details and save to db
        user.resetPasswordToken = token;
        user.resetPasswordExpiry = Date.now() + 3600000;
        await user.save();

        // Send reset email to user
        const htmlText
            = `<p>Hi ${user.firstName} ${user.lastName}, </p>`
            + `<p>Click the Reset Password link <a href=${'http://' + req.headers.host + '/reset/' + token}>here</a> to reset your password.</p>`
            + `<p>If you didn't request a new password, feel free to ignore this email.</p>`;
        await emailMethods.sendAutomatedEmail(req.body.email, 'Password Reset Link', htmlText, null);

        res.send({data: ''});
    }
});

// Validate forgot password token
router.get('/validateResetToken', async(req, res) => {
    const user = await User.findOne({ resetPasswordToken: req.query.token, resetPasswordExpiry: { $gt: Date.now() } });
    if (user === null) {
        res.send({error: 'Password reset token is invalid or has expired.'});
    } else {
        res.send({data: user});
    }
});

// Reset user password via token
router.post('/resetPassword', async(req, res) => {
    const {password, token} = req.body;

    // Validate and update user password
    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiry: { $gt: Date.now() } });
    if (user === null) {
        res.send({error: 'Password reset token is invalid or has expired.'});
    } else {
        // Save user details to db
        user.password = user.generateHash(password);
        user.resetPasswordToken = null;
        user.resetPasswordExpiry = null;
        await user.save();

        // Send notification email to user
        const htmlText
            = `<p>Hi ${user.firstName} ${user.lastName}, </p>`
            + `<p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`;
        await emailMethods.sendAutomatedEmail(user.email, 'Your password has been changed', htmlText, null);

        // Login user
        req.session.user = user;
        res.send({data: user});
    }
});

router.post('/logout', async(req, res) => {
    req.session = null;
    res.send({
        status: 'Done'
    });
});

// Validate schema
validateUser = function(req) {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).required()
    };

    return Joi.validate(req, schema);
};

module.exports = router;
