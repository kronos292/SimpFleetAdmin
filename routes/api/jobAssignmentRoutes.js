const express = require("express");
const router = express.Router();

const JobAssignment = require("simpfleet_models/models/JobAssignment");
const Job = require("simpfleet_models/models/Job");

const telegramBotMethods = require("simpfleet_models/telegram/telegramBotMethods");
const emailMethods = require("simpfleet_models/emails/emailMethods");

router.get("/", async (req, res) => {
    const jobAssignments = await JobAssignment.find({status: "Pending"})
        .populate({
            path: "job",
            model: "jobs",
            populate: [
                {
                    path: "user",
                    model: "users",
                    populate: {
                        path: "userCompany",
                        model: "userCompanies"
                    }
                },
                {
                    path: "vessel",
                    model: "vessels",
                }
            ]
        })
        .populate({
            path: "logisticsCompany",
            model: "logisticsCompanies"
        })
        .select();
    res.send(jobAssignments);
});

router.put("/", async (req, res) => {
    const {jobAssignments} = req.body;
    for (let i = 0; i < jobAssignments.length; i++) {
        const jobAssignment = jobAssignments[i];
        if (jobAssignment.logisticsCompany !== undefined) {
            await JobAssignment.findByIdAndUpdate(jobAssignment._id, {
                ...jobAssignment,
                status: "Assigned"
            });

            // Send job booking info to 3PL telegram chat
            const job = await Job.findOne({_id: jobAssignment.job._id}).populate({
                path: 'vessel',
                model: 'vessels'
            }).populate({
                path: 'vesselLoadingLocation',
                model: 'vesselLoadingLocations'
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
                path: 'pickupDetails',
                model: 'pickupDetails',
                populate: [
                    {
                        path: 'pickupLocation',
                        model: 'pickupLocations'
                    }
                ]
            }).populate({
                path: 'careOffParties',
                model: 'careOffParties',
                populate: [
                    {
                        path: 'job',
                        model: 'jobs'
                    }
                ]
            }).populate({
                path: 'jobItems',
                model: 'jobItems'
            }).populate({
                path: 'jobOfflandItems',
                model: 'jobOfflandItems'
            }).select();

            /* email */
            await emailMethods.sendJobBookingLogisticsOrderEmail(job, jobAssignment);

            /* telegram */
            await telegramBotMethods.sendJobBookingInfo(job);
        }
    }
    res.send(jobAssignments);
});

module.exports = router;
