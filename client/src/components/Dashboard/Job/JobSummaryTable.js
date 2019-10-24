import "./JobSummaryTable.css";
import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Table } from "reactstrap";
import MediaQuery from "react-responsive";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";

import JobSummaryTableDisplayMobile from "./JobSummaryTableDisplayMobile";
import JobSummaryTableSearchBar from "./JobSummaryTableSearchBar";
import Slide from "@material-ui/core/Slide";
import JobShareModal from "../../Job/JobDetails/JobShareModal/JobShareModal";
import JobShareSlide from "../../Job/JobShareSlide/JobShareSlide";

function priceRow(qty, price) {
  // return qty * price;
  return 0;
}

function createRow(name, imo, vesselName, status, job, eta, price) {
  return {
    name: name,
    vesselImo: imo,
    vesselName: vesselName,
    status: status,
    job: job,
    eta: eta,
    price: price
  };
}

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

  componentDidMount() {
    // Get all jobs
    axios
      .get(
        `/api/jobs?user_only=${this.props.user_only}&numLimit=${
          this.props.numLimit ? this.props.numLimit : false
        }&archive_only=${
          this.props.archive_only ? this.props.archive_only : false
        }&non_archive_only=${
          this.props.non_archive_only ? this.props.non_archive_only : false
        }&page=${
          this.props.page === undefined ? false : this.props.page
        }&limit=${this.props.limit === undefined ? false : this.props.limit}`
      )
      .then(res => {
        const data = [];
        const jobs = res.data.sort((a, b) => {
          return (
            new Date(b.jobBookingDateTime.toString()) -
            new Date(a.jobBookingDateTime.toString())
          );
        });
        this.setState({
          jobs: jobs
        });
        for (let i = 0; i < jobs.length; i++) {
          let job = jobs[i];
          job.jobTrackers.sort((a, b) => {
            return b.index - a.index;
          });
          const subtotal = job.jobItems
            .reduce((a, jobItem) => {
              a.push(priceRow(jobItem.quantity, jobItem.price));
              return a;
            }, [])
            .reduce((sum, i) => sum + i, 0);
          data.push(
            createRow(
              job.jobId,
              job.vessel !== null ? job.vessel.vesselIMOID : "",
              job.vessel !== null ? job.vessel.vesselName : "",
              job.jobTrackers,
              job,
              job.vesselArrivalDateTime,
              subtotal
            )
          );
        }
        this.setState({
          data: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleRowClick = (e, rd) => {
    let index = rd.tableData.id;
    this.props.history.push(`/job_details?job=${this.state.jobs[index].index}`);
  };

  handleShareModalClose = () => {
    this.setState({ showSharingModal: false, inputSelected: false });
  };

  handleCopy = () => {
    this.setState({ copied: true });
    window.setTimeout(() => {
      this.setState({ copied: false });
    }, 5000);
  };

  handleCopiedClose = () => {
    this.setState({ copied: false });
  };

  handleArchiveClose = () => {
    this.setState({ archived: false });
  };

  SlideTransition = props => {
    return <Slide {...props} direction="up" />;
  };

  saveJobArchive = job => {
    // Save job details
    axios
      .put("/api/jobs", {
        job,
        sendEmailUpdate: false
      })
      .then(res => {
        this.props.history.push("/history");
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSelect = e => {
    this.setState({ inputSelected: true });
  };

  render() {
    switch (this.state.jobs) {
      case null:
        return <div></div>;
      default:
        switch (this.props.auth) {
          case null:
            return <div></div>;
          default:
            const vesselDeliveries = this.state.jobs
              .sort((a, b) => {
                return (
                  new Date(b.jobBookingDateTime.toString()) -
                  new Date(a.jobBookingDateTime.toString())
                );
              })
              .map((job, index) => {
                const { vessel, user, jobTrackers } = job;
                const jobTracker = jobTrackers.sort((a, b) => {
                  return b.index - a.index;
                })[0];

                let statusString = jobTracker.title;
                let statusStyle = { color: "red" };
                if (job.isCancelled === "Confirmed") {
                  statusString = "Job Cancelled";
                } else if (job.isCancelled === "Pending") {
                  statusString = "Cancel Requested";
                } else if (job.isCancelled === "Denied") {
                  statusString = "Cancellation Denied";
                } else {
                  statusStyle = {};
                }
                let vesselName = "";
                let vesselIMOID = "";
                if (vessel === null) {
                  vesselName = "";
                  vesselIMOID = "";
                } else {
                  vesselName = vessel.vesselName;
                  vesselIMOID = vessel.vesselIMOID;
                }

                return (
                  <tr
                    key={index}
                    className="job-summary-table-row"
                    onClick={e =>
                      this.props.history.push(`/job_details?job=${job.index}`)
                    }
                  >
                    {this.props.auth.userType === "Admin" ? (
                      <td data-title="Company">{user.companyName}</td>
                    ) : (
                      ""
                    )}
                    <td data-title="Job Number">{job.jobId}</td>
                    <td data-title="Vessel IMO">{vesselIMOID}</td>
                    <td data-title="Vessel Name">{vesselName}</td>
                    <td data-title="Status" style={statusStyle}>
                      {statusString}
                    </td>
                  </tr>
                );

                return (
                  <tr
                    key={index}
                    className="job-summary-table-row"
                    onClick={e =>
                      this.props.history.push(`/job_details?job=${job.index}`)
                    }
                  >
                    {this.props.auth.userType === "Admin" ? (
                      <td data-title="Company">{user.companyName}</td>
                    ) : (
                      ""
                    )}
                    <td data-title="Job Number">{job.jobId}</td>
                    <td data-title="Vessel IMO">
                      {vessel !== null ? vessel.vesselIMOID : ""}
                    </td>
                    <td data-title="Vessel Name">
                      {vessel !== null ? vessel.vesselName : ""}
                    </td>
                    <td data-title="Status" style={statusStyle}>
                      {statusString}
                    </td>
                  </tr>
                );
              });

            return (
              <div className="job-summary-table-padding">
                {this.props.auth.userType === "Admin" ? (
                  <Table
                    bordered
                    hover
                    striped
                    responsive
                    className="responsive-table"
                  >
                    <thead>
                      <tr>
                        {this.props.auth.user.userType === "Admin" ? (
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
                    <tbody>{vesselDeliveries}</tbody>
                  </Table>
                ) : (
                  <div>
                    <MediaQuery minWidth={768}>
                      {/* webview table */}
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
                      {this.state.jobClicked ? (
                        <div>
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
                        </div>
                      ) : (
                        ""
                      )}
                    </MediaQuery>
                    <MediaQuery maxWidth={767}>
                      {/* mobileview table */}
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
                      {this.state.jobClicked ? (
                        <div>
                          {
                            <JobShareSlide
                              open={this.state.showSharingModal}
                              onClose={this.handleShareModalClose}
                              joblinkurl={`localhost:3000/job_invitations/${this.state.jobClicked.index}`}
                              job={this.state.jobClicked}
                              inputSelected={this.state.inputSelected}
                              handleSelect={this.handleSelect}
                            />
                          }
                        </div>
                      ) : (
                        ""
                      )}
                    </MediaQuery>

                    <Snackbar
                      anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                      open={this.state.archived}
                      message={
                        <span id="message-id">Item has been Archived</span>
                      }
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
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(JobSummaryTable));
