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
import Pagination from "../../common/Pagination";
// import ExcelJs from "exceljs/dist/es5/exceljs.browser.js";
import { saveAs } from "file-saver";
import * as ExcelJs from 'exceljs/dist/exceljs';
import moment from "moment";

function priceRow(qty, price) {
  // return qty * price;
  return 0;
}

function createRow(
  name,
  imo,
  vesselName,
  status,
  job,
  eta,
  price,
  File,
  Assignment
) {
  return {
    name: name,
    vesselImo: imo,
    vesselName: vesselName,
    status: status,
    job: job,
    eta: eta,
    price: price,
    File: File,
    Assignment: Assignment
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
    inputSelected: false,
    jobFilesArray: [],
    jobAssignmentArray: [],
    activeFilter: "",
    logisticCompany: []
  };

  componentDidMount() {
    /* get all job files */
    axios
      .get("api/job_files/all")
      .then(res => {
        const contents = res.data;
        this.setState({ jobFilesArray: contents });
        /* get all job assignment */
        axios.get("api/job_assignments/all").then(res => {
          const contents = res.data;
          this.setState({ jobAssignmentArray: contents });
          // Get all jobs
          axios
            .get(
              `/api/jobs?user_only=${this.props.user_only}&numLimit=${
                this.props.numLimit ? this.props.numLimit : false
              }&archive_only=${
                this.props.archive_only ? this.props.archive_only : false
              }&non_archive_only=${
                this.props.non_archive_only
                  ? this.props.non_archive_only
                  : false
              }`
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

              /* loop job & set job to data's state */
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
                /* comparing job files */
                const jobFile = [];
                for (let i = 0; i < this.state.jobFilesArray.length; i++) {
                  if (job._id === this.state.jobFilesArray[i].job) {
                    jobFile.push(this.state.jobFilesArray[i]);
                  }
                }
                /* comparing job assignments */
                const jobAssignment = [];
                for (let i = 0; i < this.state.jobAssignmentArray.length; i++) {
                  if (
                    job.jobId === this.state.jobAssignmentArray[i].job.jobId
                  ) {
                    jobAssignment.push(this.state.jobAssignmentArray[i]);
                  }
                }
                data.push(
                  createRow(
                    job.jobId,
                    job.vessel !== null ? job.vessel.vesselIMOID : "",
                    job.vessel !== null ? job.vessel.vesselName : "",
                    job.jobTrackers,
                    job,
                    job.vesselArrivalDateTime,
                    subtotal,
                    jobFile,
                    jobAssignment
                  )
                );
              }
              if (this.state.activeFilter === "pendingJob") {
                const filtered = data.filter(items => {
                  return (
                    items.job.isCancelled !== "Confirmed" &&
                    items.job.jobTrackers.length === 1
                  );
                });
                this.setState({
                  data: filtered,
                  activeFilter: "pendingJob"
                });
              } else if (this.state.activeFilter === "ongoingJob") {
                const filtered = data.filter(items => {
                  return (
                    items.job.isCancelled !== "Confirmed" &&
                    items.job.jobTrackers.length < 6 &&
                    items.job.jobTrackers.length > 1
                  );
                });
                this.setState({
                  data: filtered
                });
              } else if (this.state.activeFilter === "closedJob") {
                const filtered = data.filter(items => {
                  return (
                    items.job.isCancelled !== "Confirmed" &&
                    items.job.jobTrackers.length === 6
                  );
                });
                this.setState({
                  data: filtered,
                  activeFilter: "closedJob"
                });
              } else if (this.state.activeFilter === "cancelledJob") {
                const filtered = data.filter(
                  items => items.job.isCancelled === "Confirmed"
                );
                this.setState({
                  data: filtered,
                  activeFilter: "cancelledJob"
                });
              } else {
                this.setState({
                  data: data
                });
              }
              this.setState({
                dataBackup: data
              });
            });
        });
      })
      .catch(err => {
        console.log(err);
      });
    /* get logistic company */
    axios.get("api/logistics_companies").then(res => {
      this.setState({ logisticCompany: res.data });
    });
  }
  reload = () => {
    this.componentDidMount();
  };

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

  /* filter function */
  /* pending job */
  pendingJobFilter = () => {
    if (this.state.activeFilter === "pendingJob") {
      this.setState({
        data: this.state.dataBackup,
        activeFilter: ""
      });
    } else {
      const filtered = this.state.dataBackup.filter(items => {
        return (
          items.job.isCancelled !== "Confirmed" &&
          items.job.jobTrackers.length === 1
        );
      });
      this.setState({
        data: filtered,
        activeFilter: "pendingJob"
      });
    }
  };
  /* ongoing job */
  ongoingJobFilter = () => {
    if (this.state.activeFilter === "ongoingJob") {
      this.setState({
        data: this.state.dataBackup,
        activeFilter: ""
      });
    } else {
      const filtered = this.state.dataBackup.filter(items => {
        return (
          items.job.isCancelled !== "Confirmed" &&
          items.job.jobTrackers.length < 6 &&
          items.job.jobTrackers.length > 1
        );
      });
      this.setState({
        data: filtered,
        activeFilter: "ongoingJob"
      });
    }
  };
  /* closed job */
  closedJobFilter = () => {
    if (this.state.activeFilter === "closedJob") {
      this.setState({
        data: this.state.dataBackup,
        activeFilter: ""
      });
    } else {
      const filtered = this.state.dataBackup.filter(items => {
        return (
          items.job.isCancelled !== "Confirmed" &&
          items.job.jobTrackers.length === 6
        );
      });
      this.setState({
        data: filtered,
        activeFilter: "closedJob"
      });
    }
  };
  /* cancelled job */
  cancelledJobFilter = () => {
    if (this.state.activeFilter === "cancelledJob") {
      this.setState({
        data: this.state.dataBackup,
        activeFilter: ""
      });
    } else {
      const filtered = this.state.dataBackup.filter(
        items => items.job.isCancelled === "Confirmed"
      );
      this.setState({
        data: filtered,
        activeFilter: "cancelledJob"
      });
    }
  };

  exportTable = () => {
    const wb = new ExcelJs.Workbook();

    const ws = wb.addWorksheet();

    ws.columns = [
      { header: "Job Created", key: "Job Created", width: 20 },
      { header: "Date of Delivery", key: "Date of Delivery", width: 25 },
      { header: "Client", key: "Client", width: 30 },
      { header: "Job Number", key: "Job Number", width: 15 },
      { header: "Vessel", key: "Vessel", width: 25 },
      {
        header: "Vessel Loading Location",
        key: "Vessel Loading Location",
        width: 25
      },
      { header: "Delivery Items", key: "Delivery Items", width: 30 },
      { header: "Offland Items", key: "Offland Items", width: 30 },
      { header: "Billing", key: "Billing", width: 20 },
      { header: "Status", key: "Status", width: 25 },
      { header: "Document", key: "Document", width: 20 },
      { header: "3PL", key: "3PL", width: 20 }
    ];

    for (let i = 0; i < this.state.data.length * 2; i += 2) {
      /* pending job */
      ws.mergeCells(`A${i + 2}:A${i + 3}`);
      /* Date of Delivery */
      ws.mergeCells(`B${i + 2}:B${i + 3}`);
      /* Client */
      ws.mergeCells(`C${i + 2}:C${i + 3}`);
      /* Job Number */
      ws.mergeCells(`D${i + 2}:D${i + 3}`);
      /* Vessel Loading Location */
      ws.mergeCells(`F${i + 2}:F${i + 3}`);
      /* Delivery Items */
      ws.mergeCells(`G${i + 2}:G${i + 3}`);
      /* Offland Items */
      ws.mergeCells(`H${i + 2}:H${i + 3}`);
      /* 3pl */
      ws.mergeCells(`L${i + 2}:L${i + 3}`);
    }

    for (let i = 1; i < this.state.data.length + 1; i++) {
      /* job created */
      ws.getCell(`A${i * 2}`).value = moment(
        this.state.data[i - 1].job.jobBookingDateTime
      ).format("DD MMM YYYY, HH:mm");
      /* client */
      ws.getCell(`C${i * 2}`).value =
        this.state.data[i - 1].job.user.firstName +
        " " +
        this.state.data[i - 1].job.user.lastName +
        ", " +
        this.state.data[i - 1].job.user.userCompany.name;
      /* job number */
      ws.getCell(`D${i * 2}`).value = this.state.data[i - 1].name;
      /* Vessel || Vessel Loading Location */
      if (this.state.data[i - 1].job.vessel === null) {
        ws.getCell(`E${i * 2}`).value = "";
        ws.getCell(`E${i * 2 + 1}`).value = "";
        ws.getCell(`F${i * 2}`).value = "";
      } else {
        ws.getCell(`E${i * 2}`).value = this.state.data[
          i - 1
        ].job.vessel.vesselName.toUpperCase();
        ws.getCell(`E${i * 2 + 1}`).value = this.state.data[
          i - 1
        ].job.vessel.vesselIMOID;
        if (
          this.state.data[i - 1].job.vesselLoadingLocationObj === undefined ||
          this.state.data[i - 1].job.vesselLoadingLocationObj === null
        ) {
          ws.getCell(`F${i * 2}`).value = "";
        } else {
          ws.getCell(`F${i * 2}`).value = this.state.data[
            i - 1
          ].job.vesselLoadingLocationObj.name;
        }
      }
      let deliverItems = "";
      let offlandItems = "";
      /* deliver items */
      for (let x = 0; x < this.state.data[i - 1].job.jobItems.length; x++) {
        deliverItems =
          deliverItems +
          this.state.data[i - 1].job.jobItems[x].quantity +
          " " +
          this.state.data[i - 1].job.jobItems[x].uom +
          ", ";
      }
      /* offland items */
      for (
        let x = 0;
        x < this.state.data[i - 1].job.jobOfflandItems.length;
        x++
      ) {
        offlandItems =
          offlandItems +
          this.state.data[i - 1].job.jobOfflandItems[x].quantity +
          " " +
          this.state.data[i - 1].job.jobOfflandItems[x].uom +
          ", ";
      }
      ws.getCell(`G${i * 2}`).value = deliverItems;
      ws.getCell(`H${i * 2}`).value = offlandItems;
      /* billing */
      if (this.state.data[i - 1].job.paymentTrackers.length === 3) {
        ws.getCell(`I${i * 2}`).value = this.state.data[
          i - 1
        ].job.paymentTrackers[2].label;
      } else if (this.state.data[i - 1].job.paymentTrackers.length === 2) {
        ws.getCell(`I${i * 2}`).value = this.state.data[
          i - 1
        ].job.paymentTrackers[1].label;
      } else if (this.state.data[i - 1].job.paymentTrackers.length === 1) {
        ws.getCell(`I${i * 2}`).value = this.state.data[
          i - 1
        ].job.paymentTrackers[0].label;
      }
      ws.getCell(`I${i * 2 + 1}`).value = "$-";
      /* status */
      if (this.state.data[i - 1].job.isCancelled === "Confirmed") {
        ws.getCell(`J${i * 2}`).value = "Job has been cancelled";
      } else {
        ws.getCell(`J${i * 2}`).value = this.state.data[i - 1].status[0].title;
      }
      ws.getCell(`J${i * 2 + 1}`).value = moment(
        this.state.data[i - 1].status[0].timestamp
      ).format("MMM DD YYYY, HH:mm");
      /* document */
      if (this.state.data[i - 1].File.length > 0) {
        ws.getCell(`K${i * 2}`).value = "Uploaded";
        ws.getCell(`K${i * 2 + 1}`).value = moment(
          this.state.data[i - 1].File[0].timeUploaded
        ).format("MMM, DD YYYY, HH:mm");
      } else {
        ws.getCell(`K${i * 2}`).value = "Not yet uploaded";
      }
      /* 3pl */
      if (this.state.data[i - 1].Assignment.length !== 0) {
        if (this.state.data[i - 1].Assignment[0].status !== "Pending") {
          if (
            this.state.data[i - 1].Assignment[0].logisticsCompany !== undefined
          ) {
            ws.getCell(`L${i * 2}`).value = this.state.data[
              i - 1
            ].Assignment[0].logisticsCompany.name;
          }
        }
      }
    }

    if (this.state.activeFilter !== "") {
      let fileName = "";
      fileName = `dashboard filtered by ${this.state.activeFilter}`;
      wb.xlsx.writeBuffer().then(buf => {
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
      });
    } else {
      wb.xlsx.writeBuffer().then(buf => {
        saveAs(new Blob([buf]), "dashboard.xlsx");
      });
    }
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
            const { postsPerPage, currentPage, paginate } = this.props;
            const indexOfLastPost = currentPage * postsPerPage;
            const indexofFirstPost = indexOfLastPost - postsPerPage;
            /* admin */
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
                        exportTable={this.exportTable}
                        reload={this.reload}
                        logisticCompany={this.state.logisticCompany}
                        activeFilter={this.state.activeFilter}
                        pendingJobFilter={this.pendingJobFilter.bind(this)}
                        ongoingJobFilter={this.ongoingJobFilter.bind(this)}
                        cancelledJobFilter={this.cancelledJobFilter.bind(this)}
                        closedJobFilter={this.closedJobFilter.bind(this)}
                        check={postsPerPage}
                        data={
                          postsPerPage
                            ? this.state.data.slice(
                                indexofFirstPost,
                                indexOfLastPost
                              )
                            : this.state.data
                        }
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
                        data={
                          postsPerPage
                            ? this.state.data.slice(
                                indexofFirstPost,
                                indexOfLastPost
                              )
                            : this.state.data
                        }
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
                      anchorOrigin={{
                        horizontal: "left",
                        vertical: "bottom"
                      }}
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
                <br />
                {postsPerPage ? (
                  <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={this.state.data.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                ) : null}
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
