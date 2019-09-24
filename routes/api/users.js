const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load validation
const validateRegisterInput = require("../../validation/vi-register");
const validateLoginInput = require("../../validation/vi-login");

/* load user model */
const User = require("../../models/User");
const constants = require("../../service/constantTypes");
//Load email methods
const emailMethods = require("../../service/emailMethods");

/* @route   POST /api/users/register */
/* @desc    register user */
/* @access  Public */
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(404).json(errors);
    } else {
      const addUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        companyName: req.body.companyName,
        password: req.body.password,
        userType: constants.USER_TYPE_JOB_OWNER,
        registerDate: new Date().toString()
      });
      addUser
        .save()
        .then(user => res.json(user))
        .catch(err => console.log(err));

      emailMethods.sendSignUpEmail(addUser);
    }
  });
});

/* @route   POST /api/users/login */
/* @desc    login user / returning jwt token */
/* @access  Public */
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email,
    password = req.body.password;

  //Check username
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Users not found";
      return res.status(404).json(errors);
    }

    if (!user.isApproved) {
      errors.isApproved = "Account not yet Approved.";
      return res.status(404).json(errors);
    }

    //Check password
    if (password && user.password) {
      if (isMatch) {
        //User matched
        const payload = {
          id: user.id,
          name: user.fullname,
          userType: user.userType
        }; //Create jwt

        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(404).json(errors);
      }
    }
  });
});

/* @route   GET /api/users/current */
/* @desc    set current user */
/* @access  Private */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.fullname,
      contact: req.user.contact,
      email: req.user.email,
      company: req.user.company
    });
  }
);

/* @route post contact_us */
router.post("/contact_mail", (req, res) => {
  const { email, name, contactNumber, remarks } = req.body;

  const htmlText =
    `<h1>A user has sent us a contact request:</h1>` +
    `<p><strong>Name:</strong> ${name}</p>` +
    `<p><strong>Email:</strong> ${email}</p>` +
    `<p><strong>Contact Number:</strong> ${contactNumber}</p>` +
    `<p><strong>Remarks:</strong> ${remarks}</p>`;
  emailMethods.sendAutomatedEmail(keys.email, "Contact Form Request", htmlText);

  res.send(null);
});

module.exports = router;
