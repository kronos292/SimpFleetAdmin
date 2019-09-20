import "./JobSummaryTable.css";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import MediaQuery from "react-responsive";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";

import JobSummaryTableDisplayMobile from "./JobSummaryTableDisplayMobile";
import JobSummaryTableSearchBar from "./JobSummaryTableSearchBar";

class JobSummaryTable extends Component {
  state = {
    jobs: null,
    data: [],
    showSharingModal: false,
    copied: false,
    jobClicked: null,
    archived: false,
    inputSelected: false
  };

  componentDidMount() {}

  render() {
    /* switch (this.state.jobs) {
      case null:
          return <div></div>;
      default: */
    switch (this.props.auth) {
      case null:
        return <div></div>;
      default:
        {
          /* const vesselDeliveries = this.state.jobs.sort((a, b) => {
                      return new Date(b.jobBookingDateTime.toString()) - new Date(a.jobBookingDateTime.toString());
                  }).map((job, index) => {
                      const {vessel, user, jobTrackers} = job;
                      const jobTracker = jobTrackers.sort((a, b) => {
                          return b.index - a.index;
                      })[0];

                      let statusString = jobTracker.title;
                      let statusStyle = {color: "red"};
                      if (job.isCancelled === 'Confirmed') {
                          statusString = "Job Cancelled";
                      } else if (job.isCancelled === 'Pending') {
                          statusString = "Cancel Requested";
                      } else if (job.isCancelled === 'Denied') {
                          statusString = "Cancellation Denied";
                      } else {
                          statusStyle = {};
                      }

                      return (
                          <tr key={index} className="job-summary-table-row"
                              onClick={(e) => this.props.history.push(`/job_details?job=${job.index}`)}>
                              {
                                  this.props.auth.userType === 'Admin' ?
                                      <td data-title="Company">{user.companyName}</td> : ''
                              }
                              <td data-title="Job Number">{job.jobId}</td>
                              <td data-title="Vessel IMO">{vessel.vesselIMOID}</td>
                              <td data-title="Vessel Name">{vessel.vesselName}</td>
                              <td data-title="Status"
                                  style={statusStyle}>{statusString}</td>
                          </tr>
                      );
                  }); */
        }

        return (
          <div className="job-summary-table-padding">
            {this.props.auth.user.userType === "admin" ? (
              <Table
                bordered
                hover
                striped
                responsive
                className="responsive-table"
              >
                <thead>
                  <tr>
                    {this.props.auth.user.userType === "admin" ? (
                      <th>Company</th>
                    ) : (
                      ""
                    )}
                    <th>Job Number</th>
                    <th>Vessel IMO</th>
                    <th>Vessel Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {vesselDeliveries} */}
                  <tr
                    className="job-summary-table-row"
                    /* key={index} onClick={(e) => this.props.history.push(`/job_details?job=${job.index}`)} */
                  >
                    {this.props.auth.user.userType === "admin" ? (
                      <td data-title="Company">
                        {/* {user.companyName} */} companyname
                      </td>
                    ) : (
                      ""
                    )}
                    <td data-title="Job Number">{/* {job.jobId} */} job id</td>
                    <td data-title="Vessel IMO">
                      {/* {vessel.vesselIMOID} */} vesselIMOID
                    </td>
                    <td data-title="Vessel Name">
                      {/* {vessel.vesselName} */} vesselName
                    </td>
                    <td data-title="Status" /* style={statusStyle} */>
                      {/* {statusString} */} status String
                    </td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <div>
                <MediaQuery minWidth={768}>
                  <JobSummaryTableSearchBar
                    data={this.state.data}
                    showSharingModal={this.state.showSharingModal}
                    toggleSharingModal={showSharingModal => {
                      this.setState({ showSharingModal });
                    }}
                    jobClicked={jobClicked => {
                      this.setState({ jobClicked });
                    }}
                    handleRowClick={this.handleRowClick}
                    saveJobArchive={this.saveJobArchive}
                    allowArchive={this.props.allowArchive}
                    button={this.props.button}
                  />
                  {this.state.jobClicked
                    ? {
                        /* <div>
                      <JobShareModal
                        show={this.state.showSharingModal}
                        joblinkurl={`localhost:3000/job_invitations/${this.state.jobClicked.index}`}
                        Close={this.handleShareModalClose}
                        job={this.state.jobClicked}
                        copied={this.handleCopy}
                      />

                      <Snackbar
                        anchorOrigin={{
                          horizontal: "left",
                          vertical: "bottom"
                        }}
                        open={this.state.copied}
                        message={
                          <span id="message-id">Link Has Been Copied</span>
                        }
                        action={
                          <IconButton
                            key="close"
                            color="inherit"
                            onClick={this.handleCopiedClose}
                          >
                            <CloseIcon />
                          </IconButton>
                        }
                        TransitionComponent={this.SlideTransition}
                      />
                    </div> */
                      }
                    : ""}
                </MediaQuery>
                <MediaQuery maxWidth={767}>
                  <JobSummaryTableDisplayMobile
                    data={this.state.data}
                    showSharingModal={this.state.showSharingModal}
                    toggleSharingModal={showSharingModal => {
                      this.setState({ showSharingModal });
                    }}
                    jobClicked={jobClicked => {
                      this.setState({ jobClicked });
                    }}
                    handleRowClick={this.handleRowClick}
                    saveJobArchive={this.saveJobArchive}
                    allowArchive={this.props.allowArchive}
                    button={this.props.button}
                    title={this.props.title}
                  />
                  {this.state.jobClicked
                    ? {
                        /* <div>
                      <JobShareSlide
                        open={this.state.showSharingModal}
                        onClose={this.handleShareModalClose}
                        joblinkurl={`localhost:3000/job_invitations/${this.state.jobClicked.index}`}
                        job={this.state.jobClicked}
                        inputSelected={this.state.inputSelected}
                        handleSelect={this.handleSelect}
                      />
                    </div> */
                      }
                    : ""}
                </MediaQuery>

                <Snackbar
                  anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                  open={this.state.archived}
                  message={<span id="message-id">Item has been Archived</span>}
                  action={
                    <IconButton
                      key="close"
                      color="inherit"
                      onClick={this.handleArchiveClose}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                  TransitionComponent={this.SlideTransition}
                />
              </div>
            )}
          </div>
        );
    }
    /* } */
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(JobSummaryTable));
