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

/* @route   PUT /api/logistics_users */
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
      if (req.body.company === undefined) {
        /* console.log("undefined"); */
        LogisticsCompany.findOne({ name: req.body.companyName }).then(lC => {
          if (lC) {
            /* console.log("link to user"); */
            LogisticsUser.findByIdAndUpdate(req.body._id, {
              $set: { isApproved: true, company: lC._id }
            }).then(user => {
              res.json(user);
            });
          } else {
            /* console.log("create usercompany and link to user"); */
            const newLComp = new LogisticsCompany({
              name: req.body.companyName
            });
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
      } else {
        /* console.log("defined"); */
        LogisticsUser.findByIdAndUpdate(req.body._id, {
          $set: { isApproved: true }
        }).then(user => {
          res.json(user);
        });
      }
    }
  }
});

/* @route   PUT /api/logistics_users/update */
/* @desc    edit user */
/* @access  Private admin */
router.put("/update", (req, res) => {
  if (req.session.user.userType === "Admin") {
    LogisticsCompany.findById(req.body.newData.company._id).then(lC => {
      LogisticsUser.findByIdAndUpdate(req.body.newData._id, {
        $set: {
          firstName: req.body.newData.firstName,
          lastName: req.body.newData.lastName,
          email: req.body.newData.email,
          contactNumber: req.body.newData.contactNumber,
          companyName: lC.name,
          company: lC._id
        }
      }).then(logisticUser => {
        res.json(logisticUser);
      });
    });
  }
});

module.exports = router;
