const nodemailer = require("nodemailer");
const keys = require("../config/keys");
const Email = require("email-templates");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports = {
  sendAutomatedEmail: async (email, subject, htmlText) => {
    // Generate email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: keys.email,
        pass: keys.password
      }
    });
    const mailOptions = {
      from: keys.email,
      to: email,
      subject: subject,
      html: htmlText
    };
    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        throw err;
      }

      console.log("Email sent: " + info.response);
    });
  },
  sendSignUpEmail: async addUser => {
    // Generate email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: keys.email,
        pass: keys.password
      }
    });
    const mailOptions = {
      from: keys.email,
      to: addUser.email,
      subject: "Automated send try",
      text: "thank you for registered to our platform"
    };
    transporter.sendMail(mailOptions, async (err, info) => {
      if (err) {
        throw err;
      }
      // Do not erase - Production Logging
      console.log("Email sent: " + info.response);
    });
  },
  sendJobBookingLogisticsOrderEmail: async (job, jobAssignment) => {
    const email = new Email({
      message: {
        from: keys.SHIP_SUPPLIES_DIRECT_SALES_EMAIL
      },
      send: true,
      transport: nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: keys.SHIP_SUPPLIES_DIRECT_SALES_EMAIL,
          pass: keys.SHIP_SUPPLIES_DIRECT_SALES_EMAIL_PASSWORD
        }
      })
    });

    const items = job.jobItems;
    let itemString =
      items.length > 0 ? `${items[0].quantity} ${items[0].uom}` : "";
    for (let i = 1; i < items.length; i++) {
      const item = items[i];
      itemString += `, ${item.quantity} ${item.uom}`;
    }

    const jobOfflandItems = job.jobOfflandItems;
    let jobOfflandItemString =
      jobOfflandItems.length > 0
        ? `${jobOfflandItems[0].quantity} ${jobOfflandItems[0].uom}`
        : "";
    for (let i = 1; i < jobOfflandItems.length; i++) {
      const jobOfflandItem = jobOfflandItems[i];
      jobOfflandItemString += `, ${jobOfflandItem.quantity} ${jobOfflandItem.uom}`;
    }

    let pickupLocationsStringArray = [];
    if (job.pickupLocations === undefined) {
      job.pickupLocations = [];
    }
    for (let i = 0; i < job.pickupLocations.length; i++) {
      const pickupLocation = job.pickupLocations[i];
      pickupLocationsStringArray.push(pickupLocation.addressString);
    }

    email
      .send({
        template: "jobBookingLogisticsOrder",
        message: {
          to: jobAssignment.logisticsCompany.correspondenceEmails,
          subject: `Job booking for ${job.vessel.vesselName} IMO ${job.vessel.vesselIMOID}`,
          cc: [keys.SHIP_SUPPLIES_DIRECT_TEAM_EMAIL]
        },
        locals: {
          user: job.user,
          job,
          itemString,
          jobOfflandItemString,
          pickupLocationsStringArray,
          vesselLoadingDateTime:
            job.vesselLoadingDateTime !== ""
              ? moment(new Date(job.vesselLoadingDateTime))
                  .tz("Asia/Singapore")
                  .format("MMMM Do YYYY, h:mm:ss a")
              : "",
          psaBerthingDateTime:
            job.psaBerthingDateTime !== ""
              ? moment(new Date(job.psaBerthingDateTime))
                  .tz("Asia/Singapore")
                  .format("MMMM Do YYYY, h:mm:ss a")
              : "",
          psaUnberthingDateTime:
            job.psaUnberthingDateTime !== ""
              ? moment(new Date(job.psaUnberthingDateTime))
                  .tz("Asia/Singapore")
                  .format("MMMM Do YYYY, h:mm:ss a")
              : ""
        }
      })
      .then(console.log)
      .catch(console.error);
  }
};
