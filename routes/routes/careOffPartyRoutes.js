const express = require('express');
const router = express.Router();

const CareOffParty = require('simpfleet_models/models/CareOffParty');
const JobItem = require('simpfleet_models/models/JobItem');
const JobOfflandItem = require('simpfleet_models/models/JobOfflandItem');

router.put('/', async(req, res) => {
    const {careOffParty} = req.body;
    const {jobItems, jobOfflandItems} = careOffParty;

    // Create or update job items
    const jobItemObjs = [];
    for(let i = 0; i < jobItems.length; i++) {
        const jobItem = jobItems[i];
        let jobItemObj = await JobItem.findOne({_id: jobItem._id}).select();
        if(jobItemObj !== null) {
            await JobItem.findByIdAndUpdate(jobItemObj._id, {
                ...jobItem
            });
        } else {
            jobItemObj = new JobItem({
                ...jobItem,
                job: careOffParty.job
            });
            await jobItemObj.save();
        }
        jobItemObjs.push(jobItemObj);
    }

    // Create or update offland items
    const jobOfflandItemObjs = [];
    for(let i = 0; i < jobOfflandItems.length; i++) {
        const jobOfflandItem = jobOfflandItems[i];
        let jobOfflandItemObj = await JobOfflandItem.findOne({_id: jobOfflandItem._id}).select();
        if(jobOfflandItemObj !== null) {
            await JobOfflandItem.findByIdAndUpdate(jobOfflandItemObj._id, {
                ...jobOfflandItem
            });
        } else {
            jobOfflandItemObj = new JobOfflandItem({
                ...jobOfflandItem,
                job: careOffParty.job
            });
            await jobOfflandItemObj.save();
        }
        jobOfflandItemObjs.push(jobOfflandItemObj);
    }

    await CareOffParty.findByIdAndUpdate(careOffParty._id, {
        ...careOffParty,
        jobItems: jobItemObjs,
        jobOfflandItems: jobOfflandItemObjs
    });

    res.send(careOffParty);
});

module.exports = router;