const express = require("express");
const router = express.Router();
const passport = require("passport");
const multiparty = require("multiparty");
const fs = require("graceful-fs");

const JobFile = require("simpfleet_models/models/JobFile");
const Job = require("simpfleet_models/models/Job");

const s3Methods = require("../../service/s3Methods");
const constantTypes = require("../../service/constantTypes");
//const emailMethods = require("../services/emailMethods");
//const telegramBotMethods = require("../services/telegramBotMethods");
router.get("/test", (req, res) => res.json("Pesan : succes"));
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const jobID = req.query.jobID;
    const jobFiles = await JobFile.find({
      job: jobID,
      isDeleted: false
    }).select();
    res.send(jobFiles);
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { jobID, filename, numCopies, remarks, requirements } = req.body;

    // Create JobFile
    const jobFileObj = new JobFile({
      job: jobID,
      user: req.user.id,
      fileURL: "",
      type: constantTypes.USER_TYPE_JOB_OWNER,
      filename: filename,
      numCopies: numCopies,
      requirements: requirements,
      remarks: remarks
    });
    await jobFileObj.save();

    // Send uploaded job file to Logistics Party
    /* const job = await Job.findOne({ _id: jobID }).select();
    await emailMethods.sendJobFileUploadLogisticsEmail(jobFileObj, job);
    */
    res.send(null);
  }
);

router.post(
  "/upload_document",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async (err, fields, files) => {
      if (files.file !== undefined) {
        const file = files.file[0];
        const jobFile = JSON.parse(fields.jobFile[0]);
        const jobID = fields.jobID[0];

        // Upload product file to S3
        fs.readFile(file.path, async (err, data) => {
          const jobFileObj = new JobFile();

          const bucket = `ship-supplies-direct-fleetshare`;
          const fileURL = `https://s3-ap-southeast-1.amazonaws.com/${bucket}/job-details-files/${jobFile._id}/${file.originalFilename}`;
          await s3Methods.updateFile(
            bucket,
            `job-details-files/${jobFile._id}/${file.originalFilename}`,
            data,
            "private"
          );

          jobFileObj.fileURL = fileURL;
          jobFileObj.job = jobID;
          jobFileObj.user = req.user.id;
          jobFileObj.type = constantTypes.USER_TYPE_JOB_OWNER;
          jobFileObj.filename = file.originalFilename;
          jobFileObj.requirements = jobFile.requirements;
          jobFileObj.numCopies = jobFile.numCopies;
          jobFileObj.remarks = jobFile.remarks;
          await jobFileObj.save();
          /*
          // Send uploaded job file to Logistics Party
          const job = await Job.findOne({ _id: jobID }).select();
          await emailMethods.sendJobFileUploadLogisticsEmail(jobFileObj, job);

          // Send telegram bot message on document upload
          await telegramBotMethods.documentCreationMessage(jobFileObj, job);
          */
        });

        res.send(null);
      }
    });
  }
);

router.put("/", async (req, res) => {
  const { jobFiles } = req.body;

  for (let i = 0; i < jobFiles.length; i++) {
    const jobFile = jobFiles[i];
    await JobFile.findByIdAndUpdate(jobFile._id, {
      numCopies: jobFile.numCopies,
      requirements: jobFile.requirements,
      remarks: jobFile.remarks,
      filename: jobFile.filename
    });
  }

  res.send(jobFiles);
});

router.delete("/", async (req, res) => {
  const { jobFile } = req.body;

  await JobFile.findByIdAndUpdate(jobFile._id, {
    isDeleted: true
  });

  res.send(jobFile);
});

module.exports = router;
