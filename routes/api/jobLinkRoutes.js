const express = require("express");
const router = express.Router();

const JobLink = require("simpfleet_models/models/JobLink");
const CareOffParty = require("simpfleet_models/models/CareOffParty");
const Job = require("simpfleet_models/models/Job");
const PaymentTracker = require("simpfleet_models/models/PaymentTracker");

const emailMethods = require("simpfleet_models/emails/emailMethods");

router.get("/", async (req, res) => {
  const { jobIndex } = req.query;

  const job = await Job.findOne({ index: jobIndex }).select();
  const jobLink = await JobLink.findOne({ job: job._id }).select();

  res.send(jobLink);
});

router.post("/", async (req, res) => {
  const { job } = req.body;

  const jobLink = new JobLink({
    job,
    users: [],
    url: `${req.protocol}://${req.get("host")}/job_invitations/${job.index}`
  });
  await jobLink.save();

  res.send(jobLink);
});

router.post("/share", async (req, res) => {
  const { email, job } = req.body;
  console.log(email);
  console.log(job);

  const jobLink = await JobLink.findOne({ job: job._id })
    .populate({
      path: "users",
      model: "users"
    })
    .populate({
      path: "job",
      model: "jobs",
      populate: {
        path: "careOffParties",
        model: "careOffParties"
      }
    })
    .select();

  if (email) {
    console.log(jobLink);
    try {
      await emailMethods.sendJobLinkSharingInvite(email, job, jobLink);
    } catch (err) {
      console.log(err);
    }
  }

  res.send(null);
});

router.post("/join", async (req, res) => {
  let { jobLink } = req.body;

  jobLink = await JobLink.findOne({ _id: jobLink._id })
    .populate({
      path: "users",
      model: "users"
    })
    .populate({
      path: "job",
      model: "jobs",
      populate: [
        {
          path: "careOffParties",
          model: "careOffParties"
        },
        {
          path: "paymentTrackers",
          model: "paymentTrackers"
        }
      ]
    })
    .select();

  if (req.session.user && jobLink.isEnabled) {
    const job = jobLink.job;
    if (String(job.user) !== req.session.user._id) {
      const careOffParties = job.careOffParties;
      let userExists = false;
      for (let i = 0; i < careOffParties.length; i++) {
        const careOffParty = careOffParties[i];
        if (String(careOffParty.user) === req.session.user._id) {
          userExists = true;
          break;
        }
      }

      if (!userExists) {
        // Update job link with user
        const users = jobLink.users;
        users.push(req.session.user);
        jobLink.users = users;
        await jobLink.save();

        // Create care-off party
        const careOffParty = new CareOffParty({
          job,
          user: req.session.user,
          jobItems: [],
          jobOfflandItems: []
        });
        await careOffParty.save();

        // Create Payment status
        const paymentTracker = new PaymentTracker({
          index: 1,
          label: "Not Yet Invoiced",
          timestamp: new Date().toString(),
          user: req.session.user._id,
          job: job._id
        });
        await paymentTracker.save();

        //Update Payment Status
        const paymentTrackers = job.paymentTrackers;
        paymentTrackers.push(paymentTracker);
        job.paymentTrackers = paymentTrackers;
        await job.save();

        // Update job with care-off party
        careOffParties.push(careOffParty._id);
        job.careOffParties = careOffParties;
        await job.save();
      }
    }
  }

  res.send(jobLink);
});

module.exports = router;
