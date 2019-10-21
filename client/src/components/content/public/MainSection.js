import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import { Container, Row, Col } from "reactstrap";

import MediaQuery from "react-responsive";

import "./MainSection.css";

class MainSection extends Component {
  render() {
    return (
      <div>
        <MediaQuery query="(min-width: 426px)">
          <Container fluid className="jumbotron-main">
            <Row noGutters>
              <Col>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="flex-end"
                >
                  <Grid item xs={6} className="d-flex flex-column-reverse">
                    <h1 className="jumbotrontitle">
                      <strong className="title">SimpFleet</strong>
                      <br />
                      <i>
                        <strong className="sub-title">
                          A platform where digital technology
                          <br />
                          meets marine logistics.
                        </strong>
                      </i>
                    </h1>
                  </Grid>
                  <Grid item xs={5} style={{ height: "591px" }}></Grid>
                </Grid>
              </Col>
            </Row>
          </Container>
        </MediaQuery>
        <MediaQuery query="(max-width: 425px)">
          <Container fluid>
            <Row>
              <Container
                fluid
                className="jumbotron-main-mobile d-flex flex-column-reverse"
              >
                <h1 className="jumbotrontitle" style={{ marginBottom: "30px" }}>
                  <strong className="title">SimpFleet</strong>
                  <br />
                  <i>
                    <strong className="sub-title">
                      A platform where digital technology
                      <br />
                      meets marine logistics.
                    </strong>
                  </i>
                </h1>
              </Container>
            </Row>
          </Container>
        </MediaQuery>
      </div>
    );
  }
}

export default withRouter(MainSection);
