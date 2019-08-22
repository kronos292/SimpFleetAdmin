const express = require("express");
const router = express.Router();

/* load model needed*/
const Job = require("../../models/Job");
const User = require("../../models/User");
const Vessel = require("../../models/Vessel");

router.get("/test", (req, res) => res.json("Job Working"));

module.exports = router;
