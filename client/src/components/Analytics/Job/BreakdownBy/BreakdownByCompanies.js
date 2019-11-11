import React, { Component } from "react";
import { Row, Table, Col } from "reactstrap";

class BreakdownByCompanies extends Component {
  render() {
    const { jobCompaniesCategory, Company } = this.props;
    switch (jobCompaniesCategory && Company) {
      case null:
        return <div></div>;
      default:
        const jobSort = [];
        let o = 0;
        const cancelledjobstotal = [];
        const openjobstotal = [];
        const completedjobstotal = [];
        const psaTotal = [];
        const jpTotal = [];
        const shipyardTotal = [];
        const othersTotal = [];
        const jobCompanieCategories = Object.keys(Company).map(
          (uniq, index) => {
            const companyData = Company[uniq][0].name;
            const cancelledJobs = [];
            const openJobs = [];
            const completedJobs = [];
            const psaJobs = [];
            const jpJobs = [];
            const shipyardJobs = [];
            const othersJobs = [];
            const jobData = Object.keys(jobCompaniesCategory).map(
              (key, index) => {
                const jobs = jobCompaniesCategory[key];
                if (uniq === key) {
                  for (let i = 0; i < jobs.length; i++) {
                    let job = jobs[i];
                    if (job.vesselLoadingLocationObj === "PSA") {
                      psaJobs.push(job);
                      psaTotal.push(job);
                    } else if (job.vesselLoadingLocationObj === "Jurong Port") {
                      jpJobs.push(job);
                      jpTotal.push(job);
                    } else if (job.vesselLoadingLocationObj === "Shipyard") {
                      shipyardJobs.push(job);
                      shipyardTotal.push(job);
                    } else {
                      othersJobs.push(job);
                      othersTotal.push(job);
                    }

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
              company: `${companyData}`,
              ongoing: `${openJobs.length}`,
              completed: `${completedJobs.length}`,
              cancelled: `${cancelledJobs.length}`,
              total: `${openJobs.length +
                completedJobs.length +
                cancelledJobs.length}`,
              psa: `${psaJobs.length}`,
              jp: `${jpJobs.length}`,
              shipyard: `${shipyardJobs.length}`,
              others: `${othersJobs.length}`
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
              <td>{job.psa}</td>
              <td>{job.jp}</td>
              <td>{job.shipyard}</td>
              <td>{job.others}</td>
            </tr>
          );
        });
        return (
          <Row>
            <Col cs="12" md={{ size: 12, offset: 0 }} className="text-center">
              <h1>Job breakdown by Companies</h1>
            </Col>
            <Col cs="12" md={{ size: 12, offset: 0 }}>
              <Table striped hover bordered responsive>
                <thead
                  style={{
                    backgroundColor: "#49AE4B",
                    color: "white",
                    textAlign: "center"
                  }}
                >
                  <tr>
                    <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Companies
                    </th>
                    <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Ongoing Jobs
                    </th>
                    <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Completed Jobs
                    </th>
                    <th
                      style={{ color: "red", verticalAlign: "middle" }}
                      rowSpan="2"
                    >
                      Cancelled Jobs
                    </th>
                    <th rowSpan="2" style={{ verticalAlign: "middle" }}>
                      Total Jobs
                    </th>
                    <th colSpan="4">Delivery Location</th>
                  </tr>
                  <tr>
                    <th>PSA Port</th>
                    <th>Jurong Port-LT</th>
                    <th>Shipyard</th>
                    <th>Others</th>
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
                    <th>{psaTotal.length} Jobs</th>
                    <th>{jpTotal.length} Jobs</th>
                    <th>{shipyardTotal.length} Jobs</th>
                    <th>{othersTotal.length} Jobs</th>
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
