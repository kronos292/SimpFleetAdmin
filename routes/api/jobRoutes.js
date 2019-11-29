const Joi = require("joi");
const moment = require("moment");
const passport = require("passport");
const express = require("express");
const router = express.Router();

const Job = require("simpfleet_models/models/Job");
const Vessel = require("simpfleet_models/models/Vessel");
const JobTracker = require("simpfleet_models/models/JobTracker");
const PaymentTracker = require("simpfleet_models/models/PaymentTracker");
const User = require("simpfleet_models/models/User");
const CareOffParty = require("simpfleet_models/models/CareOffParty");
const JobItem = require("simpfleet_models/models/JobItem");
const JobItemPricing = require("simpfleet_models/models/JobItemPricing");
const JobOfflandItem = require("simpfleet_models/models/JobOfflandItem");
const Notification = require("simpfleet_models/models/Notification");
const PSAVessel = require("simpfleet_models/models/PSAVessel");
const JobAssignment = require("simpfleet_models/models/JobAssignment");
const PickupLocation = require("simpfleet_models/models/PickupLocation");
const UserCompany = require("simpfleet_models/models/UserCompany");
const PickupDetail = require("simpfleet_models/models/PickupDetail");
const VesselLoadingLocation = require("simpfleet_models/models/VesselLoadingLocation");

router.get("/", async (req, res) => {
  let params = {};

  if (req.query.archive_only === "true") {
    params.isArchived = true;
  }

  if (req.query.non_archive_only === "true") {
    params.isArchived = false;
  }
  // Get all jobs
  let jobs = await Job.find(params)
    .populate({
      path: "vessel",
      model: "vessels"
    })
    .populate({
      path: "vesselLoadingLocationObj",
      model: "vesselLoadingLocations"
    })
    .populate({
      path: "vesselLoadingLocation",
      model: "vesselLoadingLocations"
    })
    .populate({
      path: "user",
      model: "users"
    })
    .populate({
      path: "jobTrackers",
      model: "jobTrackers"
    })
    .populate({
      path: "paymentTrackers",
      model: "paymentTrackers"
    })
    .populate({
      path: "pickupDetails",
      model: "pickupDetails",
      populate: [
        {
          path: "pickupLocation",
          model: "pickupLocations"
        }
      ]
    })
    .populate({
      path: "careOffParties",
      model: "careOffParties",
      populate: [
        {
          path: "job",
          model: "jobs"
        }
      ]
    })
    .populate({
      path: "jobItems",
      model: "jobItems"
    })
    .populate({
      path: "jobOfflandItems",
      model: "jobOfflandItems"
    })
    .select();

  // Search bar query filter
  if (req.query.searchBarQuery) {
    const searchBarQuery = req.query.searchBarQuery.toLowerCase();
    const filteredJobs = [];
    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      if (
        job.vessel.vesselName.toLowerCase().includes(searchBarQuery) ||
        job.vessel.vesselIMOID.toLowerCase().includes(searchBarQuery) ||
        job.vessel.vesselCallsign.toLowerCase().includes(searchBarQuery) ||
        (req.session.user &&
          job.user._id === req.session.user._id &&
          job.jobId.toLowerCase().includes(searchBarQuery))
      ) {
        filteredJobs.push(job);
      }
    }
    jobs = filteredJobs;
  }

  // Get jobs where user is a care-off party
  if (req.query.user_only === "true") {
    const careOffParties = await CareOffParty.find({
      user: req.session.user._id
    })
      .populate({
        path: "job",
        model: "jobs",
        populate: [
          {
            path: "vessel",
            model: "vessels"
          },
          {
            path: "user",
            model: "users",
            populate: {
              path: "userCompany",
              model: "userCompanies"
            }
          },
          {
            path: "jobTrackers",
            model: "jobTrackers"
          },
          {
            path: "paymentTrackers",
            model: "paymentTrackers"
          },
          {
            path: "careOffParties",
            model: "careOffParties",
            populate: [
              {
                path: "job",
                model: "jobs"
              }
            ]
          },
          {
            path: "jobItems",
            model: "jobItems"
          },
          {
            path: "jobOfflandItems",
            model: "jobOfflandItems"
          }
        ]
      })
      .select();
    for (let i = 0; i < careOffParties.length; i++) {
      const careOffParty = careOffParties[i];
      jobs.push(careOffParty.job);
    }
  }

  // Get jobs that belong to the user company
  if (req.query.user_only === "true") {
    const filteredJobs = [];
    for (let i = 0; i < jobs.length; i++) {
      const job = jobs[i];
      const userCompany = job.user.userCompany;
      if (String(userCompany._id) === String(req.session.user.userCompany)) {
        filteredJobs.push(job);
      }
    }
    jobs = filteredJobs;
  }

  // Sort and limit jobs
  jobs = jobs.sort((a, b) => {
    return (
      new Date(b.jobBookingDateTime.toString()) -
      new Date(a.jobBookingDateTime.toString())
    );
  });

  const numLimit =
    req.query.numLimit && req.query.numLimit !== "false"
      ? parseInt(req.query.numLimit)
      : jobs.length;
  let filteredJobs = [];
  for (let i = 0; i < jobs.length; i++) {
    if (i < numLimit) {
      filteredJobs.push(jobs[i]);
    } else {
      break;
    }
  }

  //Check for tomorrows jobs
  if (req.query.tomorrow_only && req.query.tomorrow_only === "true") {
    const jobsTomorrow = [];
    for (let i = 0; i < filteredJobs.length; i++) {
      let filteredJob = filteredJobs[i];
      let loadingDateTime = null;
      if (
        filteredJob.vesselLoadingLocation === "PSA" &&
        filteredJob.psaBerthingDateTime !== null
      ) {
        loadingDateTime = filteredJob.psaBerthingDateTime;
      } else {
        loadingDateTime = filteredJob.vesselLoadingDateTime;
      }
      if (
        moment(loadingDateTime).isAfter(moment().endOf("day")) &&
        moment(loadingDateTime).isBefore(
          moment()
            .add(1, "days")
            .endOf("day")
        )
      ) {
        jobsTomorrow.push(filteredJob);
      }
    }
    return res.send(jobsTomorrow);
  }

  res.send(filteredJobs);
});

router.get("/index", async (req, res) => {
  const job = await Job.findOne({ index: req.query.index })
    .populate({
      path: "vessel",
      model: "vessels"
    })
    .populate({
      path: "user",
      model: "users"
    })
    .populate({
      path: "jobTrackers",
      model: "jobTrackers"
    })
    .populate({
      path: "paymentTrackers",
      model: "paymentTrackers"
    })
    .populate({
      path: "careOffParties",
      model: "careOffParties",
      populate: [
        {
          path: "job",
          model: "jobs"
        },
        {
          path: "jobItems",
          model: "jobItems"
        },
        {
          path: "jobOfflandItems",
          model: "jobOfflandItems"
        }
      ]
    })
    .populate({
      path: "jobItems",
      model: "jobItems"
    })
    .populate({
      path: "jobOfflandItems",
      model: "jobOfflandItems"
    })
    .populate({
      path: "vesselLoadingLocationObj",
      model: "vesselLoadingLocations"
    })
    .select();
  res.send(job);
});

router.post("/", async (req, res) => {
  // const { error } = validateJob(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let {
    jobId,
    vesselIMOID,
    vesselName,
    vesselCallsign,
    vesselLoadingLocation,
    vesselArrivalDateTime,
    jobItems,
    jobOfflandItems,
    careOffParties,
    remarks,
    psaBerthingDateTime,
    psaUnberthingDateTime,
    vesselLoadingDateTime,
    createDSA,
    vesselLighterName,
    vesselLighterLocation,
    vesselLighterRemarks,
    otherVesselLocation
  } = req.body;

  let psaBerf = "";

  // Set default Lighter terminal for Jurong Port
  if (vesselLoadingLocation === "Jurong Port" && vesselLighterLocation === "") {
    vesselLighterLocation = "Marina South Wharves";
  }

  let vessel = await Vessel.findOne({ vesselIMOID }).select();
  if (vessel === null) {
    vessel = new Vessel({
      vesselIMOID,
      vesselName,
      vesselCallsign
    });
    await vessel.save();
  }

  // Get PSA berthing date and time if job is in PSA
  if (vesselLoadingLocation === "PSA") {
    let psaVessels = await PSAVessel.find({
      vesselIMO: vesselIMOID,
      actualUnberthTime: null
    }).select();
    if (psaVessels.length > 0) {
      psaVessels = psaVessels.sort((a, b) => {
        const berthTimeB =
          b.estimatedBerthTime !== null
            ? b.estimatedBerthTime
            : b.requiredBerthTime;
        const berthTimeA =
          a.estimatedBerthTime !== null
            ? a.estimatedBerthTime
            : a.requiredBerthTime;
        return berthTimeB - berthTimeA;
      });
      const latestPSAVessel = psaVessels[0];
      psaBerthingDateTime =
        latestPSAVessel.estimatedBerthTime !== null
          ? latestPSAVessel.estimatedBerthTime
          : latestPSAVessel.requiredBerthTime;
      psaUnberthingDateTime =
        latestPSAVessel.estimatedUnberthTime !== null
          ? latestPSAVessel.estimatedUnberthTime
          : latestPSAVessel.requiredUnberthTime;
      psaBerf = latestPSAVessel.berf;
    } else {
      psaBerthingDateTime = null;
      psaUnberthingDateTime = null;
    }
  } else {
    psaBerthingDateTime = null;
    psaUnberthingDateTime = null;
  }

  // Create job tracker
  const jobTracker = new JobTracker({
    index: 1,
    timestamp: new Date().toString(),
    trackingType: "Electronic",
    title: "Job booking pending confirmation",
    description:
      "We have received your job booking and are currently checking the details. We will send you a confirmation email once everything is verified.",
    remarks: ""
  });

  // Create Payment status
  const paymentTracker = new PaymentTracker({
    index: 1,
    label: "Not Yet Invoiced",
    timestamp: new Date().toString(),
    user: await User.findOne({ _id: req.session.user.id }).select()
  });

  // Create new job
  const jobCount = (await Job.count({})) + 1;
  const job = new Job({
    jobId: jobId !== "" ? jobId : `SSDE-${jobCount}`,
    vessel,
    vesselLoadingLocation:
      vesselLoadingLocation === "Others"
        ? otherVesselLocation
        : vesselLoadingLocation,
    vesselArrivalDateTime,
    user: await User.findOne({ _id: req.session.user.id }).select(),
    index: `OJ${jobCount}`,
    jobTrackers: [jobTracker],
    paymentTrackers: [paymentTracker],
    remarks,
    psaBerthingDateTime,
    psaUnberthingDateTime,
    vesselLoadingDateTime,
    createDSA,
    vesselLighterName,
    vesselLighterLocation,
    vesselLighterRemarks,
    psaBerf
  });
  await job.save();

  // Create job items
  const jobItemObjs = [];

  for (let i = 0; i < jobItems.length; i++) {
    const jobItem = jobItems[i];
    const jobItemObj = new JobItem({
      job: job._id,
      ...jobItem
    });
    const jobItemPricing = await JobItemPricing.findOne({
      uom: jobItemObj.uom
    }).select();
    jobItemObj.price = jobItemPricing.price;
    await jobItemObj.save();
    jobItemObjs.push(jobItemObj);
  }

  // Create job offland items if any
  const jobOfflandItemObjs = [];
  for (let i = 0; i < jobOfflandItems.length; i++) {
    const jobOfflandItem = jobOfflandItems[i];
    const jobOfflandItemObj = new JobOfflandItem({
      job: job._id,
      ...jobOfflandItem
    });
    await jobOfflandItemObj.save();
    jobOfflandItemObjs.push(jobOfflandItemObj);
  }

  // Create Care-off Parties if any
  const careOffPartyObjs = [];
  for (let i = 0; i < careOffParties.length; i++) {
    const careOffParty = careOffParties[i];
    const careOffPartyObj = new CareOffParty({
      job: job._id,
      ...careOffParty
    });
    await careOffPartyObj.save();
    careOffPartyObjs.push(careOffPartyObj);
  }

  // Save additional attributes to job
  job.jobItems = jobItemObjs;
  job.jobOfflandItems = jobOfflandItemObjs;
  job.careOffParties = careOffPartyObjs;
  await job.save();

  // Update job tracker with job id
  jobTracker.job = job._id;
  await jobTracker.save();

  // Update payment tracker with job id
  paymentTracker.job = job._id;
  await paymentTracker.save();

  // Create job assignment
  const jobAssignment = new JobAssignment({
    job,
    status: "Pending"
  });
  await jobAssignment.save();

  // Notify user of successful job booking, but need to wait for verification and confirmation
  // await emailMethods.sendUserJobConfirmationEmail(job);

  // Notify admin email of successful job booking, and the need for verification and confirmation
  // await emailMethods.sendJobBookingAdminConfirmationEmail(job);

  // Create Email Notification for job document upload reminder T-24 hrs
  let notification = new Notification({
    user: req.session.user.id,
    job,
    callTime: moment(new Date(job.vesselArrivalDateTime)).subtract(24, "hours"),
    isEmail: true,
    type: "userJobDocUploadReminder"
  });
  await notification.save();

  res.send(job);
});

router.put("/", async (req, res) => {
  const { job, sendEmailUpdate } = req.body;
  const { jobItems, jobOfflandItems, isCancelled, isArchived } = job;

  // Create or update job items
  const jobItemObjs = [];
  for (let i = 0; i < jobItems.length; i++) {
    const jobItem = jobItems[i];
    let jobItemObj = await JobItem.findOne({ _id: jobItem._id }).select();
    if (jobItemObj === null) {
      jobItemObj = new JobItem({
        ...jobItem,
        job: job._id
      });
      await jobItemObj.save();
    } else {
      jobItemObj = {
        ...jobItem
      };
      await JobItem.findByIdAndUpdate(jobItem._id, jobItemObj);
    }
    jobItemObjs.push(jobItemObj);
  }

  // Create or update job offland items
  const jobOfflandItemObjs = [];
  for (let i = 0; i < jobOfflandItems.length; i++) {
    const jobOfflandItem = jobOfflandItems[i];
    let jobOfflandItemObj = await JobOfflandItem.findOne({
      _id: jobOfflandItem._id
    }).select();
    if (jobOfflandItemObj === null) {
      jobOfflandItemObj = new JobOfflandItem({
        ...jobOfflandItem,
        job: job._id
      });
      await jobOfflandItemObj.save();
    } else {
      jobOfflandItemObj = {
        ...jobOfflandItem
      };
      await JobOfflandItem.findByIdAndUpdate(
        jobOfflandItem._id,
        jobOfflandItemObj
      );
    }
    jobOfflandItemObjs.push(jobOfflandItemObj);
  }

  // Update job in database
  await Job.findByIdAndUpdate(job._id, {
    ...job,
    jobItems: jobItemObjs,
    jobOfflandItems: jobOfflandItemObjs,
    isCancelled: isCancelled,
    isArchived: isArchived
  });

  // Send email to notify logistics party of job booking update
  /* if (Boolean(sendEmailUpdate) && job.isCancelled !== 'Pending' && job.isCancelled !== 'Confirmed') {
        await emailMethods.sendJobBookingLogisticsUpdateEmail(job);
    } */

  // Update ops google calendar
  if (
    process.env.NODE_ENV === "production" &&
    ((job.psaBerthingDateTime !== "" &&
      job.psaBerthingDateTime !== null &&
      job.psaUnberthingDateTime !== "" &&
      job.psaUnberthingDateTime !== null) ||
      (job.vesselLoadingDateTime !== "" && job.vesselLoadingDateTime !== null))
  ) {
    try {
      const res = await googleCalendarMethods.updateJobCalendarDetails(job);
      job.googleCalendarId = res.id;
      await job.save();
    } catch (err) {
      console.log(err);
    }
  }

  // Deactivate old email notifications
  const notifications = await Notification.find({ job: job._id }).select();
  for (let i = 0; i < notifications.length; i++) {
    const notification = notifications[i];
    notification.isActive = false;
    await notification.save();
  }

  // Create Email Notification for job document upload reminder T-24 hrs
  let notification = new Notification({
    user: job.user,
    job,
    callTime: moment(new Date(job.vesselArrivalDateTime)).subtract(24, "hours"),
    isEmail: true,
    type: "userJobDocUploadReminder"
  });
  await notification.save();

  // Send job booking update info to 3PL telegram chat
  if (
    Boolean(sendEmailUpdate) &&
    job.isCancelled !== "Pending" &&
    job.isCancelled !== "Confirmed"
  ) {
    //await telegramBotMethods.sendJobBookingUpdateInfo(job);
  }

  res.send(job);
});

// Validate job
validateJob = function(req) {
  const schema = {
    jobId: Joi.string().required(),
    vesselIMOID: Joi.string().required(),
    vesselName: Joi.string().required(),
    vesselCallsign: Joi.string().required(),
    vesselLoadingLocation: Joi.object().required(),
    vesselArrivalDateTime: Joi.date().required(),
    items: Joi.required()
  };

  return Joi.validate(req, schema);
};

module.exports = router;
