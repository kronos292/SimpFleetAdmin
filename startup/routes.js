module.exports = function(app) {
  app.use("/api/users", require("../routes/api/users"));
  app.use("/api/jobs", require("../routes/api/jobRoutes"));
  app.use("/api/job_files", require("../routes/api/jobFileRoutes"));
  app.use(
    "/api/job_item_pricing",
    require("../routes/api/jobItemPricingRoutes")
  );
  app.use(
    "/api/job_offland_item_pricing",
    require("../routes/api/jobOfflandItemPricingRoutes")
  );
  app.use("/api/job_links", require("../routes/api/jobLinkRoutes"));
  app.use("/api/vessels", require("../routes/api/vesselRoutes"));
  app.use("/api/care_off", require("../routes/api/careOffPartyRoutes"));
  /*
  app.use("/api/job_trackers", require("../routes/api/jobTrackerRoutes"));
  app.use("/api/payment_trackers", require("../routes/api/paymentTrackerRoutes"));
  app.use("/api/job_assignments", require("../routes/api/jobAssignmentRoutes"));
  app.use("/api/logistics_companies", require("../routes/api/logisticsCompanyRoutes"));
  */
};
