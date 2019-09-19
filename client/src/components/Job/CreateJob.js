import 'rc-time-picker/assets/index.css';
import "react-datepicker/dist/react-datepicker.css"
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import "./CreateJob.css";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import _ from "lodash";
import {Form, FormGroup, Input, Label, FormText} from "reactstrap";
import FormRB from 'react-bootstrap/Form';
import {Divider, Popover, FormControlLabel, Checkbox} from "@material-ui/core";
import TimePicker from 'rc-time-picker';
import moment from "moment";
/* import JobItemInput from "./JobDetails/Form/JobItemInput";
import DateInputComponent from "./JobDetails/Form/DateInputComponent"; */
import {AsyncTypeahead, Typeahead, Highlighter, TypeaheadMenu} from 'react-bootstrap-typeahead';
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";
import Radio from "@material-ui/core/Radio";

class CreateJob extends Component {
  state = {
    jobId: "",
    vesselIMOID: "",
    vesselName: "",
    vesselCallsign: "",
    vesselLoadingLocation: "PSA",
    vesselArrivalDateTime: new Date().toISOString(),
    uploadedFile: null,
    jobItems: [],
    jobOfflandItems: [],
    careOffParties: [],
    remarks: "",
    psaBerthingDateTime: "",
    psaUnberthingDateTime: "",
    vesselLoadingDateTime: new Date().toISOString(),
    createDSA: false,
    activeStep: 0,
    steps: [
      { title: "Vessel Information" },
      { title: "Vessel Location" },
      { title: "Item Details" },
      { title: "Confirmation" }
    ],
    ItemsDeliverAnchorEl: null,
    ItemsOfflandAnchorEl: null,
    job: null,
    vessels: [],
    vesselLighterName: "",
    //vesselLighterDateTime: new Date().toISOString(),
    vesselLighterLocation: "Marina South Wharves",
    vesselLighterRemarks: "",
    otherVesselLocation: "",
    submitButtonActive: true,
    isLoading: false,
    vesselQueryResults: [],
    vesselSelected: ""
  };

  componentDidMount() {
  }

  handleJobIdChange = (e) => {
      this.setState({jobId: e.target.value});
  };

  handleVesselLoadingLocationChange = (e) => {
      this.setState({vesselLoadingLocation: e.target.value});
  };

  handleRemarksChange = (e) => {
      this.setState({remarks: e.target.value});
  };

  handleVesselLighterRemarksChange = (e) => {
      this.setState({vesselLighterRemarks: e.target.value});
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

  validateCareOffs = () => {
      // Check for empty care-off entries
      const careOffParties = this.state.careOffParties;
      const filteredCareOffParties = [];
      for (let i = 0; i < careOffParties.length; i++) {
          const careOffParty = careOffParties[i];
          if (careOffParty.companyName !== '' && careOffParty.personName !== '' && careOffParty.contactNumber !== '' && careOffParty.email !== '') {
              delete careOffParty['id'];
              filteredCareOffParties.push(careOffParty);
          }
      }
      return filteredCareOffParties;
  };

  onSubmit = async (e) => {
      e.preventDefault();

      // Check for empty item entries
      const filteredItems = this.validateItems(this.state.jobItems);
      const filteredJobOfflandItems = this.validateItems(this.state.jobOfflandItems);

      // Check for empty care-off entries
      const filteredCareOffParties = this.validateCareOffs();

      /* if (this.state.vesselQueryResults.length > 1) {
          let vesselSelected = this.state.vesselQueryResults.filter((o) => o.vesselIMOID === this.state.vesselSelected)[0]
          await this.setState({
              vesselIMOID: vesselSelected.vesselIMOID ? vesselSelected.vesselIMOID : '',
              vesselName: vesselSelected ? vesselSelected.vesselName : '',
              vesselCallsign: vesselSelected ? vesselSelected.vesselCallsign : '',
              isLoading: false,
          });
      }
 */
      /* if (this.state.vesselIMOID === '' && this.state.vesselCallsign === '') {
          window.alert('Either Vessel IMO or Callsign must be filled');
      } else if (this.state.vesselName === '') {
          window.alert('Vessel Name must be filled');
      } else if (this.state.vesselLoadingLocation !== 'PSA' && (new Date(this.state.vesselLoadingDateTime) - new Date()) < 0) {
          window.alert('Vessel Loading Time cannot be before now')
      } else if (this.state.vesselLoadingDateTime === '') {
          window.alert('Vessel Loading Date and Time must be filled');
      } else if (isNaN(this.state.vesselIMOID) || this.state.vesselIMOID.length !== 7) {
          window.alert('Vessel IMO must contain exactly 7 digits only');
      } else if (filteredItems.length < 1) {
          window.alert('At least one item must be submitted for delivery!');
      } else if (this.state.vesselArrivalDateTime === '') {
          window.alert('Vessel ETA must be filled');
      } else {
          // Disable submit button to prevent duplicate bookings
          this.setState({submitButtonActive: false});

          // Create job
          axios.post('/api/jobs', {
              jobId: this.state.jobId,
              vesselIMOID: this.state.vesselIMOID,
              vesselCallsign: this.state.vesselCallsign,
              vesselName: this.state.vesselName,
              vesselLoadingLocation: this.state.vesselLoadingLocation,
              vesselArrivalDateTime: this.state.vesselArrivalDateTime,
              jobItems: filteredItems,
              jobOfflandItems: filteredJobOfflandItems,
              careOffParties: filteredCareOffParties,
              remarks: this.state.remarks,
              psaBerthingDateTime: this.state.psaBerthingDateTime,
              psaUnberthingDateTime: this.state.psaUnberthingDateTime,
              vesselLoadingDateTime: this.state.vesselLoadingDateTime,
              createDSA: this.state.createDSA,
              vesselLighterName: this.state.vesselLighterName,
              vesselLighterLocation: this.state.vesselLighterLocation,
              vesselLighterRemarks: this.state.vesselLighterRemarks,
              otherVesselLocation: this.state.otherVesselLocation
          }).then(res => {
              const job = res.data;

              // Set job tracker to job approved automatically
              axios.post('/api/job_trackers', {
                  index: 2,
                  title: 'Job booking confirmed',
                  description: 'We have confirmed your job booking. Please deliver the items to \'No. 6 Tuas Ave 6, Singapore 639311\' at least 24 hours before the vessel arrives.',
                  trackingType: 'Electronic',
                  jobId: job._id
              }).then(res => {
                  axios.post('/api/job_links', {
                      job
                  }).then(res => {
                      this.setState({activeStep: 2, job});
                  }).catch(err => {
                      console.log(err);
                  });
              }).catch(err => {
                  console.log(err);
              });
          }).catch(err => {
              console.log(err);
          });
      } */this.setState({activeStep: 2/* , job */});
  };

  handleVesselArrivalTimeChange = (value) => {
      this.setState({vesselArrivalDateTime: value.toDate().toISOString()});
  };

  handleVesselArrivalDateChange = (vesselArrivalDateTime) => {
      this.setState({vesselArrivalDateTime: vesselArrivalDateTime.toISOString()});
  };

  handleVesselLoadingTimeChange = (value) => {
      this.setState({vesselLoadingDateTime: value.toDate().toISOString()});
  };

  handleVesselLoadingDateChange = (vesselLoadingDateTime) => {
      this.setState({vesselLoadingDateTime: vesselLoadingDateTime.toISOString()});
  };

  handleVesselLighterNameChange = (e) => {
      this.setState({vesselLighterName: e.target.value});
  };

  handleVesselLighterLocationChange = (e) => {
      this.setState({vesselLighterLocation: e.target.value});
  };

  handleOtherVesselLocationChange = (e) => {
      this.setState({otherVesselLocation: e.target.value});
  };

  handleDeliverClose = () => {
      this.setState({ItemsDeliverAnchorEl: null})
  };

  handleOfflandClose = () => {
      this.setState({ItemsOfflandAnchorEl: null})
  };

  handleCreateDSAChange = (e) => {
      this.setState({createDSA: e.target.checked})
  };

  handleNextStep = async () => {
      const filteredItems = this.validateItems(this.state.jobItems);
      const filteredJobOfflandItems = this.validateItems(this.state.jobOfflandItems);

      // Check for empty care-off entries
      const filteredCareOffParties = this.validateCareOffs();

      const now = new Date();

      /* if (this.state.vesselIMOID === '' && this.state.vesselCallsign === '') { */
          this.setState({isLoading: true});
          const queryVesselName = this.state.vesselName;

          try {
              /* const res = await axios.get(`/api/vessels/search?query=${queryVesselName}`); */
              /* const result = res.data;
              if (result.length === 1) {
                  this.setState({
                      vesselIMOID: result[0].vesselIMOID ? result[0].vesselIMOID : '',
                      vesselName: result[0] ? result[0].vesselName : '',
                      vesselCallsign: result[0] ? result[0].vesselCallsign : '',
                      isLoading: false,
                  });
              } else if (result.length > 1) {
                  this.setState({vesselQueryResults: result})
              } else {
                  this.setState({isLoading: false});
                  window.alert(`There is no such Vessel with Name: ${queryVesselName}`)
                  return;
              } */
          } catch (err) {
              console.log(err);
          }/* 
      } */


      /* if (this.state.vesselName === '') {
          window.alert('Vessel Name must be filled');
      } else if (this.state.vesselLoadingLocation !== 'PSA' && (new Date(this.state.vesselLoadingDateTime) - now.setHours( now.getHours() + 2 )) < 0) {
          window.alert('Vessel Loading Time cannot be 2 hours before Arrival of Vessel')
      } else if (this.state.vesselLoadingDateTime === '') {
          window.alert('Vessel Loading Date and Time must be filled');
      } else if (filteredItems.length < 1) {
          window.alert('At least one item must be submitted for delivery!');
      } else if (this.state.vesselArrivalDateTime === '') {
          window.alert('Vessel ETA must be filled');
      } else if (this.state.vesselLoadingLocation === 'Others' && this.state.otherVesselLocation === '') {
          window.alert('Vessel Loading Location must be filled');
      } else { */
          this.setState({activeStep: 1});
      /* } */
  }; 

  handlePaymentBack = () => {
      this.setState({activeStep: 0});
  };

  renderText = () => {
      return (
          <div className='d-flex flex-column'>
              <span className='job-create-section-input-label' style={{marginBottom: '0px'}}><strong>I would like SimpFleet to produce DSA(JP LTs) or Entry/Export Permit(PSA) for me</strong></span>
              <span className='job-create-section-label-helper-text'><i>It would cost extra fees if Simpfleet produces the DSA(JP LTs) or Entry/Export Permit(PSA)</i></span>
          </div>);
  };

  renderJobTimeInfo = () => {
      const vesselLoadingTime = moment(this.state.vesselLoadingDateTime);
      const vesselArrivalTime = moment(this.state.vesselArrivalDateTime);
      switch (this.state.vesselLoadingLocation) {
          case "PSA":
              return <div></div>;
          default:
              return (
                  <div>
                      <Row className='job-create-section'>
                          <Col xs={12} sm={9}>
                              <div className='d-flex align-items-center job-create-section-heading'>
                                  <div className='job-create-green-circle'><strong>2</strong></div>
                                  <h1 className='job-create-section-header'>Time</h1>
                              </div>
                              <FormGroup>
                                  <Label className='job-create-section-label'>
                                      {
                                          this.state.vesselLoadingLocation === 'Jurong Port'
                                              ? 'Lighter Loading Date & Time'
                                              : 'Vessel Loading Date & Time'
                                      }
                                  </Label>
                                  <Container fluid style={{paddingRight: "0px", paddingLeft: '0px'}}>
                                      <Row>
                                          <Col xs={7}>
                                              {/* <DateInputComponent DateTime={this.state.vesselLoadingDateTime}
                                                                  handleDateChange={this.handleVesselLoadingDateChange}
                                                                  disabled={false}/> */}
                                          </Col>
                                          <Col xs={5}>
                                              <TimePicker
                                                  showSecond={false}
                                                  defaultValue={vesselLoadingTime}
                                                  value={vesselLoadingTime}
                                                  onChange={this.handleVesselLoadingTimeChange}
                                                  allowEmpty={false}
                                                  className='job-create-section-input'
                                              />
                                          </Col></Row></Container>
                              </FormGroup>
                          </Col>
                      </Row>
                      <Divider className='job-create-section-divider'/>
                  </div>
              );
      }
  };

  _renderMenuItemChildren = (option, props, index) => {
      return [
          <Highlighter key="vesselIMOID" search={props.text}>
              {option.vesselIMOID}
          </Highlighter>,
          <div key="vesselName">
              <small>
                  Vessel Name: {option.vesselName}
              </small>
          </div>,
      ];
  };

  renderMenu = (results, menuProps) => {
      results.sort((a, b) => a.priority - b.priority);
      // const sortedResults = results.slice(0,8);
      return <TypeaheadMenu {...menuProps} options={results}/>;
  };

  handleTypeAheadVesselNameChange = (value) => {
      this.setState({
          vesselName: value.trim()
      });
  };

  handleKeyDown = (e) => {
      if (e.keyCode === 13) {
          const query = e.target.value;
      }
  };

  handleTypeAheadVesselSelect = (selected) => {
      if (selected[0]) {
          this.setState({
              vesselIMOID: selected[0].vesselIMOID ? selected[0].vesselIMOID : '',
              vesselName: selected[0] ? selected[0].vesselName : '',
              vesselCallsign: selected[0] ? selected[0].vesselCallsign : ''
          });
      } else {
          this.setState({
              vesselIMOID: '',
              vesselName: '',
              vesselCallsign: ''
          });
      }
  };

  handleVesselSelectChange = (event) => {
      this.setState({vesselSelected: event.target.value});
  };

  filter = (option, props) => {
      let text = props.text.toLowerCase();
      if (option.vesselCallsign.toLowerCase().indexOf(text) !== -1 ||
          option.vesselIMOID.toLowerCase().indexOf(text) !== -1 ||
          option.vesselName.toLowerCase().indexOf(text) !== -1) {
          option.priority = 1;
          return true
      }
      let textArr = text.split(' ');
      let res = false;
      for (let i = 0; i < textArr.length; i++) {
          const o = textArr[i];
          if (o.length >= 3 && (option.vesselCallsign.toLowerCase().split(' ').includes(o) ||
              option.vesselIMOID.toLowerCase().split(' ').includes(o) ||
              option.vesselName.toLowerCase().split(' ').includes(o))) {
              option.priority = 2;
              res = true;
              break;
          }
      }
      return res
  };

  renderJobInfo = () => {
      const openDeliver = Boolean(this.state.ItemsDeliverAnchorEl);
      let jobItemText = this.state.jobItems.reduce((a, item) => {
          a.push(item.quantity.toString().concat(' '.concat(item.uom)));
          return a;
      }, []);
      const openOffland = Boolean(this.state.ItemsOfflandAnchorEl);
      let jobOfflandItemsText = this.state.jobOfflandItems.reduce((a, item) => {
          a.push(item.quantity.toString().concat(' '.concat(item.uom)));
          return a;
      }, []);
      return (
          <div>
              <Row className='job-create-section'>
                  <Col xs={12} sm={9}>
                      <div className='d-flex align-items-center job-create-section-heading'>
                          <div className='job-create-green-circle'><strong>1</strong></div>
                          <h1 className='job-create-section-header'>Vessel Information</h1>
                      </div>

                      <FormGroup>
                          <Label className='job-create-section-label'>Job Number</Label>
                          <Input type="text" onChange={this.handleJobIdChange} value={this.state.jobId}
                                 placeholder='Enter Job Number' className='job-create-section-input'/>
                          <FormText color="red" className="job-create-section-formtext">* If left blank, Job Number
                              will be auto-generated.</FormText>
                      </FormGroup>

                      <FormGroup>
                          <Label className='job-create-section-label'>Vessel Loading Location</Label>
                          <Input type="select" value={this.state.vesselLoadingLocation}
                                 onChange={this.handleVesselLoadingLocationChange}
                                 className='job-create-section-input'>
                              <option>PSA</option>
                              <option>Jurong Port</option>
                              <option>Others</option>
                          </Input>
                          {
                              this.state.vesselLoadingLocation === 'PSA'
                                  ?
                                  <FormText color="red" className="job-create-section-formtext">* For PSA deliveries,
                                      please note that delivery time will be based on the closest upcoming vessel
                                      berth.</FormText>
                                  : ''
                          }
                          <FormText color="red" className="job-create-section-formtext">* 'Jurong Port' here refers to
                              the JP Lighterage Terminals. For Jurong Port, please select 'Others'.</FormText>
                      </FormGroup>

                      {
                          this.state.vesselLoadingLocation === 'Others'
                              ? <FormGroup>
                                  <Label className='job-create-section-label'>Address of Vessel Loading Location</Label>
                                  <Input type="text" value={this.state.otherVesselLocation}
                                         onChange={this.handleOtherVesselLocationChange}
                                         className='job-create-section-input'
                                         required
                                  >
                                  </Input>
                              </FormGroup>
                              : ''
                      }

                      <FormGroup>
                          <Label className='job-create-section-label'>Vessel Name</Label>
                          <Typeahead id='vesselNameInput'
                                     renderMenuItemChildren={this._renderMenuItemChildren}
                                     renderMenu={this.renderMenu}
                                     labelKey="vesselName"
                                     options={this.state.vessels}
                                     placeholder="Enter Vessel Name"
                                     maxResults={1000}
                                     paginate={false}
                                     minLength={3}
                                     onInputChange={this.handleTypeAheadVesselNameChange}
                                     onChange={(selected) => {
                                         this.handleTypeAheadVesselSelect(selected);
                                     }}
                                     inputProps={{className: 'job-create-section-input margin-bottom-zero'}}
                                     filterBy={this.filter}
                                     emptyLabel={false}
                          />
                          <span className='job-create-section-label-helper-text'><i>If vessel is not listed, it is okay to just submit the form.</i></span>
                      </FormGroup>

                      {
                          this.state.vesselIMOID !== ''
                              ? <FormGroup>
                                  <Label className='job-create-section-label'>Vessel IMO</Label>
                                  <Input type="text" className='job-create-section-input' value={this.state.vesselIMOID}
                                         disabled/>
                              </FormGroup> : ''
                      }

                      {
                          this.state.vesselCallsign !== ''
                              ? <FormGroup>
                                  <Label className='job-create-section-label'>Vessel Callsign</Label>
                                  <Input type="text" className='job-create-section-input'
                                         value={this.state.vesselCallsign} disabled/>
                              </FormGroup> : ''
                      }

                      {this.state.vesselLoadingLocation === 'Jurong Port'
                          ? <div>
                              <FormGroup style={{marginBottom: '0px'}}>
                                  <Label className='job-create-section-label'>Lighter Name
                                      (Optional)</Label>
                                  <Input type="text"
                                         onChange={this.handleVesselLighterNameChange}
                                         value={this.state.vesselLighterName}
                                         className='job-create-section-input'
                                         placeholder='Enter Lighter Name'/>
                              </FormGroup>
                              <FormGroup>
                                  <Label className='job-create-section-label'>Lighter Location</Label>
                                  <Input type="select" value={this.state.vesselLighterLocation}
                                         onChange={this.handleVesselLighterLocationChange}
                                         className='job-create-section-input'>
                                      <option>Marina South Wharves</option>
                                      <option>Penjuru Terminal</option>
                                  </Input>
                              </FormGroup>
                              <FormGroup>
                                  <Label className='job-create-section-label'>Lighter Contact Remarks
                                      (Optional)</Label>
                                  <Input type="textarea" value={this.state.vesselLighterRemarks} rows="3"
                                         className='job-create-section-input'
                                         style={{marginBottom: 0}}
                                         onChange={this.handleVesselLighterRemarksChange}/>
                                  <span className='job-create-section-label-helper-text'><i>Please enter contact details for lighter here</i></span>
                              </FormGroup>
                          </div>
                          : ''
                      }
                  </Col>
              </Row>
              <Divider className='job-create-section-divider'/>

              {this.renderJobTimeInfo()}

              <Row className='job-create-section'>
                  <Col xs={12} sm={9}>
                      <div className='d-flex align-items-center job-create-section-heading'>
                          <div className='job-create-green-circle'>
                              <strong>{this.state.vesselLoadingLocation === 'PSA' ? '2' : '3'}</strong></div>
                          <h1 className='job-create-section-header'>Delivery Details</h1>
                      </div>
                      <FormRB.Group>
                          <FormRB.Label className='job-create-section-label'>Items to
                              Deliver</FormRB.Label>
                          <FormRB.Control as="input"
                                          value={jobItemText.join(', ')}
                                          onClick={(e) => {
                                              this.setState({ItemsDeliverAnchorEl: e.currentTarget})
                                          }}
                                          style={{marginBottom: 0}}
                                          className='job-create-section-input' onChange={() => {
                          }}>
                          </FormRB.Control>
                          <span className='job-create-section-label-helper-text'><i>* Please let us know if you have any refrigeration, fragile, dangerous or over-sized items in the remarks</i></span>
                          <br/>
                          <span className='job-create-section-label-helper-text'><i>* Please let us know whether blue bin needs to be provided in the remarks</i></span>
                          <br/>
                          <span className='job-create-section-label-helper-text' style={{color: 'red'}}><i>* We have a standard sizing, please refer to our Terms of Services</i></span>
                          <Popover
                              open={openDeliver}
                              anchorEl={this.state.ItemsDeliverAnchorEl}
                              onClose={this.handleDeliverClose}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                              }}
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                              }}
                          >
                              {/* <JobItemInput jobItems={this.state.jobItems}
                                            job={this.state.job}
                                            setItems={(jobItems) => this.setState({jobItems})}
                                            disabled={false}
                                            type={"delivery"}
                              /> */}

                          </Popover>
                      </FormRB.Group>

                      <FormRB.Group>
                          <FormRB.Label className='job-create-section-label'>Items to
                              Offland (Optional)</FormRB.Label>
                          <FormRB.Control as="input"
                                          value={jobOfflandItemsText.join(', ')}
                                          onClick={(e) => {
                                              this.setState({ItemsOfflandAnchorEl: e.currentTarget})
                                          }}
                                          className='job-create-section-input' onChange={() => {
                          }}>
                          </FormRB.Control>
                          <Popover
                              open={openOffland}
                              anchorEl={this.state.ItemsOfflandAnchorEl}
                              onClose={this.handleOfflandClose}
                              anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                              }}
                              transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'left',
                              }}
                          >
                              {/* <JobItemInput jobItems={this.state.jobOfflandItems}
                                            job={this.state.job}
                                            setItems={(jobOfflandItems) => this.setState({jobOfflandItems})}
                                            disabled={false}
                                            type={"Offland"}
                              /> */}
                          </Popover>
                      </FormRB.Group>
                      <FormGroup>
                          <Label className='job-create-section-label'>Remarks (Optional)</Label>
                          <Input type="textarea" value={this.state.remarks} rows="7"
                                 className='job-create-section-input margin-bottom-zero'
                                 onChange={this.handleRemarksChange}/>
                          <span className='job-create-section-label-helper-text'><i>* If you require pickup, please input address in the remarks.</i></span>
                      </FormGroup>
                      <FormControlLabel
                          value="dsa"
                          control={<Checkbox color="default" checked={this.state.createDSA}
                                             className='create-dsa-checkbox'/>}
                          onChange={this.handleCreateDSAChange}
                          label={this.renderText()}
                      />
                  </Col>
              </Row>
              <Row className='job-create-section-action'>
                  <Col xs={12}>
                      <div className='d-flex align-items-center justify-content-center'>
                          <Button variant='success' className='job-create-submit-btn'
                                  onClick={this.handleNextStep}>Submit</Button>
                          <Button variant='outline-success' className='job-create-cancel-btn'
                                  onClick={this.props.handleCloseModal}>Cancel</Button>

                      </div>
                  </Col>
              </Row>
          </div>

      );
  };

  renderJobPayment = () => {
      if (this.state.vesselQueryResults.length > 1) {
          return (
              <div>
                  <Row className='job-create-section full-height'>
                      <Col>
                          <div className='d-flex align-items-center job-create-section-heading-price'>
                              <h1 className='job-create-section-header-price'>Confirm Booking?</h1>
                          </div>
                          <div>
                              <FormControl component="fieldset">
                                  <FormLabel component="legend" className='job-create-section-label'
                                             style={{paddingTop: 10, paddingBottom: 10}}>Please Select a
                                      Vessel:</FormLabel>
                                  <RadioGroup
                                      value={this.state.vesselSelected}
                                      onChange={this.handleVesselSelectChange}
                                  >
                                      {this.state.vesselQueryResults.map((obj, index) => {
                                          return (
                                              <FormControlLabel key={index} value={obj.vesselIMOID} control={<Radio/>}
                                                                label={`${obj.vesselName}, ${obj.vesselIMOID}`}/>
                                          );
                                      })}
                                  </RadioGroup>
                              </FormControl>
                          </div>
                          <div className='d-flex align-items-center justify-content-center'
                               style={{marginTop: "20px"}}>
                              <Button disabled={!this.state.submitButtonActive} variant='success'
                                      className='job-create-submit-btn'
                                      type="submit">Yes</Button>
                              <Button variant='outline-success' className='job-create-cancel-btn'
                                      onClick={this.props.handleCloseModal}>No</Button>
                          </div>
                      </Col>
                  </Row>
              </div>
          );
      } else {
          return (
              <div>
                  <Row className='job-create-section full-height'>
                      <Col>
                          <div className='d-flex align-items-center job-create-section-heading-price'>
                              <h1 className='job-create-section-header-price'>Confirm Booking?</h1>
                          </div>

                          <div className='d-flex align-items-center justify-content-center'
                               style={{marginTop: "20px"}}>
                              <Button disabled={!this.state.submitButtonActive} variant='success'
                                      className='job-create-submit-btn'
                                      type="submit">Yes</Button>
                              <Button variant='outline-success' className='job-create-cancel-btn'
                                      onClick={this.props.handleCloseModal}>No</Button>
                          </div>
                      </Col>
                  </Row>
              </div>
          );
      }
      // return (<div>
      //     <Row className='job-create-section full-height'>
      //         <Col>
      //             <div className='d-flex align-items-center job-create-section-heading-price'>
      //                 <h1 className='job-create-section-header-price'>Price</h1>
      //             </div>
      //             <JobCreatePriceTable tableHeading="Items to Deliver" jobItems={this.state.jobItems}/>
      //             <br/>
      //             {
      //                 this.state.jobOfflandItems.length > 0
      //                     ?
      //                     <JobCreatePriceTable tableHeading="Items to Offland" jobItems={this.state.jobOfflandItems}/>
      //                     : ''
      //             }
      //             <div className='d-flex align-items-center justify-content-center' style={{marginTop: "20px"}}>
      //                 <Button variant='success' className='job-create-submit-btn'
      //                         type="submit">Submit</Button>
      //                 <Button variant='outline-success' className='job-create-cancel-btn'
      //                         onClick={this.props.handleCloseModal}>Cancel</Button>
      //             </div>
      //         </Col>
      //     </Row>
      // </div>)
  };

  renderSuccess = () => {
      return (
          <Row className='job-create-section-success'>
              <Col>
                  <div
                      className='d-flex align-items-center justify-content-center flex-column job-create-section-heading-price'>
                      <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                          <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                          <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                      </svg>
                      <p className='job-create-success-text text-center'>You have successfully booked a job with
                          Simpfleet.</p>
                      <Button variant='success' className='job-create-details-btn' onClick={() => {
                          /* this.props.history.push(`/job_details?job=${this.state.job.index}`); */
                          if (this.props.mobile) {
                              this.props.handlePopoverOpen();
                              this.props.handleCloseModal();
                              this.props.handleCloseMenu();
                          }
                          ;
                      }}>View your job details</Button>
                  </div>
              </Col>
          </Row>
      );
  };

  renderForm = () => {
      let formDisplay;
      if (this.state.activeStep === 0) {
          formDisplay = this.renderJobInfo();
      } else if (this.state.activeStep === 1) {
          formDisplay = this.renderJobPayment();
      } else if (this.state.activeStep === 2) {
          formDisplay = this.renderSuccess();
      }

      return (
          <Form onSubmit={this.onSubmit} style={{height: "100%"}}>
              {formDisplay}
          </Form>
      );
  };

  render() {
    return (
      <Container fluid style={{ height: "100%" }}>
        <Row style={{ height: "100%" }}>
          <Col xs={12}> {this.renderForm()} </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(CreateJob));
