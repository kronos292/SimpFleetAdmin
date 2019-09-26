import React, { Component } from "react";
import axios from "axios";

import InputGroup from "react-bootstrap/InputGroup";
import ButtonB from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { Drawer } from "@material-ui/core";

import "./JobShareSlide.css";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import TagsInput from "react-tagsinput";

class JobShareSlide extends Component {
  state = {
    copied: false,
    emailList: [],
    message: "",
    emailInputs: "",
    mobileWebShare: false,
    showSuccessSnackBar: false
  };

  componentDidMount() {
    // Set whether mobile web share is possible
    this.setState({
      mobileWebShare: navigator.share !== undefined && navigator.share
    });
  }

  handleMessageChange = e => {
    this.setState({ message: e.target.value });
  };

  updateEmailList = emailList => {
    this.setState({ emailList });
  };

  handleEmailInputChange = value => {
    this.setState({ emailInputs: value });
  };

  handleInputClear = () => {
    this.setState({ emailInputs: "" });
  };

  webShareJobLink = () => {
    if (this.state.mobileWebShare) {
      navigator
        .share({
          title: `Job Invitation - ${this.props.job.jobId}`,
          text: `Click this link to join my delivery job to ${this.props.job.vessel.vesselName}`,
          url: this.props.joblinkurl
        })
        .then(() => console.log("Successful share"))
        .catch(error => console.log("Error sharing", error));
    }
  };

  sendEmail = () => {
    const emailInputs = this.state.emailInputs;
    const emailList = emailInputs.split(";");

    for (let i = 0; i < emailList.length; i++) {
      const email = emailList[i];

      if (email.trim() !== "") {
        axios
          .post("/api/job_links/share", {
            email,
            job: this.props.job
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  };

  render() {
    let renderContent;
    if (this.props.inputSelected) {
      renderContent = (
        <div className="job-share-modal-copy">
          <h6 className="job-share-modal-copy-title">Message</h6>
          <FormControl
            placeholder="Add a note (Optional)"
            value={this.state.message}
            as="textarea"
            rows="6"
            onChange={this.handleMessageChange}
            className="job-share-modal-message"
          />
          <Button
            onClick={e => {
              this.props.onClose();
              this.sendEmail();
            }}
            variant="contained"
            size="large"
            className="job-share-modal-button"
            fullWidth
          >
            Send
          </Button>
        </div>
      );
    } else {
      renderContent = (
        <div className="job-share-modal-copy">
          <h6 className="job-share-modal-copy-title">
            Do you know anyone sending items to{" "}
            {this.props.job.vessel.vesselName.toUpperCase()},{" "}
            {this.props.job.vessel.vesselIMOID}?
          </h6>
          <InputGroup className="job-share-modal-url">
            <FormControl
              onChange={() => {}}
              value={this.props.joblinkurl}
              disabled={true}
              className="job-share-modal-url-link"
            />
            <InputGroup.Append>
              <CopyToClipboard
                text={this.props.joblinkurl}
                onCopy={this.props.copied}
              >
                {this.state.mobileWebShare ? (
                  <ButtonB
                    variant="outline-secondary"
                    className="job-share-modal-url-link"
                    onClick={this.webShareJobLink}
                  >
                    Share
                  </ButtonB>
                ) : (
                  <ButtonB
                    variant="outline-secondary"
                    className="job-share-modal-url-link"
                  >
                    Copy Link
                  </ButtonB>
                )}
              </CopyToClipboard>
            </InputGroup.Append>
          </InputGroup>
        </div>
      );
    }

    return (
      <Drawer
        anchor="bottom"
        open={this.props.open}
        onClose={this.props.onClose}
        PaperProps={{
          className: clsx(
            "MuiPaper-root MuiPaper-elevation16 MuiDrawer-paper MuiDrawer-paperAnchorBottom drawer-job-share",
            this.props.inputSelected && "full-height-drawer"
          )
        }}
      >
        <h3 onClick={this.props.onClose} className="job-slide-cancel">
          Cancel
        </h3>
        <Divider className="job-share-drawer-divider" />
        <Paper elevation={0} className="job-share-drawer-paper">
          <div className="job-share-modal-email">
            <h6 className="job-share-modal-copy-title">Send to</h6>
            <InputGroup>
              <div style={{ width: "100%" }} onClick={this.props.handleSelect}>
                <TagsInput
                  value={this.state.emailList}
                  onChange={this.updateEmailList}
                  className="form-control job-share-email-inputbox"
                  onChangeInput={this.handleEmailInputChange}
                  inputValue={this.state.emailInputs}
                  inputProps={{
                    className: "react-tagsinput-input job-share-email-input",
                    placeholder: "Please Enter Email Address"
                  }}
                  tagProps={{
                    className: "react-tagsinput-tag job-share-email-tag",
                    classNameRemove: "react-tagsinput-remove"
                  }}
                  validate={this.validate}
                  addKeys={[9, 13, 186]}
                />
                <p
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "10px",
                    color: "#707070",
                    marginBottom: "8px"
                  }}
                >
                  for multiple recipients, please use semicolon to separate
                </p>
              </div>
            </InputGroup>
          </div>
          {renderContent}
        </Paper>
      </Drawer>
    );
  }
}

export default JobShareSlide;
