import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {FormGroup, Form, Input, Label} from "reactstrap";
import moment from 'moment';

import {Paper, Divider, Popover} from '@material-ui/core';
import {Container, Row, Col, Button} from 'react-bootstrap';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormRB from 'react-bootstrap/Form';

import 'react-dates/initialize';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import "react-datepicker/dist/react-datepicker.css";

class JobDetailCard extends Component {
  state = {
    job: this.props.job,
    jobEdit: false,
    showJobUpdateModal: false,
    jobUpdatedModal: false,
    currentCareOffParty: null,
    jobPrevState: null,
    showItemsDeliverList: false,
    focusedVesselArriveDate: false,
    ItemsDeliverAnchorEl: null,
    ItemsOfflandAnchorEl: null
  };

  componentDidMount() {
  }

  handleVesselLoadingLocationChange = (e) => {
      const job = this.state.job;
      /* job.vesselLoadingLocation = e.target.value; */
      this.setState({job});
  };

  handleVesselArrivalDateChange = (vesselLoadingDateTime) => {
      const job = this.state.job;
      job.vesselArrivalDateTime = vesselLoadingDateTime.toISOString();
      this.setState({job});
  };

  handleVesselArrivalTimeChange = (value) => {
      const job = this.state.job;
      job.vesselArrivalDateTime = value.toDate().toISOString();
      this.setState({job});
  };

  handleVesselLighterLocationChange = (e) => {
      const job = this.state.job;
      job.vesselLighterLocation = e.target.value;
      this.setState({job});
  };

  // handleVesselLighterTimeChange = (value) => {
  //     const job = this.state.job;
  //     job.vesselLighterDateTime = value.toDate().toISOString();
  //     this.setState({job});
  // };
  //
  // handleVesselLighterDateChange = (vesselLighterDateTime) => {
  //     const job = this.state.job;
  //     job.vesselLighterDateTime = vesselLighterDateTime.toISOString();
  //     this.setState({job});
  // };

  handleVesselLighterNameChange = (e) => {
      const job = this.state.job;
      job.vesselLighterName = e.target.value;
      this.setState({job});
  };

  handleVesselBerthingDateTimeChange = (psaBerthingDateTime) => {
      const job = this.state.job;
      job.psaBerthingDateTime = psaBerthingDateTime;
      this.setState({job});
  };

  handleVesselUnberthingDateTimeChange = (psaUnberthingDateTime) => {
      const job = this.state.job;
      job.psaUnberthingDateTime = psaUnberthingDateTime;
      this.setState({job});
  };

  handleVesselLoadingDateChange = (vesselLoadingDateTime) => {
      const job = this.state.job;
      job.vesselLoadingDateTime = vesselLoadingDateTime.toISOString();
      this.setState({job});
  };

  handleVesselLoadingTimeChange = (value) => {
      const job = this.state.job;
      job.vesselLoadingDateTime = value.toDate().toISOString();
      this.setState({job});
  };

  handleRemarksChange = (e) => {
      const job = this.state.job;
      /* job.remarks = e.target.value; */
      this.setState({job});
  };

  handleVesselLighterRemarksChange = (e) => {
      const job = this.state.job;
      /* job.vesselLighterRemarks = e.target.value; */
      this.setState({job});
  };

  onSubmit = (e) => {
      e.preventDefault();
      this.setState({showJobUpdateModal: true});
  };

  validateItems = (items) => {
      // Check for empty item entries
      const filteredItems = [];
      for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.quantity !== '' && item.uom !== '') {
              delete item['id'];
              filteredItems.push(item);
          }
      }
      return filteredItems;
  };

  saveJobDetails = (e) => {
  };

  checkValidDate = (d) => {
      const date = new Date(d);
      return date.toString() !== "Invalid Date";
  };

  handleDeliverClose = () => {
      this.setState({ItemsDeliverAnchorEl: null})
  };

  handleOfflandClose = () => {
      this.setState({ItemsOfflandAnchorEl: null})
  };

  handleCreateDSAChange = (e) => {
      const job = this.state.job;
      /* job.createDSA = e.target.checked; */
      this.setState({job});
  };

  handleOtherVesselLocationChange = (e) => {
      const job = this.state.job;
      /* job.vesselLoadingLocation = e.target.value; */
      this.setState({job});
  };

  renderJobTimeDetails = () => {
      /* let {
          vesselLoadingLocation, vesselArrivalDateTime, vesselLoadingDateTime,
          psaBerthingDateTime, psaUnberthingDateTime,
      } = this.state.job;
      const vesselLoadingTime = moment(vesselLoadingDateTime);
      const vesselArrivalTime = moment(vesselArrivalDateTime);
      const psaBerthingTime = moment(psaBerthingDateTime);
      const psaUnberthingTime = moment(psaUnberthingDateTime); */
      switch (/* vesselLoadingLocation */'PSA') {
          case 'PSA':
              return <div>
                  <Row>
                      <Col xs={12} sm={6}>
                          <div className='d-flex align-items-center job-detail-section-heading'>
                              <div className='job-detail-green-circle'><strong>2</strong></div>
                              <h1 className='job-detail-section-header'>Time</h1>
                          </div>
                          <FormGroup>
                              <Label className='job-detail-section-label'>Vessel Estimated Berthing Time
                              </Label>
                              <Container fluid style={{paddingRight: "0px", paddingLeft: '0px'}}>
                                  <Row>
                                      <Col xs={7}>
                                          {/* <DateInputComponent DateTime={psaBerthingDateTime}
                                                              handleDateChange={() => {
                                                              }}
                                                              disabled={true}/> */}
                                      </Col>
                                      <Col xs={5}>
                                          <TimePicker
                                              showSecond={false}
                                              /* defaultValue={psaBerthingTime} */
                                              /* value={psaBerthingTime} */
                                              onChange={() => {
                                              }}
                                              allowEmpty={false}
                                              disabled={true}
                                              className='job-detail-section-input'
                                          />
                                      </Col></Row></Container>
                          </FormGroup>

                          <FormGroup>
                              <Label className='job-detail-section-label'>Vessel Estimated Unberthing Time</Label>
                              <Container fluid style={{paddingRight: "0px", paddingLeft: '0px'}}>
                                  <Row>
                                      <Col xs={7}>
                                          {/* <DateInputComponent DateTime={psaUnberthingDateTime}
                                                              handleDateChange={() => {
                                                              }}
                                                              disabled={true}/> */}
                                      </Col>
                                      <Col xs={5}>
                                          <TimePicker
                                              showSecond={false}
                                              /* defaultValue={psaUnberthingTime}
                                              value={psaUnberthingTime} */
                                              onChange={() => {
                                              }}
                                              allowEmpty={false}
                                              disabled={true}
                                              className='job-detail-section-input'
                                          />
                                      </Col></Row></Container>
                          </FormGroup>
                      </Col>
                  </Row>
                  <Divider className='job-detail-section-divider'/>
              </div>;
          default:
              return (
                  <div>
                      <Row>
                          <Col xs={12} sm={6}>
                              <div className='d-flex align-items-center job-detail-section-heading'>
                                  <div className='job-detail-green-circle'><strong>2</strong></div>
                                  <h1 className='job-detail-section-header'>Time</h1>
                              </div>
                              {/*<FormGroup>*/}
                              {/*    <Label className='job-detail-section-label'>Vessel Estimated Time Arrival*/}
                              {/*        (ETA)</Label>*/}
                              {/*    <Container fluid style={{paddingRight: "0px", paddingLeft: '0px'}}>*/}
                              {/*        <Row>*/}
                              {/*            <Col xs={7}>*/}
                              {/*                <DateInputComponent DateTime={vesselArrivalDateTime}*/}
                              {/*                                    handleDateChange={this.handleVesselArrivalDateChange}*/}
                              {/*                                    disabled={!this.state.jobEdit}/>*/}
                              {/*            </Col>*/}
                              {/*            <Col xs={5}>*/}
                              {/*                <TimePicker*/}
                              {/*                    showSecond={false}*/}
                              {/*                    defaultValue={vesselArrivalTime}*/}
                              {/*                    value={vesselArrivalTime}*/}
                              {/*                    onChange={this.handleVesselArrivalTimeChange}*/}
                              {/*                    allowEmpty={false}*/}
                              {/*                    disabled={!this.state.jobEdit}*/}
                              {/*                    className='job-detail-section-input'*/}
                              {/*                />*/}
                              {/*            </Col></Row></Container>*/}
                              {/*</FormGroup>*/}

                              <FormGroup>
                                  <Label className='job-detail-section-label'>{
                                      /* this.state.vesselLoadingLocation */'Jurong Port' === 'Jurong Port'
                                          ? 'Lighter Loading Date & Time'
                                          : 'Vessel Loading Date & Time'
                                  }</Label>
                                  <Container fluid style={{paddingRight: "0px", paddingLeft: '0px'}}>
                                      <Row>
                                          <Col xs={7}>
                                              {/* <DateInputComponent DateTime={vesselLoadingDateTime}
                                                                  handleDateChange={this.handleVesselLoadingDateChange}
                                                                  disabled={!this.state.jobEdit}/> */}
                                          </Col>
                                          <Col xs={5}>
                                              <TimePicker
                                                  showSecond={false}
                                                  /* defaultValue={vesselLoadingTime}
                                                  value={vesselLoadingTime} */
                                                  onChange={this.handleVesselLoadingTimeChange}
                                                  allowEmpty={false}
                                                  disabled={!this.state.jobEdit}
                                                  className='job-detail-section-input'
                                              />
                                          </Col></Row></Container>
                              </FormGroup>
                          </Col>
                      </Row>
                      <Divider className='job-detail-section-divider'/>
                  </div>);
      }
  };

  render() {
    return (
      <div>
                <Paper square={true} className='job-detail-paper' elevation={0}>
                    <Form /* onSubmit={this.onSubmit} */>
                        <Container>
                            <Row>
                                <Col xs={12} sm={6}>
                                    <div className='d-flex align-items-center job-detail-section-heading'>
                                        <div className='job-detail-green-circle'><strong>1</strong></div>
                                        <h1 className='job-detail-section-header'>Vessel Information</h1>
                                    </div>

                                    <FormGroup>
                                        <Label className='job-detail-section-label'>Job Number</Label>
                                        <Input type="text" value=/* {jobId} */"jobId" className='job-detail-section-input' disabled/>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className='job-detail-section-label'>Vessel Loading Location</Label>
                                        <Input type="select" value=/* {vesselLoadingLocation} */"vesselLoadingLocation"
                                               disabled
                                               /* onChange={this.handleVesselLoadingLocationChange} */
                                               className='job-detail-section-input job-input-margin-btm '>
                                            <option>PSA</option>
                                            <option>Jurong Port</option>
                                            <option>Others</option>
                                        </Input>
                                    </FormGroup>

                                    {/* {
                                        vesselLoadingLocation === 'Others'
                                            ? <FormGroup>
                                                <Label className='job-create-section-label'>Address of Vessel Loading
                                                    Location</Label>
                                                <Input type="text" value={otherVesselLocation}
                                                       disabled={!this.state.jobEdit}
                                                       onChange={this.handleOtherVesselLocationChange}
                                                       className='job-create-section-input'
                                                >
                                                </Input>
                                            </FormGroup>
                                            : ''
                                    } */}

                                    {/*Lighter Implementation (Need Add Lighter Name and and Time and Location Model)*/}
                                    {/* vesselLoadingLocation */'Jurong Port' === 'Jurong Port'
                                        ? <div>
                                            <FormGroup style={{marginBottom: '0px'}}>
                                                <Label className='job-detail-section-label'>Lighter Name
                                                    (Optional)</Label>
                                                <Input type="text"
                                                       /* onChange={this.handleVesselLighterNameChange} */
                                                       value=/* {vesselLighterName} */'vesselLighterName'
                                                       disabled={!this.state.jobEdit}
                                                       className='job-detail-section-input'/>
                                            </FormGroup>
                                            {/*<FormGroup style={{marginBottom: '0px'}}>*/}
                                            {/*    <Label className='job-detail-section-label'>Lighter ETA</Label>*/}
                                            {/*    <Container fluid style={{paddingRight: "0px", paddingLeft: '0px'}}>*/}
                                            {/*        <Row>*/}
                                            {/*            <Col xs={7}>*/}
                                            {/*                <DateInputComponent DateTime={vesselLighterDateTime}*/}
                                            {/*                                    handleDateChange={this.handleVesselLighterDateChange}*/}
                                            {/*                                    disabled={!this.state.jobEdit}/>*/}
                                            {/*            </Col>*/}
                                            {/*            <Col xs={5}>*/}
                                            {/*                <TimePicker*/}
                                            {/*                    showSecond={false}*/}
                                            {/*                    value={vesselLighterTime}*/}
                                            {/*                    onChange={this.handleVesselLighterTimeChange}*/}
                                            {/*                    allowEmpty={false}*/}
                                            {/*                    disabled={!this.state.jobEdit}*/}
                                            {/*                    className='job-detail-section-input'*/}
                                            {/*                />*/}
                                            {/*            </Col></Row></Container>*/}
                                            {/*</FormGroup>*/}
                                            <FormGroup>
                                                <Label className='job-detail-section-label'>Lighter Location</Label>
                                                <Input type="select" /* value={vesselLighterLocation} */
                                                       disabled={!this.state.jobEdit}
                                                       /* onChange={this.handleVesselLighterLocationChange} */
                                                       className='job-detail-section-input job-input-margin-btm '>
                                                    <option>Marina South Wharves</option>
                                                    <option>Penjuru Terminal</option>
                                                </Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label className='job-detail-section-label'>Lighter Contact Remarks
                                                    (Optional)</Label>
                                                <Input type="textarea" /* value={vesselLighterRemarks} */ rows="3"
                                                       className='job-detail-section-input' style={{marginBottom: 0}}
                                                       /* onChange={this.handleVesselLighterRemarksChange} */
                                                       disabled={!this.state.jobEdit}/>
                                                <span className='job-detail-section-label-helper-text'><i>Please enter contact details for lighter here</i></span>
                                            </FormGroup>
                                        </div>
                                        : ''
                                    }


                                    <FormGroup>
                                        <Label className='job-detail-section-label'>Vessel IMO</Label>
                                        <Input type="text" className='job-detail-section-input'
                                               /* value={vessel.vesselIMOID} */ disabled/>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className='job-detail-section-label'>Vessel Callsign</Label>
                                        <Input type="text" className='job-detail-section-input'
                                               /* value={vessel.vesselCallsign} */ disabled/>
                                    </FormGroup>

                                    <FormGroup>
                                        <Label className='job-detail-section-label'>Vessel Name</Label>
                                        <Input type="text" className='job-detail-section-input'
                                               /* value={vessel.vesselName} */ disabled/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Divider className='job-detail-section-divider'/>
                            {this.renderJobTimeDetails()}
                            <Row>
                                <Col xs={12} sm={6}>
                                    <div className='d-flex align-items-center job-detail-section-heading'>
                                        <div className='job-detail-green-circle'><strong>3</strong></div>
                                        <h1 className='job-detail-section-header'>Delivery Details</h1>
                                    </div>
                                    <FormRB.Group>
                                        <FormRB.Label className='job-detail-section-label'>Items to
                                            Deliver</FormRB.Label>
                                        <FormRB.Control as="input"
                                                        /* value={jobItemText.join(', ')} */
                                                        /* onClick={(e) => {
                                                            this.setState({ItemsDeliverAnchorEl: e.currentTarget})
                                                        }} */
                                                        disabled={!this.state.jobEdit}
                                                        className='job-detail-section-input margin-bottom-zero'>
                                        </FormRB.Control>
                                        <span className='job-detail-section-label-helper-text'><i>Do let us know if you have refrigeration,fragile,etc items in the remarks</i></span>
                                        <Popover
                                            /* open={openDeliver} */
                                            anchorEl={this.state.ItemsDeliverAnchorEl}
                                            /* onClose={this.handleDeliverClose} */
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            {/* <JobItemInput jobItems={jobItems} setItems={(jobItems) => {
                                                const job = this.state.job;
                                                if (currentCareOffParty !== null) {
                                                    currentCareOffParty.jobItems = jobItems;
                                                } else {
                                                    job.jobItems = jobItems;
                                                }
                                                this.setState({job});
                                            }} disabled={!this.state.jobEdit}
                                                          type={'delivery'}/> */}

                                        </Popover>
                                    </FormRB.Group>

                                    <FormRB.Group>
                                        <FormRB.Label className='job-detail-section-label'>Items to
                                            Offland</FormRB.Label>
                                        <FormRB.Control as="input"
                                                        /* value={jobOfflandItemsText.join(', ')} */
                                                        /* onClick={(e) => {
                                                            this.setState({ItemsOfflandAnchorEl: e.currentTarget})
                                                        }} */
                                                        disabled={!this.state.jobEdit}
                                                        className='job-detail-section-input'>
                                        </FormRB.Control>
                                        <Popover
                                            /* open={openOffland} */
                                            anchorEl={this.state.ItemsOfflandAnchorEl}
                                            /* onClose={this.handleOfflandClose} */
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'left',
                                            }}
                                        >
                                            {/* <JobItemInput jobItems={jobOfflandItems}
                                                          setItems={(jobOfflandItems) => {
                                                              const job = this.state.job;
                                                              if (currentCareOffParty !== null) {
                                                                  currentCareOffParty.jobOfflandItems = jobOfflandItems;
                                                              } else {
                                                                  job.jobOfflandItems = jobOfflandItems;
                                                              }
                                                              this.setState({job});
                                                          }} disabled={!this.state.jobEdit}/> */}

                                        </Popover>
                                    </FormRB.Group>

                                    {/*<FormGroup>*/}
                                    {/*    <Label><strong>Care-off Parties (If any)</strong></Label>*/}
                                    {/*    <CareOffTableInput items={careOffParties} setItems={(careOffParties) => {*/}
                                    {/*        const job = this.state.job;*/}
                                    {/*        job.careOffParties = careOffParties;*/}
                                    {/*        this.setState({job});*/}
                                    {/*    }} disabled={!this.state.jobEdit} />*/}
                                    {/*</FormGroup>*/}

                                    <FormGroup>
                                        <Label className='job-detail-section-label'>Remarks</Label>
                                        <Input type="textarea" /* value={remarks} */ rows="7"
                                               className='job-detail-section-input margin-bottom-zero'
                                               /* onChange={this.handleRemarksChange} disabled={!this.state.jobEdit} *//>
                                        <span className='job-create-section-label-helper-text'><i>* Please let us know if you require any pick up and pick up location.</i></span>
                                    </FormGroup>
                                    {/*Implement help apply for DSA*/}
                                    <FormControlLabel
                                        value="dsa"
                                        control={<Checkbox color="default" /* checked={createDSA} */
                                                           className='create-dsa-checkbox'/>}
                                        /* label={renderText()} */
                                        /* onChange={this.handleCreateDSAChange} */
                                        disabled={!this.state.jobEdit}
                                    />

                                    {
                                        this.state.jobEdit
                                            ? <FormGroup className="text-center">
                                                <Button /* onClick={this.onSubmit} */
                                                        variant='success' className='job-details-save-button'>Save
                                                    Changes</Button>
                                                <Button /* onClick={(e) => this.setState({
                                                    jobEdit: false,
                                                    job: this.state.jobPrevState
                                                })} */
                                                        variant='outline-success'
                                                        className='job-details-cancel-button'>Cancel</Button>
                                            </FormGroup>
                                            /* : (this.state.job.jobTrackers.length > 1 && this.state.job.isCancelled !== "Confirmed") || this.props.auth.userType === "Admin"
                                            ? <FormGroup className="text-center">
                                                <Button onClick={(e) =>
                                                    this.setState({
                                                        jobEdit: true,
                                                        jobPrevState: JSON.parse(JSON.stringify(this.props.job))
                                                    })}
                                                        variant='success'
                                                        className='job-details-update-button'>Edit</Button>
                                            </FormGroup> */
                                            : ""
                                    }
                                </Col>
                            </Row>
                        </Container>
                    </Form>
                </Paper>

                {/* <InformationModal
                    modal={this.state.jobUpdatedModal}
                    toggle={(e) => this.setState({jobUpdatedModal: !this.state.jobUpdatedModal})}
                    title="Job Changes saved."
                    onClosed={(e) => this.setState({jobUpdatedModal: false})}
                >
                    <p>Your changes to the job details has been successfully saved.</p>
                </InformationModal> */}

                {/* <AffirmationModal
                    modal={this.state.showJobUpdateModal}
                    toggle={(e) => this.setState({showJobUpdateModal: !this.state.showJobUpdateModal})}
                    title="Save Changes?"
                    affirmativeAction={(e) => {
                        this.setState({
                            showJobUpdateModal: !this.state.showJobUpdateModal,
                            jobEdit: !this.state.jobEdit
                        });
                        this.saveJobDetails();
                    }}
                    affirmativeText={'Yes'}
                    cancelText={'No'}
                >
                    <p>Do you want to save changes? A notification will be sent to all parties involved.</p>
                </AffirmationModal> */}
            </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(JobDetailCard));
