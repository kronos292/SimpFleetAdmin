const multiparty = require('multiparty');
const fs = require('graceful-fs');

const express = require('express');
const router = express.Router();

const JobFile = require('simpfleet_models/models/JobFile');

const s3Methods = require('../services/s3Methods');
const constantTypes = require('../services/constantTypes');

router.post('/', async(req, res) => {
    const form = new multiparty.Form();
    form.parse(req, async(err, fields, files) => {
        if (files.file !== undefined) {
            const file = files.file[0];
            const jobID = fields.jobID[0];

            // Upload product file to S3
            fs.readFile(file.path, async(err, data) => {
                const jobFile = new JobFile();

                const bucket = `ship-supplies-direct-fleetshare`;
                const fileURL = `https://s3-ap-southeast-1.amazonaws.com/${bucket}/job-details-files/${jobFile._id}/${file.originalFilename}`;
                await s3Methods.updateFile(bucket, `job-details-files/${jobFile._id}/${file.originalFilename}`, data, 'private');

                jobFile.fileURL = fileURL;
                jobFile.job = jobID;
                jobFile.type = constantTypes.USER_TYPE_JOB_OWNER;
                jobFile.filename = file.originalFilename;
                await jobFile.save();
            });

            res.send(null);
        }
    });
});
c