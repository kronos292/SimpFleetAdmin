const Joi = require('joi');

const express = require('express');
const router = express.Router();

const Job = require('simpfleet_models/models/Job');
const PaymentTracker = require('simpfleet_models/models/PaymentTracker');


router.post('/', async (req, res) => {
    const {index, label, jobId, userId} = req.body;

    // Create Payment status
    const paymentTracker = new PaymentTracker({
        index,
        label,
        timestamp: new Date().toString(),
        job: jobId,
        user: userId,
    });
    await paymentTracker.save();

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
    const {paymentTrackers} = job;
    paymentTrackers.push(paymentTracker);
    job.paymentTrackers = paymentTrackers;
    await job.save();

    res.send(paymentTracker);
});

module.exports = router;