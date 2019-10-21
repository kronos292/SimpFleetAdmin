const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const passport = require("passport");
const UserCompany = require("simpfleet_models/models/UserCompany");

router.get(
  "/userCompany",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    UserCompany.find().then(company => {
      res.json(company);
    });
  }
);

module.exports = router;
