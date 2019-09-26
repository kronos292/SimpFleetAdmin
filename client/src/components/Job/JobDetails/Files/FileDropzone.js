import React, { Component } from "react";

class FileDropzone extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  state = {
    highlight: false
  };

  openFileDialog = () => {
    if (this.props.disabled) return;
    this.fileInputRef.current.click();
  };

  fileListToArray = list => {
    const array = [];
    for (let i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  };

  onFilesAdded = evt => {
    if (this.props.disabled) return;
    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
  };

  onDragOver = evt => {
    evt.preventDefault();

    if (this.props.disabled) return;
    this.setState({ highlight: true });
  };

  onDragLeave = () => {
    this.setState({ highlight: false });
  };

  onDrop = e => {
    e.preventDefault();

    if (this.props.disabled) return;

    const files = e.dataTransfer.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      this.props.onFilesAdded(array);
    }
    this.setState({ highlight: false });
  };

  render() {
    return (
      <div
        className={`job-file-upload-dropzone ${
          this.state.highlight ? "job-file-upload-highlight" : ""
        }`}
        onDragOver={this.onDragOver}
        onDragLeave={this.onDragLeave}
        onDrop={this.onDrop}
        onClick={this.openFileDialog}
        style={{ cursor: this.props.disabled ? "default" : "pointer" }}
      >
        <img
          alt="upload"
          className="job-file-upload-icon"
          src="./images/assets/job/baseline-cloud_upload-24px.svg"
        />
        <input
          ref={this.fileInputRef}
          className="job-file-upload-fileInput"
          type="file"
          multiple
          onChange={this.onFilesAdded}
        />
        <span style={{ color: "#686868" }}>
          <strong>
            Drop file here to attach or{" "}
            <span style={{ textDecoration: "underline" }}>browse</span>
          </strong>
        </span>
      </div>
    );
  }
}

export default FileDropzone;
