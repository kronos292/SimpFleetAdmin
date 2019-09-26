import React from "react";
import MaterialTable from "material-table";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import DeleteIcon from "@material-ui/icons/Delete";

import "./JobFileSummaryTableMobile.css";
import JobFileSummaryTableMobileSlider from "./JobFileSummaryTableMobileSlider";

function createData(job, name, copies, requirement, remarks) {
  return { job, name, copies, requirement, remarks };
}

function retrieveRequirement(jobFile, key) {
  const { requirements } = jobFile;
  for (let i = 0; i < requirements.length; i++) {
    const requirement = requirements[i];
    if (requirement.key === key) {
      return requirement;
    }
  }

  const fullRequirements = this.loadRequirements();
  for (let i = 0; i < fullRequirements.length; i++) {
    const requirement = fullRequirements[i];
    if (requirement.key === key) {
      const jobFileRequirements = jobFile.requirements;
      jobFileRequirements.push(requirement);
      jobFile.requirements = jobFileRequirements;
      this.jobFileChange(jobFile);
      return requirement;
    }
  }
}

class JobFileSummaryTableMobile extends React.Component {
  state = {
    data: [],
    showSlider: false,
    jobFileSelected: null
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.refresh === true) {
      this.setState({ data: [] });
      const rows = this.props.jobFiles.reduce((a, jobFile) => {
        let needPrintCopy = retrieveRequirement(jobFile, "needPrintCopy").check;
        let signAndReturn = retrieveRequirement(jobFile, "signAndReturn").check;
        let req = "No Requirement";
        if (needPrintCopy && !signAndReturn) {
          req = "Need Print Copy";
        }
        if (signAndReturn && !needPrintCopy) {
          req = "Sign and Return";
        }
        if (signAndReturn && needPrintCopy) {
          req = "Need Print Copy & Sign and Return";
        }
        a.push(
          createData(
            jobFile,
            jobFile.filename,
            jobFile.numCopies,
            req,
            jobFile.remarks
          )
        );
        return a;
      }, []);
      this.setState({ data: rows });
    }
  }

  componentDidMount() {
    const rows = this.props.jobFiles.reduce((a, jobFile) => {
      let needPrintCopy = retrieveRequirement(jobFile, "needPrintCopy").check;
      let signAndReturn = retrieveRequirement(jobFile, "signAndReturn").check;
      let req = "No Requirement";
      if (needPrintCopy && !signAndReturn) {
        req = "Need Print Copy";
      }
      if (signAndReturn && !needPrintCopy) {
        req = "Sign and Return";
      }
      if (signAndReturn && needPrintCopy) {
        req = "Need Print Copy & Sign and Return";
      }
      a.push(
        createData(
          jobFile,
          jobFile.filename,
          jobFile.numCopies,
          req,
          jobFile.remarks
        )
      );
      return a;
    }, []);
    this.setState({ data: rows });
  }

  handleRowClick = (e, rd) => {
    if (rd.jobFile.fileURL && rd.jobFile.fileURL !== "") {
      window.open(rd.job.fileURL);
    }
  };

  handleSlider = jobFile => {
    this.setState({ showSlider: true, jobFileSelected: jobFile });
  };

  handleSliderClose = () => {
    this.setState({ showSlider: false });
  };

  render() {
    return (
      <div>
        <MaterialTable
          columns={[
            {
              title: "Name",
              field: "name",
              render: rowData => (
                <span className="job-table-text">{rowData.name}</span>
              ),
              cellStyle: {
                paddingRight: "16px"
              }
            },
            {
              title: "",
              field: "name",
              disableClick: true,
              sorting: false,
              render: rowData => (
                <IconButton
                  onClick={e => {
                    this.handleSlider(rowData.job);
                  }}
                >
                  <MoreIcon />
                </IconButton>
              ),
              cellStyle: {
                paddingRight: "16px"
              }
            }
          ]}
          data={this.state.data}
          components={{
            Container: props => (
              <Paper
                {...props}
                elevation={0}
                style={{ marginTop: "20px", minHeight: "60vh" }}
              />
            )
          }}
          options={{
            sorting: true,
            selection: true,
            headerStyle: {
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#707070"
            },
            rowStyle: {
              fontFamily: "Roboto",
              fontSize: "14px",
              color: "#707070",
              height: "69px"
            },
            toolbarButtonAlignment: "left",
            showTextRowsSelected: false,
            showTitle: false,
            paging: false
          }}
          onRowClick={this.handleRowClick}
          actions={[
            {
              tooltip: "Delete Selected Items",
              icon: DeleteIcon,
              onClick: (evt, data) => this.props.deleteMultipleFiles(data)
            }
          ]}
        />
        <JobFileSummaryTableMobileSlider
          jobFile={this.state.jobFileSelected}
          open={this.state.showSlider}
          onClose={this.handleSliderClose}
          editFile={this.props.editFile}
          deleteFile={this.props.deleteFile}
        />
      </div>
    );
  }
}

export default JobFileSummaryTableMobile;
