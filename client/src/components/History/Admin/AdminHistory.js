import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

import JobSummaryTable from "../../Dashboard/Job/JobSummaryTable";

class AdminHistory extends Component {
  render() {
    return (
      <Container fluid style={{ marginTop: "-50px" }}>
        <br />
        <h1 className="text-center">History</h1>
        <Row>
          <Col xs="12" md={{ size: 10, offset: 1 }}>
            <JobSummaryTable user_only={false} />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default AdminHistory;
