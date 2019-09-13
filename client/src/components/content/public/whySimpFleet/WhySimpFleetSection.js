import React, { Component } from "react";
import { Container, Col, Row } from "reactstrap";
import "./WhySimpFleetSection.css";

class WhySimpFleetSection extends Component {
  render() {
    return (
      <Container fluid className="why-padding grey">
        <Row>
          <Col>
            <h1 className="section-title">Why Sign up with Us?</h1>
            <Row>
              <Col md={{ size: 10, offset: 1 }}>
                <Row>
                  <Col md="4">
                    <div className="d-flex justify-content-center">
                      <img src="./images/assest1.png" alt="assest1" />
                    </div>
                    <h5 className="text-center">End to End Visibility</h5>
                    <p className="text-center">
                      Track your job from creation to completion, and retrieve
                      documents easily
                    </p>
                  </Col>
                  <Col md="4">
                    <div className="d-flex justify-content-center">
                      <img src="./images/assest2.png" alt="assest2" />
                    </div>
                    <h5 className="text-center">Hassle-Free Coordination</h5>
                    <p className="text-center">
                      Communicate and coordinate with multiple stakeholders via
                      our integrated platform
                    </p>
                  </Col>
                  <Col md="4">
                    <div className="d-flex justify-content-center">
                      <img src="./images/assest3.png" alt="assest3" />
                    </div>
                    <h5 className="text-center">Unlock Savings</h5>
                    <p className="text-center">
                      Pool your delivery with other suppliers, and convert your
                      fixed costs to variable costs
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WhySimpFleetSection;
