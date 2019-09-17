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
                  {rowData.job.vessel.vesselName.toUpperCase()}
                </span>
                <span className="job-table-helper-text">
                  <i>{rowData.job.vessel.vesselIMOID}</i>
                </span>
              </div>
            ),
            customSort: (a, b) =>
              a.job.vessel.vesselName.localeCompare(b.job.vessel.vesselName)
          },
          // {
          //     title: "Price", field: "price",
          //     render: rowData => (
          //         <span className='job-table-text'>$ {rowData.price}</span>),
          //     customSort: (a, b) => a.price - b.price,
          // },
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
