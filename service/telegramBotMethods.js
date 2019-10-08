const telegram = require("telegram-bot-api");
const moment = require("moment-timezone");

const keys = require("../config/keys");

const JobAssignment = require("simpfleet_models/models/JobAssignment");

const api = new telegram({
  token: keys.SIMPFLEET_TELEGRAM_BOT_TOKEN
});

async function formJobMessage(job, status) {
  const heading = status === "Update" ? "Job Update" : "New job";

  const vessel = job.vessel;

  const vesselLoadingDateTime =
    job.vesselLoadingDateTime !== "" && job.vesselLoadingDateTime !== null
      ? moment(new Date(job.vesselLoadingDateTime))
          .tz("Asia/Singapore")
          .format("MMMM Do YYYY, h:mm:ss a")
      : "";
  const psaBerthingDateTime =
    job.psaBerthingDateTime !== "" && job.psaBerthingDateTime !== null
      ? moment(new Date(job.psaBerthingDateTime))
          .tz("Asia/Singapore")
          .format("MMMM Do YYYY, h:mm:ss a")
      : "";
  const psaUnberthingDateTime =
    job.psaUnberthingDateTime !== "" && job.psaUnberthingDateTime !== null
      ? moment(new Date(job.psaUnberthingDateTime))
          .tz("Asia/Singapore")
          .format("MMMM Do YYYY, h:mm:ss a")
      : "";

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

  let messageString = `${heading} for ${vessel.vesselName}: \n\n`;
  messageString += `Job Number: ${job.jobId}\n`;
  messageString += `Vessel Name: ${vessel.vesselName}\n`;
  messageString += `Vessel IMO: ${vessel.vesselIMOID}\n`;
  messageString += `Vessel Callsign: ${vessel.vesselCallsign}\n`;
  messageString += `Items to Deliver: ${itemString}\n`;
  if (jobOfflandItemString !== "") {
    messageString += `Items to Offland: ${jobOfflandItemString}\n`;
  }
  if (job.vesselLoadingLocation === "PSA") {
    messageString += `Vessel Loading Location: ${job.vesselLoadingLocation}\n`;
    if (job.psaBerf !== "") {
      messageString += `Berth: ${job.psaBerf}\n`;
    }
    if (job.psaBerthingDateTime !== "" && job.psaBerthingDateTime !== null) {
      messageString += `Vessel Estimated Berthing Time: ${psaBerthingDateTime}\n`;
    }
    if (
      job.psaUnberthingDateTime !== "" &&
      job.psaUnberthingDateTime !== null
    ) {
      messageString += `Vessel Estimated Unberthing Time: ${psaUnberthingDateTime}\n`;
    }
  } else if (job.vesselLoadingLocation === "Jurong Port") {
    messageString += `Vessel Loading Location: ${job.vesselLighterLocation}\n`;
    if (job.vesselLighterName !== "") {
      messageString += `Vessel Lighter Name: ${job.vesselLighterName}\n`;
    }
    if (job.vesselLighterRemarks !== "") {
      messageString += `Vessel Lighter Remarks: ${job.vesselLighterRemarks}\n`;
    }
    if (job.vesselLoadingDateTime !== "") {
      messageString += `Lighter Loading Date & Time: ${vesselLoadingDateTime}\n`;
    }
  } else {
    messageString += `Vessel Loading Location: ${job.vesselLoadingLocation}\n`;
    if (job.vesselLoadingDateTime !== "") {
      messageString += `Vessel Loading Date & Time: ${vesselLoadingDateTime}\n`;
    }
  }
  if (job.createDSA) {
    messageString += `Please help us to create a DSA for the Job Items.\n`;
  }
  if (job.remarks !== "") {
    messageString += `Remarks:\n`;
    const remarksArray = job.remarks.split("\n");
    for (let i = 0; i < remarksArray.length; i++) {
      messageString += `${remarksArray[i]}\n`;
    }
  }
  return messageString;
}

async function documentCreationMessage(jobFile, job) {
  const { numCopies, requirements, remarks } = jobFile;
  let text = `A new document has been created for job ${job.jobId}\n\n`;
  let needPrintCopy = false;
  for (let i = 0; i < requirements.length; i++) {
    const requirement = requirements[i];
    const { key, check } = requirement;
    if (key === "needPrintCopy" && check) {
      needPrintCopy = true;
      text += `Please help to print ${numCopies} copies.\n`;
    } else if (key === "signAndReturn" && check) {
      text += `The document needs to be signed and returned.\n`;
    }
  }
  if (remarks !== "NIL") {
    text += "Remarks: " + remarks + "\n";
  }
  const message = await api.sendMessage({
    chat_id: keys.SIMPFLEET_TELEGRAM_CHAT_ID,
    text
  });
  if (needPrintCopy) {
    await api.sendDocument({
      chat_id: keys.SIMPFLEET_TELEGRAM_CHAT_ID,
      document: jobFile.fileURL,
      reply_to_message_id: message.message_id
    });
  }
}

module.exports = {
  sendJobBookingInfo: async job => {
    const jobDetails = await formJobMessage(job, "Create");

    // Get job assignment and logistics company
    const jobAssignment = await JobAssignment.findOne({ job: job._id })
      .populate({
        path: "logisticsCompany",
        model: "logisticsCompanies"
      })
      .select();
    const { logisticsCompany } = jobAssignment;

    // Send job details to company designated group chat
    await api.sendMessage({
      chat_id: logisticsCompany.telegramGroupChatId,
      text: jobDetails
    });
  },
  sendJobBookingUpdateInfo: async job => {
    const jobDetails = await formJobMessage(job, "Update");

    // Get job assignment and logistics company
    const jobAssignment = await JobAssignment.findOne({ job: job._id })
      .populate({
        path: "logisticsCompany",
        model: "logisticsCompanies"
      })
      .select();
    const { logisticsCompany } = jobAssignment;

    // Send job details to company designated group chat
    await api.sendMessage({
      chat_id: logisticsCompany.telegramGroupChatId,
      text: jobDetails
    });
  },
  documentCreationMessage
};
