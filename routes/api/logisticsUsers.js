const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
//Load validation
const validateLoginInput = require("../../validation/vi-login");

/* load user model */
const LogisticsUser = require("simpfleet_models/models/LogisticsUser");
const AdminUser = require("simpfleet_models/models/AdminUser");
const Location = require("simpfleet_models/models/Location");
const PickupLocation = require("simpfleet_models/models/PickupLocation");
const LogisticsCompany = require("simpfleet_models/models/LogisticsCompany");
const constants = require("../../services/constantTypes");
//Load email methods
const emailMethods = require("simpfleet_models/emails/emailMethods");

/* @route   GET /api/users */
/* @desc    get user data */
/* @access  Private admin */
router.get("/", (req, res) => {
  if (req.session.user.userType === "Admin") {
    LogisticsUser.find()
      .populate({ path: "company", model: "logisticsCompanies" })
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
      LogisticsUser.findByIdAndUpdate(req.body._id, {
        $set: { isApproved: false }
      }).then(user => {
        res.json(user);
      });
    } else if (req.body.isApproved === false) {
      LogisticsCompany.findById(req.body.company).then(lC => {
        if (lC) {
          /* console.log("directly save"); */
          LogisticsUser.findByIdAndUpdate(req.body._id, {
            $set: { isApproved: true }
          }).then(user => {
            res.json(user);
          });
        } else {
          /* console.log("create usercompany and link to user"); */
          const newLComp = new LogisticsCompany({ name: req.body.company });
          newLComp.save().then(lComp => {
            console.log(lComp);
            LogisticsUser.findByIdAndUpdate(req.body._id, {
              $set: { isApproved: true, company: lComp._id }
            }).then(user => {
              res.json(user);
            });
          });
        }
      });
    }
  }
});

module.exports = router;
