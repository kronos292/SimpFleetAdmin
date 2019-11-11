import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Paper from "@material-ui/core/Paper";
import MaterialTable, { MTableBodyRow } from "material-table";
import ShareIcon from "@material-ui/icons/Share";
import ArchiveIcon from "@material-ui/icons/Archive";
import moment from "moment";
import LinesEllipsis from "react-lines-ellipsis";

export default class JobSummaryTableSearchBar extends Component {
  render() {
    if (this.props.check !== undefined) {
      return (
        <MaterialTable
          columns={[
            /* job created* = created record date */
            {
              title: "Job Created",
              field: "jobCreated",
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "15vw" }}
                >
                  <div style={{ width: "100%" }}>
                    <LinesEllipsis
                      style={{ width: "100%" }}
                      text={moment(rowData.job.jobBookingDateTime).format(
                        "DD MMM YYYY, HH:mm"
                      )}
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className={"job-table-text"}
                    />
                  </div>
                </div>
              )
            },
            /* date of delivery */
            {
              title: "Date of Delivery",
              field: "dateOfDelivery",
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "15vw" }}
                >
                  <div style={{ width: "100%" }}>
                    <LinesEllipsis
                      style={{ width: "100%" }}
                      text="-"
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className={"job-table-text"}
                    />
                  </div>
                </div>
              )
            },
            /* client */
            {
              title: "Client",
              field: "userCompanyName",
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "20vw" }}
                >
                  <div style={{ width: "100%" }}>
                    <LinesEllipsis
                      style={{ width: "100%" }}
                      text={
                        rowData.job.user.userCompany !== null
                          ? rowData.job.user.firstName ===
                            rowData.job.user.lastName
                            ? rowData.job.user.firstName +
                              ", " +
                              rowData.job.user.userCompany.name
                            : rowData.job.user.firstName +
                              " " +
                              rowData.job.user.lastName +
                              ", " +
                              rowData.job.user.userCompany.name
                          : "-"
                      }
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className={"job-table-text"}
                    />
                  </div>
                </div>
              )
            },
            /* job number */
            {
              title: "Job Number",
              field: "name",
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "10vw" }}
                >
                  <div style={{ width: "100%" }}>
                    <LinesEllipsis
                      style={{ width: "100%" }}
                      text={rowData.name}
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className={"job-table-text"}
                    />
                  </div>
                </div>
              )
            },
            /* vessel */
            {
              title: "Vessel",
              field: "vesselName",
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "20vw" }}
                >
                  <div style={{ width: "100%" }}>
                    <LinesEllipsis
                      style={{ width: "100%" }}
                      text={
                        rowData.job.vessel !== null
                          ? rowData.job.vessel.vesselName.toUpperCase()
                          : ""
                      }
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className={"job-table-text"}
                    />
                    <i className="job-table-helper-text">
                      {rowData.job.vessel !== null
                        ? rowData.job.vessel.vesselIMOID
                        : ""}
                    </i>
                  </div>
                </div>
              ),
              customSort: (a, b) =>
                a.job.vessel.vesselName.localeCompare(b.job.vessel.vesselName)
            },
            /* vessel loading location */
            {
              title: "Vessel Loading Location",
              field: "vesselLoadingLocation",
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "20vw" }}
                >
                  <div style={{ width: "100%" }}>
                    <LinesEllipsis
                      style={{ width: "100%" }}
                      text={
                        rowData.job.vesselLoadingLocationObj !== undefined
                          ? rowData.job.vesselLoadingLocationObj !== null
                            ? rowData.job.vesselLoadingLocationObj.name
                            : "-"
                          : "-"
                      }
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className={"job-table-text"}
                    />
                  </div>
                </div>
              )
            },
            /* delivery item* = jobItems */
            {
              title: "Delivery Items",
              field: "deliveryitems",
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "15vw" }}
                >
                  <div className="" style={{ width: "100%" }}>
                    {rowData.job.jobItems.map((items, index) => {
                      return (
                        <LinesEllipsis
                          style={{ width: "100%" }}
                          text={
                            index === rowData.job.jobItems.length - 1
                              ? items.quantity + " " + items.uom
                              : items.quantity + " " + items.uom + ", "
                          }
                          maxLine="1"
                          ellipsis="..."
                          trimRight
                          basedOn="letters"
                          className={"job-table-text"}
                        />
                      );
                    })}
                  </div>
                </div>
              )
            },
            /* offland item* = OfflandItems */
            {
              title: "Offland Items",
              field: "jobOfflandItems",
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "15vw" }}
                >
                  <div className="" style={{ width: "100%" }}>
                    {rowData.job.jobOfflandItems.map((items, index) => {
                      return (
                        <LinesEllipsis
                          style={{ width: "100%" }}
                          text={
                            index === rowData.job.jobOfflandItems.length - 1
                              ? items.quantity + " " + items.uom
                              : items.quantity + " " + items.uom + ", "
                          }
                          maxLine="1"
                          ellipsis="..."
                          trimRight
                          basedOn="letters"
                          className={"job-table-text"}
                        />
                      );
                    })}
                  </div>
                </div>
              )
            },
            /* billing* = payment tracker */
            {
              title: "Billing",
              field: "billing",
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "20vw" }}
                >
                  <div style={{ width: "100%" }}>
                    <LinesEllipsis
                      style={{ width: "100%" }}
                      text={
                        rowData.job.paymentTrackers.length === 3
                          ? rowData.job.paymentTrackers[2].label
                          : rowData.job.paymentTrackers.length === 2
                          ? rowData.job.paymentTrackers[1].label
                          : rowData.job.paymentTrackers.length === 1
                          ? rowData.job.paymentTrackers[0].label
                          : "-"
                      }
                      maxLine="1"
                      ala
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className={"job-table-text"}
                    />
                    <i className="job-table-helper-text">$XX</i>
                  </div>
                </div>
              )
            },
            /* status */
            {
              title: "Status",
              field: "status",
              disableClick: true,
              sorting: false,
              filtering: false,
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "20vw" }}
                >
                  <div style={{ width: "100%" }}>
                    <LinesEllipsis
                      style={{ width: "100%" }}
                      text={
                        rowData.job.isCancelled === "Confirmed"
                          ? "Job has been cancelled"
                          : rowData.status[0].title
                      }
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className={
                        rowData.job.isCancelled === "Confirmed"
                          ? "job-table-text red"
                          : "job-table-text"
                      }
                    />
                    <i className="job-table-helper-text">
                      {moment(rowData.status[0].timestamp).format(
                        "MMM DD YYYY, HH:mm"
                      )}
                    </i>
                  </div>
                  {rowData.job.jobTrackers.filter(o => {
                    return o.index === 6;
                  }).length > 0 && this.props.allowArchive ? (
                    <Button
                      variant="outlined"
                      onClick={event => {
                        rowData.job.isArchived = true;
                        this.props.saveJobArchive(rowData.job);
                      }}
                      key={rowData.tableData.id}
                      className="table-share-button"
                    >
                      <div className="d-flex align-items-center">
                        Archive
                        <ArchiveIcon />
                      </div>
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={event => {
                        this.props.toggleSharingModal(true);
                        this.props.jobClicked(rowData.job);
                      }}
                      key={rowData.tableData.id}
                      className="table-share-button"
                    >
                      <div className="d-flex align-items-center">
                        Share
                        <ShareIcon />
                      </div>
                    </Button>
                  )}
                </div>
              )
            },
            /* document* = check job file */
            {
              title: "Document",
              field: "document",
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "10vw" }}
                >
                  <div style={{ width: "100%" }}>
                    <LinesEllipsis
                      style={{ width: "100%" }}
                      text="-"
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className={"job-table-text"}
                    />
                  </div>
                </div>
              )
            },
            /* 3pl* */
            {
              title: "3PL",
              field: "3pl",
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "10vw" }}
                >
                  <div style={{ width: "100%" }}>
                    <LinesEllipsis
                      style={{ width: "100%" }}
                      text="-"
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className={"job-table-text"}
                    />
                  </div>
                </div>
              )
            }
          ]}
          data={this.props.data}
          components={{
            Container: props => <Paper {...props} elevation={0} />,
            Row: props => <MTableBodyRow {...props} className="rows" />
          }}
          options={{
            sorting: true,
            paging: false,
            padding: "dense",
            showTitle: false,
            headerStyle: {
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#707070"
            }
          }}
          onRowClick={this.props.handleRowClick}
        />
      );
    } else {
      return (
        <MaterialTable
          columns={[
            {
              title: "Vessel Loading Time",
              field: "job",
              render: rowData => {
                switch (rowData.job.vesselLoadingLocation) {
                  case "PSA":
                    return (
                      <span className="job-table-text">
                        {moment(rowData.job.psaBerthingDateTime).format(
                          "DD MMMM YYYY, HH:mm"
                        )}
                      </span>
                    );
                  case "Jurong Port":
                    return (
                      <span className="job-table-text">
                        {moment(rowData.job.vesselLoadingDateTime).format(
                          "DD MMMM YYYY, HH:mm"
                        )}
                      </span>
                    );
                  default:
                    return (
                      <span className="job-table-text">
                        {moment(rowData.job.vesselLoadingDateTime).format(
                          "DD MMMM YYYY, HH:mm"
                        )}
                      </span>
                    );
                }
              },
              customSort: (a, b) => {
                let timeA, timeB;
                if (a.job.vesselLoadingLocation === "PSA") {
                  timeA = moment(a.job.psaBerthingDateTime);
                } else {
                  timeA = moment(a.job.vesselLoadingDateTime);
                }
                if (b.job.vesselLoadingLocation === "PSA") {
                  timeB = moment(b.job.psaBerthingDateTime);
                } else {
                  timeB = moment(b.job.vesselLoadingDateTime);
                }
                if (timeA.isBefore(timeB)) {
                  return 1;
                } else {
                  return -1;
                }
              }
            },
            {
              title: "Job Number",
              field: "name",
              render: rowData => (
                <span className="job-table-text">{rowData.name}</span>
              )
            },
            {
              title: "Vessel Name",
              field: "vesselName",
              render: rowData => (
                <div className="d-flex flex-column">
                  <span className="job-table-text">
                    {rowData.job.vessel !== null
                      ? rowData.job.vessel.vesselName.toUpperCase()
                      : ""}
                  </span>
                  <span className="job-table-helper-text">
                    <i>
                      {rowData.job.vessel !== null
                        ? rowData.job.vessel.vesselIMOID
                        : ""}
                    </i>
                  </span>
                </div>
              ),
              customSort: (a, b) =>
                a.job.vessel.vesselName.localeCompare(b.job.vessel.vesselName)
            },
            {
              title: "Status",
              field: "status",
              disableClick: true,
              sorting: false,
              filtering: false,
              render: rowData => (
                <div
                  className="d-flex align-items-center"
                  style={{ width: "20vw" }}
                >
                  <div style={{ width: "100%" }}>
                    <LinesEllipsis
                      style={{ width: "100%" }}
                      text={
                        rowData.job.isCancelled === "Confirmed"
                          ? "Job has been cancelled"
                          : rowData.status[0].title
                      }
                      maxLine="1"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                      className={
                        rowData.job.isCancelled === "Confirmed"
                          ? "job-table-text red"
                          : "job-table-text"
                      }
                    />
                    <i className="job-table-helper-text">
                      {moment(rowData.status[0].timestamp).format(
                        "MMM DD YYYY, HH:mm"
                      )}
                    </i>
                  </div>
                  {rowData.job.jobTrackers.filter(o => {
                    return o.index === 6;
                  }).length > 0 && this.props.allowArchive ? (
                    <Button
                      variant="outlined"
                      onClick={event => {
                        rowData.job.isArchived = true;
                        this.props.saveJobArchive(rowData.job);
                      }}
                      key={rowData.tableData.id}
                      className="table-share-button"
                    >
                      <div className="d-flex align-items-center">
                        Archive
                        <ArchiveIcon />
                      </div>
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      onClick={event => {
                        this.props.toggleSharingModal(true);
                        this.props.jobClicked(rowData.job);
                      }}
                      key={rowData.tableData.id}
                      className="table-share-button"
                    >
                      <div className="d-flex align-items-center">
                        Share
                        <ShareIcon />
                      </div>
                    </Button>
                  )}
                </div>
              )
            }
          ]}
          data={this.props.data}
          components={{
            Container: props => <Paper {...props} elevation={0} />,
            Row: props => <MTableBodyRow {...props} className="rows" />
          }}
          options={{
            sorting: true,
            paging: false,
            padding: "dense",
            showTitle: false,
            headerStyle: {
              fontFamily: "Roboto",
              fontSize: "14px",
              fontWeight: "bold",
              color: "#707070"
            }
          }}
          onRowClick={this.props.handleRowClick}
        />
      );
    }
  }
}
