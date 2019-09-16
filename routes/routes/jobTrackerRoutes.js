const Joi = require('joi');

const express = require('express');
const router = express.Router();

const Job = require('simpfleet_models/models/Job');
const JobTracker = require('simpfleet_models/models/JobTracker');

const emailMethods = require('../services/emailMethods');
const googleCalendarMethods = require('../services/googleCalendarMethods');

router.post('/', async(req, res) => {
    const {index, title, description, trackingType, jobId} = req.body;

    // Create job status
    const jobTracker = new JobTracker({
        index,
        title,
        description,
        trackingType,
        timestamp: new Date().toString(),
        remarks: '',
        job: jobId
    });
    await jobTracker.save();

    // Update job
    const job = await Job.findOne({_id: jobId}).populate({
        path: 'vessel',
        model: 'vessels'
    }).populate({
        path: 'user',
        model: 'users'
    }).populate({
        path: 'jobTrackers',
        model: 'jobTrackers'
    }).populate({
        path: 'paymentTrackers',
        model: 'paymentTrackers'
    }).populate({
        path: 'careOffParties',
        model: 'careOffParties',
        populate: [
            {
                path: 'job',
                model: 'jobs'
            },
            {
                path: 'jobItems',
                model: 'jobItems'
            },
            {
                path: 'jobOfflandItems',
                model: 'jobOfflandItems'
            }
        ]
    }).populate({
        path: 'jobItems',
        model: 'jobItems'
    }).populate({
        path: 'jobOfflandItems',
        model: 'jobOfflandItems'
    }).select();
    const {jobTrackers} = job;
    jobTrackers.push(jobTracker);
    job.jobTrackers = jobTrackers;
    await job.save();

    // Email logistics party with job information and user of job approval if job tracking index is 2.
    // No emails at stage 3 and 5.
    if(jobTracker.index === 2) {
        // await emailMethods.sendJobBookingLogisticsOrderEmail(job);
        await emailMethods.sendUserJobApprovalEmail(job);
    } else if(jobTracker.index > 2 && jobTracker.index !== 3 && jobTracker.index !== 5) {
        await emailMethods.sendUserJobStatusUpdateEmail(job, jobTracker.index);
    }

    // Update ops google calendar
    if( process.env.NODE_ENV === 'production' && ((job.psaBerthingDateTime !== "" && job.psaBerthingDateTime !== null && job.psaUnberthingDateTime !== "" && job.psaUnberthingDateTime !== null) || (job.vesselLoadingDateTime !== ""&&job.vesselLoadingDateTime!==null) )) {
        try{
            const res = await googleCalendarMethods.updateJobCalendarDetails(job);
            job.googleCalendarId = res.id;
            await job.save();
        } catch (e) {
            console.log(e)
        }
    }

    res.send(jobTracker);
});

module.exports = router;