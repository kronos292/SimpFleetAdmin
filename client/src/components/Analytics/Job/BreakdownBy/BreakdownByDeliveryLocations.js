import React, { Component } from "react";
import { Row, Table, Col } from "reactstrap";

class BreakdownByDeliveryLocations extends Component {
  render() {
    const { jobDeliveryCategory } = this.props;
    switch (jobDeliveryCategory) {
      case null:
        return <div></div>;
      default:
        let itemCountOthers = 0;
        let offlandItemCountOthers = 0;
        let itemTimesOthers = 0;
        let offlandItemTimesOthers = 0;
        const cancelledJobsOthers = [];
        const openJobsOthers = [];
        const completedJobsOthers = [];
        const jobDeliveryLocationsCategories = Object.keys(
          jobDeliveryCategory
        ).map((key, index) => {
          const jobs = jobDeliveryCategory[key];
          let itemCount = 0;
          let offlandItemCount = 0;
          const cancelledJobs = [];
          const openJobs = [];
          const completedJobs = [];

          if (key === "PSA" || key === "Jurong Port") {
            for (let i = 0; i < jobs.length; i++) {
              let job = jobs[i];

              if (job.isCancelled === "Confirmed") {
                cancelledJobs.push(job);
              } else {
                if (job.jobTrackers.length === 6) {
                  completedJobs.push(job);
                } else {
                  openJobs.push(job);
                }

                const { jobItems, jobOfflandItems } = job;
                if (jobItems && jobItems.length > 0) {
                  for (let j = 0; j < jobItems.length; j++) {
                    const jobItem = jobItems[j];
                    itemCount += jobItem.quantity;
                  }
                }
                if (jobOfflandItems && jobOfflandItems.length > 0) {
                  for (let j = 0; j < jobOfflandItems.length; j++) {
                    const jobOfflandItem = jobOfflandItems[j];
                    offlandItemCount += jobOfflandItem.quantity;
                  }
                }
              }
            }
            return (
              <tr key={index}>
                <td>{key}</td>
                <td>{itemCount}</td>
                <td>{offlandItemCount}</td>
                <td>{openJobs.length}</td>
                <td>{completedJobs.length}</td>
                <td style={{ color: "red" }}>{cancelledJobs.length}</td>
                <td>{jobs.length}</td>
              </tr>
            );
          } else if (key !== "PSA" || key !== "Jurong Port") {
            for (let i = 0; i < jobs.length; i++) {
              let job = jobs[i];
              if (job.isCancelled === "Confirmed") {
                cancelledJobsOthers.push(job);
              } else {
                if (job.jobTrackers.length === 6) {
                  completedJobsOthers.push(job);
                } else {
                  openJobsOthers.push(job);
                }
                const { jobItems, jobOfflandItems } = job;
                if (jobItems && jobItems.length > 0) {
                  for (let j = 0; j < jobItems.length; j++) {
                    const jobItem = jobItems[j];
                    itemCountOthers += jobItem.quantity;
                  }
                }
                if (jobOfflandItems && jobOfflandItems.length > 0) {
                  for (let j = 0; j < jobOfflandItems.length; j++) {
                    const jobOfflandItem = jobOfflandItems[j];
                    offlandItemCountOthers += jobOfflandItem.quantity;
                  }
                }
              }
            }
          }
        });

        return (
          <Row>
            <Col cs="12" md={{ size: 12, offset: 0 }} className="text-center">
              <h1>Job breakdown by Delivery Locations</h1>
            </Col>
            <Col cs="12" md={{ size: 12, offset: 0 }}>
              <Table striped hover bordered responsive>
                <thead>
                  <tr>
                    <th>Delivery Location</th>
                    <th>No. of Pallets (Delivery)</th>
                    <th>No. of Pallets (Offland)</th>
                    <th>Ongoing Jobs</th>
                    <th>Completed Jobs</th>
                    <th>Cancelled Jobs</th>
                    <th>Total Jobs</th>
                  </tr>
                </thead>
                <tbody>
                  {jobDeliveryLocationsCategories}
                  <tr>
                    <td>Others</td>
                    <td>{itemCountOthers}</td>
                    <td>{offlandItemCountOthers}</td>
                    <td>{openJobsOthers.length}</td>
                    <td>{completedJobsOthers.length}</td>
                    <td style={{ color: "red" }}>
                      {cancelledJobsOthers.length}
                    </td>
                    <td>
                      {openJobsOthers.length +
                        completedJobsOthers.length +
                        cancelledJobsOthers.length}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        );
    }
  }
}
export default BreakdownByDeliveryLocations;
