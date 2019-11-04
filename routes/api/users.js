const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
//Load validation
const validateLoginInput = require("../../validation/vi-login");

/* load user model */
const User = require("simpfleet_models/models/User");
const AdminUser = require("simpfleet_models/models/AdminUser");
const Location = require("simpfleet_models/models/Location");
const PickupLocation = require("simpfleet_models/models/PickupLocation");
const UserCompany = require("simpfleet_models/models/UserCompany");
const constants = require("../../service/constantTypes");
//Load email methods
const emailMethods = require("../../service/emailMethods");

router.get("/fetch", async (req, res) => {
  if (req.session.user) {
    if (req.session.user.isApproved === false) {
      req.session = null;
      res.send({});
      errors.isApproved = "Account not yet Approved.";
      res.status(404).json(errors);
    } else {
      res.send(req.session.user);
    }
  } else {
    req.session = null;
    res.send({});
  }
});
/* @route   POST /api/users/login */
/* @desc    login user / returning jwt token */
/* @access  Public */
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const { email, password } = req.body;

  const user = await AdminUser.findOne({ email: email.toLowerCase() }, null, {
    collation: { locale: "en", strength: 2 }
  })
    .populate({
      path: "userCompany",
      model: "userCompanies"
    })
    .select();

  if (!user) {
    errors.email = "Users not found";
    return res.status(404).json(errors);
  } else {
    if (user.validPassword(password)) {
      console.log("Conratulations! your password is correct.");
      console.log("Wait a second you will redirect to home page ...");
      req.session.user = user;
      res.send({
        status: "Authenticated"
      });
    } else {
      errors.password = "Password incorrect";
      return res.status(404).json(errors);
    }
  }
});
/* @route   POST /api/users/logout */
/* @desc    logout */
/* @access  Public */
router.post("/logout", async (req, res) => {
  req.session = null;
  res.send({
    status: "Done"
  });
});

/* @route   GET /api/users */
/* @desc    get user data */
/* @access  Private admin */
router.get("/", (req, res) => {
  if (req.session.user.userType === "Admin") {
    User.find()
      .populate({ path: "userCompany", model: "userCompanies" })
      .then(user => {
        res.json(user);
      });
  }
});

/* @route   PUT /api/users */
/* @desc    edit user isapproved status */
/* @access  Private admin */
router.put("/", (req, res) => {
  if (req.session.user.userType === "Admin") {
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
});

/* @route post contact_us */
router.post("/contact_mail", (req, res) => {
  const { email, firstName, contactNumber, remarks } = req.body;

  const htmlText =
    `<h1>A user has sent us a contact request:</h1>` +
    `<p><strong>Name:</strong> ${firstName}</p>` +
    `<p><strong>Email:</strong> ${email}</p>` +
    `<p><strong>Contact Number:</strong> ${contactNumber}</p>` +
    `<p><strong>Remarks:</strong> ${remarks}</p>`;
  emailMethods.sendAutomatedEmail(
    keys.SHIP_SUPPLIES_DIRECT_SALES_EMAIL,
    "Contact Form Request",
    htmlText,
    null
  );

  res.send(null);
});

module.exports = router;
