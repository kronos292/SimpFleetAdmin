import "./CreateJobModal.css";
import React, { Component } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CreateJob from "./CreateJob";

export default class CreateJobModal extends Component {
  render() {
    return (
      <div className="job-create-modal">
        <Dialog
          open={this.props.isOpen}
          onClose={this.props.handleCloseModal}
          maxWidth="sm"
          fullWidth={true}
          fullScreen={this.props.fullScreen}
        >
          <DialogTitle id="alert-dialog-title" className="job-share-modal-top">
            <div className="d-flex align-items-center">
              <p className="job-share-modal-title">Job Booking</p>
              <IconButton
                aria-label="Close"
                className="job-share-modal-close ml-auto"
                onClick={this.props.handleCloseModal}
              >
                <CloseIcon />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent className="job-create-modal-content">
            <CreateJob
              handleCloseModal={this.props.handleCloseModal}
              handlePopoverOpen={this.props.handlePopoverOpen}
              handleCloseMenu={this.props.handleCloseMenu}
              mobile={this.props.fullScreen}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
