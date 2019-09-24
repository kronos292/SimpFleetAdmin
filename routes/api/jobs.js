const express = require("express");
const router = express.Router();

/* load model needed*/

router.get("/test", (req, res) => res.json("Job Working"));

module.exports = router;
