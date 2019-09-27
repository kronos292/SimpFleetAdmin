import React, { Component } from "react";

import FileDropzone from "./FileDropzone";
import { FaFileDownload } from "react-icons/fa";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/core/SvgIcon/SvgIcon";

class FileUpload extends Component {
  state = {
    uploading: false,
    hover: false
  };

  handleOnMouseEnter = () => {
    this.setState({ hover: true });
  };

  handleOnMouseOut = () => {
    this.setState({ hover: false });
  };

  renderUploadDisplay = () => {
    return (
      <div
        className="job-file-upload-files-upload-section"
        style={{ marginBottom: 10 }}
      >
        <div className="job-file-upload-files-content">
          {this.props.file === null ? (
            <FileDropzone
              onFilesAdded={this.props.onFilesAdded}
              disabled={false}
            />
          ) : (
            <div
              onMouseEnter={this.handleOnMouseEnter}
              onMouseLeave={this.handleOnMouseOut}
              style={{ width: "20%" }}
            >
              <div
                className="d-flex flex-column align-items-center file-icon-background justify-content-center"
                style={{ height: "140px", padding: 8 }}
              >
                <FaFileDownload className="job-details-file-icon" />
                <p className="text-center">{this.props.file.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  render() {
    return <div>{this.renderUploadDisplay()}</div>;
  }
}

export default FileUpload;
