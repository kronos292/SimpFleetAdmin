import React, { Component } from "./node_modules/react";
import Dialog from "./node_modules/@material-ui/core/Dialog";
import DialogTitle from "./node_modules/@material-ui/core/DialogTitle";
import DialogContent from "./node_modules/@material-ui/core/DialogContent";
import DialogActions from "./node_modules/@material-ui/core/DialogActions";
import IconButton from "./node_modules/@material-ui/core/IconButton";
import CloseIcon from "./node_modules/@material-ui/icons/Close";
import DoneIcon from "./node_modules/@material-ui/icons/Done";

import Button from "./node_modules/react-bootstrap/Button";
import "./AffirmationModal.css";

class AffirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    };

    this.updatePredicate = this.updatePredicate.bind(this);
  }

  componentDidMount() {
    this.updatePredicate();
    window.addEventListener("resize", this.updatePredicate);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updatePredicate);
  }

  updatePredicate() {
    this.setState({ isMobile: window.innerWidth < 426 });
  }

  render() {
    return (
      <Dialog
        open={this.props.modal}
        onClose={this.props.toggle}
        maxWidth="xs"
        fullWidth={false}
        // fullScreen={this.state.isMobile}
      >
        <DialogTitle className="dialog-top">
          <div className="d-flex align-items-center">
            <p className="info-modal-title">{this.props.title}</p>
            <IconButton
              className="closeButton ml-auto"
              onClick={this.props.toggle}
            >
              <CloseIcon className="closeButton" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className="info-modal-content">
          <div className="info-modal-message text-center">
            {this.props.children}
          </div>
        </DialogContent>
        <DialogActions className="info-modal-bottom">
          <div className="d-flex align-items-center justify-content-center w-100">
            <Button
              variant="success"
              className="info-button"
              onClick={this.props.affirmativeAction}
            >
              <span>{this.props.affirmativeText}</span>
            </Button>
            <Button
              variant="outline-success"
              className="info-button info-button-cancel"
              onClick={this.props.toggle}
              style={{ marginLeft: "15px" }}
            >
              <span>{this.props.cancelText}</span>
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AffirmationModal;
