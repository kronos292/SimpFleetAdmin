import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Paper } from "@material-ui/core";
import { Container, Row, Col, Button } from "react-bootstrap";

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

var deliveryInAdvance = 6;

class JobDropoffDetail extends Component {
  state = {
    LogisticsCompanies: [
      {
        index: "wsl",
        companyName: "Allied Containers, Winspec Logistics Services Pte Ltd",
        address: "No. 6 Tuas Ave 6, Singapore 639311",
        contactNumber: "6558 6257",
        website: "winspecgroup.com",
        openingHours:
          "Monday to Friday, from 8:30am to 5:30pm & Saturday, from 8:30am to 12:30pm, excluding PH",
        addLL: { lat: 1.3262, lng: 103.649817 }
      }
    ],
    remarks: "",
    currentCompany: ""
  };

  componentDidMount() {
    //var company =  this.props.job.logisticsCompany;
    var company = "wsl";
    for (var i = 0; i < this.state.LogisticsCompanies.length; i++) {
      if (this.state.LogisticsCompanies[i].index === company) {
        this.setState({ currentCompany: this.state.LogisticsCompanies[i] });
        break;
      }
    }
  }

  handleRemarks = e => {
    this.setState({ remarks: e.target.value });
  };

  handleSaveRemarks = () => {
    //Insert Backend Here
    console.log("Saved Remarks for Logistics Company");
  };

  getDropoffTime() {
    /* var deliveryDate = new Date(this.props.job.vesselArrivalDateTime); */
    /* deliveryDate.setDate(deliveryDate.getHours() - deliveryInAdvance);
    return (
      "" +
      deliveryDate.getDate() +
      "/" +
      deliveryDate.getMonth() +
      "/" +
      deliveryDate.getFullYear()
    ); */
  }

  render() {
    var deliveryDate = this.getDropoffTime();
    var LCOpeningHours = this.state.currentCompany.openingHours;

    const Map = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap
          defaultZoom={14}
          defaultCenter={this.state.currentCompany.addLL}
        >
          <Marker position={this.state.currentCompany.addLL} />
        </GoogleMap>
      ))
    );

    return (
      <div>
        <Paper square={true} className="job-detail-paper" elevation={0}>
          <Container>
            <Row style={{ marginBottom: 40 }}>
              <Col>
                <h3 className="job-detail-section-header">Drop off Location</h3>
                <p>
                  {this.state.currentCompany.companyName},{" "}
                  {this.state.currentCompany.address}
                </p>
              </Col>
            </Row>
            <Row style={{ marginBottom: 40 }}>
              <Col>
                <h3 className="job-detail-section-header">Drop off Time</h3>
                <p>
                  Please Drop-off during office hours from {LCOpeningHours}.
                </p>
              </Col>
            </Row>
            {/*<Row>*/}
            {/*    <Col>*/}
            {/*        <h3 className='job-detail-section-header'>Remarks</h3>*/}
            {/*        <FormControl as="textarea" rows="4" value={this.state.remarks} placeholder='Insert Remarks Here' onChange={this.handleRemarks} className='job-dropoff-remarks-text'/>*/}
            {/*        /!*<Button onClick={this.handleSaveRemarks}>Save Changes</Button>*!/*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            <Row>
              <Col>
                <h3 className="job-detail-section-header">Map</h3>
                <Map
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCFL111s8lalFUoU08_GwV4O12asuIgo_w&v=3.exp&libraries=geometry,drawing,places"
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `400px` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              </Col>
            </Row>
          </Container>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(JobDropoffDetail));
