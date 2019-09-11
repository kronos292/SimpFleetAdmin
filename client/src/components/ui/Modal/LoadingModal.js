import React, {Component} from 'react';
import {Modal, ModalBody, ModalHeader} from "reactstrap";

import Spinner from "../Widget/Spinner/Spinner";

class LoadingModal extends Component {
    render() {
        return(
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} onClosed={this.props.onClosed}>
                <ModalHeader toggle={this.props.toggle}>{this.props.title}</ModalHeader>
                <ModalBody>
                    <Spinner/>
                </ModalBody>
            </Modal>
        );
    }
}

export default LoadingModal;