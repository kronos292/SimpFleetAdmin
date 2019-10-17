const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const bcrypt = require("bcryptjs");
//Load validation
const validateRegisterInput = require("../../validation/vi-register");
const validateLoginInput = require("../../validation/vi-login");

/* load user model */
const User = require("simpfleet_models/models/User");
const Location = require("simpfleet_models/models/Location");
const PickupLocation = require("simpfleet_models/models/PickupLocation");
const UserCompany = require("simpfleet_models/models/UserCompany");
const constants = require("../../service/constantTypes");
//Load email methods
const emailMethods = require("../../service/emailMethods");

/* @route   POST /api/users/register */
/* @desc    register user */
/* @access  Public */
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  const {
    email,
    firstName,
    lastName,
    companyName,
    contactNumber,
    password
    //pickupLocation
  } = req.body;
  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: email.toLowerCase() }).then(user => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(404).json(errors);
    } else {
      /* let pickupLocations =[];
        if (pickupLocation !== ''){
            let longLat = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${pickupLocation}&key=${keys.GOOGLE_API_KEY}`);
            let res = longLat.data.results.geometry.location;
            if (res){
                let location = new Location({
                    lng: res.lat,
                    lat: res.lng
                });
                await location.save();

                let PickupLocation = new PickupLocation({
                    addressString: pickupLocation,
                    location: location,
                });
                await PickupLocation.save();

                pickupLocations.push(PickupLocation);
            }
        }
        */
      const addUser = new User({
        firstName,
        lastName,
        contactNumber,
        email: email.toLowerCase(),
        companyName,
        password,
        //pickupLocations: pickupLocations,
        userType: constants.USER_TYPE_JOB_OWNER,
        isApproved: true,
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
  const { email, password } = req.body;

  User.findOne({ email: email }).then(user => {
    if (!user) {
      errors.email = "Users not found";
      return res.status(404).json(errors);
    }

    if (!user.isApproved) {
      errors.isApproved = "Account not yet Approved.";
      return res.status(404).json(errors);
    }
    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        console.log("Conratulations! your password is correct.");
        console.log("Wait a second you will redirect to home page ...");
        //User matched
        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
          userType: user.userType,
          companyName: user.companyName
        };

        //Create jwt
        //sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 7200 },
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
    });
  });
  /* .populate({
    path: 'userCompany',
    model: 'userCompanies'
}).select()*/
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
      firstName: req.user.firstName,
      contactNumber: req.user.contactNumber,
      email: req.user.email,
      companyName: req.user.companyName
    });
  }
);

/* @route   GET /api/users */
/* @desc    get user data */
/* @access  Private admin */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.userType === "Admin") {
      User.find()
        .populate({ path: "userCompany", model: "userCompanies" })
        .then(user => {
          res.json(user);
        });
    }
  }
);

/* @route   PUT /api/users */
/* @desc    edit user isapproved status */
/* @access  Private admin */
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.user.userType === "Admin") {
      if (req.body.isApproved === true) {
        User.findByIdAndUpdate(req.body._id, {
          $set: { isApproved: false }
        }).then(user => {
          res.json(user);
        });
      } else if (req.body.isApproved === false) {
        UserCompany.findById(req.body.userCompany).then(uC => {
          if (uC) {
            /* console.log("directly save"); */
            User.findByIdAndUpdate(req.body._id, {
              $set: { isApproved: true }
            }).then(user => {
              res.json(user);
            });
          } else {
            /* console.log("create usercompany and link to user"); */
            const newUComp = new UserCompany({ name: req.body.companyName });
            newUComp.save().then(uComp => {
              console.log(uComp);
              User.findByIdAndUpdate(req.body._id, {
                $set: { isApproved: true, userCompany: uComp._id }
              }).then(user => {
                res.json(user);
              });
            });
          }
        });
      }
    }
  }
);

/* @route post contact_us */
router.post("/contact_mail", (req, res) => {
  const { email, firstName, contactNumber, remarks } = req.body;

  const htmlText =
    `<h1>A user has sent us a contact request:</h1>` +
    `<p><strong>Name:</strong> ${firstName}</p>` +
    `<p><strong>Email:</strong> ${email}</p>` +
    `<p><strong>Contact Number:</strong> ${contactNumber}</p>` +
    `<p><strong>Remarks:</strong> ${remarks}</p>`;
  emailMethods.sendAutomatedEmail(keys.email, "Contact Form Request", htmlText);

  res.send(null);
});

module.exports = router;
