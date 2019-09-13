import React, { Component } from "react";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import "./SimpFleetExplainationSection.css";

class SimpFleetExplainationSection extends Component {
  render() {
    return (
      <Container className="explaintion-padding">
        <Grid container direction="row" justify="center">
          <Grid item xs={10}>
            <h1 className="section-title">What is SimpFleet?</h1>
            <p className="p-why">
              SimpFleet is an information system (IS), comprised of a delivery
              management system (desktop interface) and an integrated mobile
              application for SSD delivery trucks.
              <br />
              We handle delivery up the vessel and reduce delivery cost by 30%
              and cutting number of trucks per delivery by 60%.
            </p>
            <br />
            <hr className="line" />
            <br />
            <p className="p-why">
              <strong>To Agents,</strong>
              <br />
              We are sure that we can help you reduce up to 80% of the time
              spent coordinating with suppliers for delivery and make it easy
              for you to deal with multiple parties.
            </p>
            <br />
            <p className="p-why">
              <strong>To Suppliers and Chandlers,</strong>
              <br />
              We provide an affordable way to fulfill small order, arrange a
              hassle-free coordination, reduce delivery cost, reduce waiting
              time and present transparency of goods’ position.
            </p>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default SimpFleetExplainationSection;
