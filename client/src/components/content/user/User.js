import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

import "../../Job/CreateJobModal.css";
import "../../SidebarMenu/SidebarMenu.css";
import SidebarMenu from "../../SidebarMenu/SidebarMenu";
import JobSummaryTable from "../../Dashboard/Job/JobSummaryTable";

import MediaQuery from "react-responsive";

class User extends Component {
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
                  <h3 className="job-summary-header">Upcoming Jobs</h3>
                  <JobSummaryTable
                    numLimit={5}
                    user_only={true}
                    allowArchive={false}
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
              <JobSummaryTable
                numLimit={5}
                user_only={true}
                allowArchive={false}
                button={true}
                title="Upcoming Jobs"
              />
            </Col>
          </Row>
        </MediaQuery>
      </Container>
    );
  }
}
export default User;
