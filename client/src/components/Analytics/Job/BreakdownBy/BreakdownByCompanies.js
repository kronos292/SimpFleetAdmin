import React, { Component } from "react";
import { Row, Table, Col } from "reactstrap";

class BreakdownByCompanies extends Component {
  render() {
    const { jobMonthCategory } = this.props;
    switch (jobMonthCategory) {
      case null:
        return <div></div>;
      default:
        const jobCompaniesCategories = Object.keys(jobMonthCategory).map(
          (key, index) => {
            const jobs = jobMonthCategory[key];
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
              }
            }

            return (
              <tr key={index}>
                <td>{key}</td>
                <td>-</td>
                <td>{openJobs.length}</td>
                <td>{completedJobs.length}</td>
                <td style={{ color: "red" }}>{cancelledJobs.length}</td>
                <td>{jobs.length}</td>
              </tr>
            );
          }
        );

        return (
          <Row>
            <Col cs="12" md={{ size: 12, offset: 0 }} className="text-center">
              <h1>Job breakdown by Companies</h1>
            </Col>
            <Col cs="12" md={{ size: 12, offset: 0 }}>
              <Table striped hover bordered responsive>
                <tr>
                  <th>Month</th>
                  <th>Companies</th>
                  <th>Ongoing Jobs</th>
                  <th>Completed Jobs</th>
                  <th>Cancelled Jobs</th>
                  <th>Total Jobs</th>
                </tr>
                {jobCompaniesCategories}
              </Table>
            </Col>
          </Row>
        );
    }
  }
}
export default BreakdownByCompanies;
