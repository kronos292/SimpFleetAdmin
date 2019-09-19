import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

import JobSummaryTable from "../../Dashboard/Job/JobSummaryTable";
import SidebarMenu from "../../SidebarMenu/SidebarMenu";
import MediaQuery from "react-responsive";

class UserHistory extends Component {
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
                  <h3 className="job-summary-header">History</h3>
                  <JobSummaryTable
                    user_only={true}
                    button={false}
                    archive_only={true}
                    allowArchive={false}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </MediaQuery>
        <MediaQuery maxWidth={768}>
          <Row>
            <Col xs="12" style={{ padding: "20px 10px" }}>
              {/*<h3 className='job-summary-header'>History</h3>*/}
              <JobSummaryTable
                user_only={true}
                button={false}
                archive_only={true}
                allowArchive={false}
                title="History"
              />
            </Col>
          </Row>
        </MediaQuery>
      </Container>
    );
  }
}

export default UserHistory;
