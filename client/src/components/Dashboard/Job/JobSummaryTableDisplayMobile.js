import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import ShareIcon from "@material-ui/icons/Share";
import ArchiveIcon from "@material-ui/icons/Archive";
import moment from "moment";

class JobSummaryTableDisplayMobile extends Component {
  constructor() {
    super();
    this.state = {
      selectedShareIconIndex: 0
    };
  }
  render() {
    return (
      <MaterialTable
        columns={[
          {
            title: "ETA",
            field: "eta",
            render: rowData => (
              <span className="job-table-text">
                {moment(rowData.eta).format("DD MMMM YYYY, HH:mm")}
              </span>
            )
          },
          {
            title: "Job Number",
            field: "name",
            render: rowData => (
              <span className="job-table-text">{rowData.name}</span>
            )
          },
          {
            title: "Status",
            field: "status",
            disableClick: true,
            sorting: false,
            filtering: false,
            render: rowData => (
              <div>
                {this.props.button ? (
                  <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-center flex-column">
                      <span className="job-table-text">
                        {rowData.status[0].title}
                      </span>
                      <i className="job-table-helper-text">
                        {moment(rowData.status[0].timestamp).format(
                          "MMM DD YYYY, HH:mm"
                        )}
                      </i>
                    </div>
                    {rowData.job.jobTrackers.filter(o => {
                      return o.index === 6;
                    }).length > 0 && this.props.allowArchive ? (
                      <ArchiveIcon
                        onClick={event => {
                          rowData.job.isArchived = true;
                          this.props.saveJobArchive(rowData.job);
                        }}
                        key={rowData.tableData.id}
                        className="job-summary-icon-buttons"
                      />
                    ) : (
                      <ShareIcon
                        onClick={event => {
                          this.props.toggleSharingModal(true);
                          this.props.jobClicked(rowData.job);
                        }}
                        key={rowData.tableData.id}
                        className="job-summary-icon-buttons"
                      />
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="d-flex justify-content-center flex-column">
                      <span className="job-table-text">
                        {rowData.status[0].title}
                      </span>
                      <i className="job-table-helper-text">
                        {moment(rowData.status[0].timestamp).format(
                          "MMM DD YYYY, HH:mm"
                        )}
                      </i>
                    </div>
                  </div>
                )}
              </div>
            )
          }
        ]}
        data={this.props.data}
        components={{
          Container: props => <Paper {...props} elevation={0} />
        }}
        title={this.props.title}
        options={{
          sorting: true,
          paging: false,
          padding: "dense",
          // showTitle: false,
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
export default JobSummaryTableDisplayMobile;
