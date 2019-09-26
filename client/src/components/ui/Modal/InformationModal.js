import React, { Component } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

class InformationModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.modal}
        toggle={this.props.toggle}
        onClosed={this.props.onClosed}
      >
        <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
        <ModalBody>{this.props.children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.onClosed}>
            Ok
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default InformationModal;
