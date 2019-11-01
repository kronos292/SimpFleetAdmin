import React, { Component } from "react";
import { Row, Table, Col } from "reactstrap";
import Chart from "chart.js";

class BreakdownByMonth extends Component {
  render() {
    const { jobMonthCategory } = this.props;
    switch (jobMonthCategory) {
      case null:
        return <div></div>;
      default:
        const jobMonthCategories = Object.keys(jobMonthCategory).map(
          (key, index) => {
            const jobs = jobMonthCategory[key];
            let itemCount = 0;
            let offlandItemCount = 0;
            let itemTimes = 0;
            let offlandItemTimes = 0;
            const cancelledJobs = [];
            const openJobs = [];
            const completedJobs = [];
            for (let i = 0; i < jobs.length; i++) {
              const job = jobs[i];

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
                  itemTimes++;
                  for (let j = 0; j < jobItems.length; j++) {
                    const jobItem = jobItems[j];
                    itemCount += jobItem.quantity;
                  }
                }
                if (jobOfflandItems && jobOfflandItems.length > 0) {
                  offlandItemTimes++;
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
                <td>{jobs.length}</td>
                <td style={{ color: "red" }}>{cancelledJobs.length}</td>
                <td>{openJobs.length}</td>
                <td>{completedJobs.length}</td>
                <td>{itemCount}</td>
                <td>
                  {itemCount === 0 ? "0" : (itemCount / itemTimes).toFixed(2)}
                </td>
                <td>{offlandItemCount}</td>
                <td>
                  {offlandItemCount === 0
                    ? "0"
                    : (offlandItemCount / offlandItemTimes).toFixed(2)}
                </td>
              </tr>
            );
          }
        );

        return (
          <Row>
            <Col cs="12" md={{ size: 12, offset: 0 }} className="text-center">
              <h1>Job breakdown by month</h1>
            </Col>
            <Col cs="12" md={{ size: 12, offset: 0 }}>
              <Table striped hover bordered responsive>
                <thead>
                  <tr style={{ backgroundColor: "#49AE4B", color: "white" }}>
                    <th>Month</th>
                    <th>Total jobs</th>
                    <th style={{ color: "red" }}>Cancelled jobs</th>
                    <th>Ongoing jobs</th>
                    <th>Completed jobs</th>
                    <th>No. of Pallets (Delivery)</th>
                    <th>Avg No. of Pallets per Delivery</th>
                    <th>No. of Pallets (Offland)</th>
                    <th>Avg No. of Pallets per Offland</th>
                  </tr>
                </thead>
                <tbody>{jobMonthCategories}</tbody>
              </Table>
            </Col>
          </Row>
        );
    }
  }
}
export default BreakdownByMonth;
