import React, { Component } from "react";
import { Row, Table, Col } from "reactstrap";

class BreakdownByVessels extends Component {
  render() {
    const { jobVesselsCategory, Vessel } = this.props;
    switch (jobVesselsCategory && Vessel) {
      case null:
        return <div></div>;
      default:
        let jobSort = [];
        let o = 0;
        const cancelledJobstotal = [];
        const openJobstotal = [];
        const completedJobstotal = [];
        let cancelledJobsOthers = 0;
        let openJobsOthers = 0;
        let completedJobsOthers = 0;
        const vessels = Vessel.map(vessel => {
          const jobVesselCategories = Object.keys(jobVesselsCategory).map(
            (key, index) => {
              const jobs = jobVesselsCategory[key];
              const cancelledJobs = [];
              const openJobs = [];
              const completedJobs = [];
              if (key === vessel._id) {
                for (let i = 0; i < jobs.length; i++) {
                  const job = jobs[i];

                  if (job.isCancelled === "confirmed") {
                    cancelledJobs.push(job);
                    cancelledJobstotal.push(job);
                  } else {
                    if (job.jobTrackers.length === 6) {
                      completedJobs.push(job);
                      completedJobstotal.push(job);
                    } else {
                      openJobs.push(job);
                      openJobstotal.push(job);
                    }
                  }
                }
                const sortJob = {
                  id: `${o++}`,
                  vessel: `${vessel.vesselName}`,
                  vesselIMO: `${vessel.vesselIMOID}`,
                  vesselCallsign: `${vessel.vesselCallsign}`,
                  ongoing: `${openJobs.length}`,
                  completed: `${completedJobs.length}`,
                  cancelled: `${cancelledJobs.length}`,
                  total: `${openJobs.length +
                    completedJobs.length +
                    cancelledJobs.length}`
                };
                jobSort.push(sortJob);
              }
            }
          );
        });

        jobSort.sort((a, b) => {
          return b.total - a.total;
        });
        const fillData = jobSort.map((job, index) => {
          if (index < 50) {
            return (
              <tr key={job.id}>
                <td>{job.vessel ? job.vessel : "-"}</td>
                <td>{job.vesselIMO}</td>
                <td>{job.vesselCallsign ? job.vesselCallsign : "-"}</td>
                <td>{job.ongoing}</td>
                <td>{job.completed}</td>
                <td style={{ color: "red" }}>{job.cancelled}</td>
                <td>{job.total}</td>
              </tr>
            );
          } else {
            openJobsOthers += parseInt(job.ongoing);
            completedJobsOthers += parseInt(job.completed);
            cancelledJobsOthers += parseInt(job.cancelled);
          }
        });

        return (
          <Row>
            <Col cs="12" md={{ size: 12, offset: 0 }} className="text-center">
              <h1>Job breakdown by Vessels</h1>
            </Col>
            <Col cs="12" md={{ size: 12, offset: 0 }}>
              <Table striped hover bordered responsive>
                <thead>
                  <tr
                    style={{
                      backgroundColor: "#49AE4B",
                      color: "white",
                      textAlign: "center"
                    }}
                  >
                    <th>Vessels Name</th>
                    <th>Vessels IMO</th>
                    <th>Vessels Callsign</th>
                    <th>Ongoing Jobs</th>
                    <th>Completed Jobs</th>
                    <th>Cancelled Jobs</th>
                    <th>Total Jobs</th>
                  </tr>
                </thead>
                <tbody>
                  {fillData}
                  <tr>
                    <td>Others</td>
                    <td></td>
                    <td></td>
                    <td>{openJobsOthers}</td>
                    <td>{completedJobsOthers}</td>
                    <td style={{ color: "red" }}>{cancelledJobsOthers}</td>
                    <td>
                      {openJobsOthers +
                        completedJobsOthers +
                        cancelledJobsOthers}
                    </td>
                  </tr>
                </tbody>
                <br />
                <tfoot>
                  <tr>
                    <th colSpan="3">Total</th>
                    <th>{openJobstotal.length} Jobs</th>
                    <th>{completedJobstotal.length} Jobs</th>
                    <th style={{ color: "red" }}>
                      {cancelledJobstotal.length} jobs
                    </th>
                    <th>
                      {openJobstotal.length +
                        completedJobstotal.length +
                        cancelledJobstotal.length}{" "}
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
export default BreakdownByVessels;
