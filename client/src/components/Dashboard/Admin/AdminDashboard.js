import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

import JobSummaryTable from "../Job/JobSummaryTable";

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
      currentPage: 1,
      postPerPage: 50
    };
    this.paginate = this.paginate.bind(this);
  }

  paginate(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="12">
            <JobSummaryTable
              postsPerPage={this.state.postPerPage}
              paginate={this.paginate}
              currentPage={this.state.currentPage}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminDashboard;
