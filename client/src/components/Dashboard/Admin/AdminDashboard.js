import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

import JobSummaryTable from "../Job/JobSummaryTable";

class AdminDashboard extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="12">
            <JobSummaryTable user_only={false} page={1} limit={5} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminDashboard;
