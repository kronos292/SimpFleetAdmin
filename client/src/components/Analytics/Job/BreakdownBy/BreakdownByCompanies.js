import React, { Component } from "react";
import { Row, Table, Col } from "reactstrap";

class BreakdownByCompanies extends Component {
  render() {
    const { jobCompaniesCategory, Company } = this.props;
    switch (jobCompaniesCategory && Company) {
      case null:
        return <div></div>;
      default:
        let jobSort = [];
        let o = 0;
        const cancelledjobstotal = [];
        const openjobstotal = [];
        const completedjobstotal = [];
        const jobCompanieCategories = Object.keys(Company).map(
          (uniq, index) => {
            const cancelledJobs = [];
            const openJobs = [];
            const completedJobs = [];
            const jobData = Object.keys(jobCompaniesCategory).map(
              (key, index) => {
                const jobs = jobCompaniesCategory[key];
                if (uniq === key) {
                  for (let i = 0; i < jobs.length; i++) {
                    let job = jobs[i];

                    if (job.isCancelled === "Confirmed") {
                      cancelledJobs.push(job);
                      cancelledjobstotal.push(job);
                    } else {
                      if (job.jobTrackers.length === 6) {
                        completedJobs.push(job);
                        completedjobstotal.push(job);
                      } else {
                        openJobs.push(job);
                        openjobstotal.push(job);
                      }
                    }
                  }
                }
              }
            );
            const sortJob = {
              id: `${o++}`,
              company: `${uniq}`,
              ongoing: `${openJobs.length}`,
              completed: `${completedJobs.length}`,
              cancelled: `${cancelledJobs.length}`,
              total: `${openJobs.length +
                completedJobs.length +
                cancelledJobs.length}`
            };
            jobSort.push(sortJob);
          }
        );
        jobSort.sort((a, b) => {
          return b.total - a.total;
        });
        const fillData = jobSort.map(job => {
          return (
            <tr key={job.id}>
              <td>{job.company}</td>
              <td>{job.ongoing}</td>
              <td>{job.completed}</td>
              <td style={{ color: "red" }}>{job.cancelled}</td>
              <td>{job.total}</td>
            </tr>
          );
        });
        console.log(jobSort);
        return (
          <Row>
            <Col cs="12" md={{ size: 12, offset: 0 }} className="text-center">
              <h1>Job breakdown by Companies</h1>
            </Col>
            <Col cs="12" md={{ size: 12, offset: 0 }}>
              <Table striped hover bordered responsive>
                <thead>
                  <tr style={{ backgroundColor: "#49AE4B", color: "white" }}>
                    <th>Companies</th>
                    <th>Ongoing Jobs</th>
                    <th>Completed Jobs</th>
                    <th style={{ color: "red" }}>Cancelled Jobs</th>
                    <th>Total Jobs</th>
                  </tr>
                </thead>
                <tbody>{fillData}</tbody>
                <br />
                <tfoot>
                  <tr>
                    <th>Total</th>
                    <th>{openjobstotal.length} Jobs</th>
                    <th>{completedjobstotal.length} Jobs</th>
                    <th style={{ color: "red" }}>
                      {cancelledjobstotal.length} Jobs
                    </th>
                    <th>
                      {openjobstotal.length +
                        completedjobstotal.length +
                        cancelledjobstotal.length}{" "}
                      Jobs
                    </th>
                  </tr>
                </tfoot>
              </Table>
            </Col>
          </Row>
        );
    }
  }
}
export default BreakdownByCompanies;
