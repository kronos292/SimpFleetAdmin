import React, { Component } from "react";
import { Container, Col, Row } from "react-bootstrap";

import Paper from "@material-ui/core/Paper";

import "./FeaturesSection.css";

class FeaturesSection extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col
            xs="12"
            md="6"
            style={{ paddingLeft: "0px", paddingRight: "0px" }}
          >
            <Paper elevation={0} square className="features-paper">
              <h1 className="feature-title">Features</h1>
              <ul className="feature-ul">
                <li>
                  Increased traceability with real-time tracking of goods
                  positions
                </li>
                <li>Accurate vessel berthing timing</li>
                <li>
                  User-friendly interface for logistics providers to view and
                  update job details easily
                </li>
                <li>
                  Logistics providers can have a oversight of last-mile delivery
                  process with greater data transparency and access
                </li>
              </ul>
            </Paper>
          </Col>
          <Col xs={false} md="6" className="image-feature"></Col>
        </Row>
      </Container>
    );
  }
}

export default FeaturesSection;
