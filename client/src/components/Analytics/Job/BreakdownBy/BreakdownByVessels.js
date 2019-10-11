import React, { Component } from "react";
import { Row, Table, Col } from "reactstrap";

class BreakdownByVessels extends Component {
  render() {
    return (
      <Row>
        <Col cs="12" md={{ size: 12, offset: 0 }} className="text-center">
          <h1>Job breakdown by Vessels</h1>
        </Col>
        <Col cs="12" md={{ size: 12, offset: 0 }}>
          <Table striped hover bordered responsive>
            <tr>
              <th>Month</th>
              <th>Vessels Name</th>
              <th>Vessels IMO</th>
              <th>Vessels Callsign</th>
              <th>Ongoing Jobs</th>
              <th>Completed Jobs</th>
              <th>Cancelled Jobs</th>
              <th>Total Jobs</th>
            </tr>
          </Table>
        </Col>
      </Row>
    );
  }
}
export default BreakdownByVessels;
