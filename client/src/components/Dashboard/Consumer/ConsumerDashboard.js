import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

import JobSummaryTable from "../Job/JobSummaryTable";
import SidebarMenu from "../../SidebarMenu/SidebarMenu";
import MediaQuery from "react-responsive";

class ConsumerDashboard extends Component {
  render() {
    return (
      <Container fluid>
        <MediaQuery minWidth={769}>
          <Row>
            <Col xs="2">
              <SidebarMenu />
            </Col>
            <Col xs="10">
              <Row>
                <Col xs="12" style={{ padding: "0 40px" }}>
                  <h3 className="job-summary-header">Dashboard</h3>
                  <JobSummaryTable
                    user_only={true}
                    allowArchive={true}
                    button={true}
                    non_archive_only={true}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </MediaQuery>
        <MediaQuery maxWidth={768}>
          <Row>
            <Col xs="12" style={{ padding: "20px 10px" }}>
              {/*<h3 className='job-summary-header'>Dashboard</h3>*/}
              <JobSummaryTable
                user_only={true}
                allowArchive={true}
                button={true}
                non_archive_only={true}
                title="Dashboard"
              />
            </Col>
          </Row>
        </MediaQuery>
      </Container>
    );
  }
}
export default ConsumerDashboard;
