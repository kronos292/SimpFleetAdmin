import "./CreateJob.css";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Container, Row, Col } from "react-bootstrap";

class CreateJob extends Component {
  render() {
    return (
      <Container fluid style={{ height: "100%" }}>
        <Row style={{ height: "100%" }}>
          <Col xs={12}>{/* {this.renderForm()} */}</Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(CreateJob));
