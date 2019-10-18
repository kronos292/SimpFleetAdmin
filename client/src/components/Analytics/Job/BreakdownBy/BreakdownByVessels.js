import React, { Component } from "react";
import { Row, Table, Col } from "reactstrap";

class BreakdownByVessels extends Component {
  render() {
    const { jobVesselCategory } = this.props;
    switch (jobVesselCategory) {
      case null:
        return <div></div>;
      default:
        const jobVesselCategories = Object.keys(jobVesselCategory).map(
          (key, index) => {
            const jobs = jobVesselCategory[key];
            const cancelledJobs = [];
            const openJobs = [];
            const completedJobs = [];
            for (let i = 0; i < jobs.length; i++) {
              const job = jobs[i];
            }

            return (
              <tr key={index}>
                <td>{key}</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td style={{ color: "red" }}>-</td>
                <td>-</td>
              </tr>
            );
          }
        );

        return (
          <Row>
            <Col cs="12" md={{ size: 12, offset: 0 }} className="text-center">
              <h1>Job breakdown by Vessels</h1>
            </Col>
            <Col cs="12" md={{ size: 12, offset: 0 }}>
              <Table striped hover bordered responsive>
                <thead>
                  <tr>
                    <th>Vessels Name</th>
                    <th>Vessels IMO</th>
                    <th>Vessels Callsign</th>
                    <th>Ongoing Jobs</th>
                    <th>Completed Jobs</th>
                    <th>Cancelled Jobs</th>
                    <th>Total Jobs</th>
                  </tr>
                </thead>
                <tbody>{jobVesselCategories}</tbody>
              </Table>
            </Col>
          </Row>
        );
    }
  }
}
export default BreakdownByVessels;
