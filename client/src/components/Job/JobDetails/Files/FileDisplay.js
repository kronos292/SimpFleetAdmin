import React, { Component } from "react";
import { FaFileDownload } from "react-icons/fa";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

class FileDisplay extends Component {
  state = {
    hover: false,
    edit: false
  };

  handleOnMouseEnter = () => {
    this.setState({ hover: true });
  };

  handleOnMouseOut = () => {
    this.setState({ hover: false });
  };

  handleEdit = () => {
    this.setState({ edit: true });
  };

  onKeyDown = e => {
    if (e.keyCode === 13) {
      this.setState({ edit: false });
    }
  };

  render() {
    const { jobFile } = this.props;

    return (
      <div
        onMouseEnter={this.handleOnMouseEnter}
        onMouseLeave={this.handleOnMouseOut}
        style={{ width: "20%" }}
      >
        {!this.state.hover ? (
          <div className="d-flex flex-column align-items-center file-icon-background justify-content-center">
            <a href={jobFile.fileURL}>
              <FaFileDownload className="job-details-file-icon" />
            </a>
            {this.state.edit ? (
              <input
                onChange={e => this.props.handleDocumentTitleChange(e, jobFile)}
                onKeyDown={this.onKeyDown}
              />
            ) : (
              <p>{jobFile.filename}</p>
            )}
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center file-icon-background">
            <a href={jobFile.fileURL}>
              <FaFileDownload className="job-details-file-icon" />
            </a>
            {this.state.edit ? (
              <input
                onChange={e => this.props.handleDocumentTitleChange(e, jobFile)}
                onKeyDown={this.onKeyDown}
              />
            ) : (
              <p>{jobFile.filename}</p>
            )}
            <ButtonGroup>
              <Button onClick={this.handleEdit} style={{ border: "none" }}>
                <EditIcon />
              </Button>
              <Button
                onClick={() => this.props.handleSingleDelete(jobFile)}
                style={{ border: "none" }}
              >
                <CloseIcon />
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
    );
  }
}

export default FileDisplay;
