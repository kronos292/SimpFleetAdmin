import React, {Component} from 'react';
import axios from 'axios';

import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import FileUpload from "./FileUpload";
import FileDisplay from "./FileDisplay";

import './FileUploadSection.css';
import Col from "react-bootstrap/Col";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {FormText} from "reactstrap";

class FileUploadSection extends Component {

    state = {
        requirements: {needPrintCopy: 'yes', signAndReturn: 'yes'},
        remarks: '',
        filename: '',
        numCopies: 1,
        documentType: 'Choose from Computer',
        file: null,
    };

    componentDidMount() {
        const jobFile = this.props.jobFile;
        const req = this.state.requirements;
        if (this.retrieveRequirement(this.props.jobFile, 'needPrintCopy').check) {
            req.needPrintCopy = "yes";
        } else {
            req.needPrintCopy = "no";
        }
        if (this.retrieveRequirement(this.props.jobFile, 'signAndReturn').check) {
            req.signAndReturn = "yes";
        } else {
            req.signAndReturn = "no";
        }
        this.setState({
            remarks: jobFile.remarks,
            filename: jobFile.filename,
            numCopies: jobFile.numCopies,
            requirements: req,
        });

    }

    retrieveRequirement = (jobFile, key) => {
        const {requirements} = jobFile;
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
                return requirement;
            }
        }
    };

    updateRequirement = (jobFile, key, boolean) => {
        const newRequirements = [];
        for (let i = 0; i < jobFile.requirements.length; i++) {
            const requirement = jobFile.requirements[i];
            if (requirement.key === key) {
                requirement.check = boolean;
            }
            newRequirements.push(requirement);
        }
        jobFile.requirements = newRequirements;
    };

    handlePrintCopyChange = (e) => {
        this.setState({
            requirements: {
                needPrintCopy: e.target.value,
                signAndReturn: this.state.requirements.signAndReturn
            }
        });
    };

    handleSignAndReturnChange = (e) => {
        this.setState({
            requirements: {
                needPrintCopy: this.state.requirements.needPrintCopy,
                signAndReturn: e.target.value
            }
        });
    };

    handleDocumentTitleChange = (e, jobFile) => {
        jobFile.filename = e.target.value;
        this.setState({filename: e.target.value});
    };

    handleUploadType = (e) => {
        this.setState({documentType: e.target.value});
    };

    handleNumberOfCopiesChange = (e) => {
        this.setState({numCopies: e.target.value});
    };

    handleRemarksChange = (e) => {
        this.setState({remarks: e.target.value});
    };

    handleAddDocument = () => {
        if(this.state.requirements.needPrintCopy === 'yes'){
            const jobFile = this.props.jobFile;
            jobFile.filename = this.state.filename;

            if (this.state.requirements.needPrintCopy === 'yes') {
                this.updateRequirement(jobFile, "needPrintCopy", true);
            } else {
                this.updateRequirement(jobFile, "needPrintCopy", false);
            }

            if (this.state.requirements.signAndReturn === 'yes') {
                this.updateRequirement(jobFile, "signAndReturn", true);
            } else {
                this.updateRequirement(jobFile, "signAndReturn", false);
            }

            if (this.state.remarks === '') {
                jobFile.remarks = 'NIL'
            } else {
                jobFile.remarks = this.state.remarks
            }

            jobFile.numCopies = this.state.numCopies;

            const formData = new FormData();
            formData.append("file", this.state.file);
            formData.append("jobFile", JSON.stringify(jobFile));
            formData.append("jobID", this.props.job._id);
            axios.post('/api/job_files/upload_document', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                window.location.reload();
            });
        } else{

            if (this.state.filename === '') {
                alert("Document name cannot be empty");
                return;
            }

            const jobFile = this.props.jobFile;
            jobFile.filename = this.state.filename;

            if (this.state.requirements.needPrintCopy === 'yes') {
                this.updateRequirement(jobFile, "needPrintCopy", true);
            } else {
                this.updateRequirement(jobFile, "needPrintCopy", false);
            }

            if (this.state.requirements.signAndReturn === 'yes') {
                this.updateRequirement(jobFile, "signAndReturn", true);
            } else {
                this.updateRequirement(jobFile, "signAndReturn", false);
            }

            if (this.state.remarks === '') {
                jobFile.remarks = 'NIL'
            } else {
                jobFile.remarks = this.state.remarks
            }

            jobFile.numCopies = this.state.numCopies;

            axios.post('/api/job_files/',{
                ...jobFile,
                jobID:this.props.job._id,
            }).catch((err) => {
                console.log(err);
            }).finally(() => {
                window.location.reload();
            });

        }
    };

    handleEditDocument = () => {
        if (this.state.filename === '') {
            alert("File name cannot be empty");
            return;
        }

        const jobFile = this.props.jobFile;
        jobFile.filename = this.state.filename;

        if (this.state.requirements.needPrintCopy === 'yes') {
            this.updateRequirement(jobFile, "needPrintCopy", true);
        } else {
            this.updateRequirement(jobFile, "needPrintCopy", false);
        }

        if (this.state.requirements.signAndReturn === 'yes') {
            this.updateRequirement(jobFile, "signAndReturn", true);
        } else {
            this.updateRequirement(jobFile, "signAndReturn", false);
        }

        if (this.state.remarks === '') {
            jobFile.remarks = 'NIL'
        } else {
            jobFile.remarks = this.state.remarks
        }

        jobFile.numCopies = this.state.numCopies;

        this.props.successClose();
    };

    renderUpload() {
        if (this.props.jobFile.fileURL !== "") {
            return (
                <FileDisplay jobFile={this.props.jobFile} handleSingleDelete={this.props.handleSingleDelete}
                             handleDocumentTitleChange={this.handleDocumentTitleChange}/>
            );
        } else {
            switch (this.state.documentType) {
                case "Choose from Computer":
                    return (<FileUpload
                        job={this.props.job}
                        onFilesAdded={(files) => {
                            this.setState({file: files[0]});
                        }}
                        file={this.state.file}
                    />);
                default:
                    return '';
            }
        }
    }

    render() {
        return (
            <Form>
                <FormControl>
                    <FormLabel className='job-file-upload-label'>Do you want us to print copy/copies and bring it to the
                        vessel?</FormLabel>
                    <RadioGroup
                        value={this.state.requirements.needPrintCopy}
                        onChange={this.handlePrintCopyChange}
                        row
                    >
                        <FormControlLabel value="yes" control={<Radio color="default" icon={<RadioButtonUncheckedIcon
                            fontSize="small"/>} checkedIcon={<RadioButtonCheckedIcon fontSize="small"
                                                                                     className='green-radio'/>}/>}
                                          label="Yes"/>
                        <FormControlLabel value="no" control={<Radio color="default"
                                                                     icon={<RadioButtonUncheckedIcon fontSize="small"/>}
                                                                     checkedIcon={<RadioButtonCheckedIcon
                                                                         fontSize="small" className='green-radio'/>}/>}
                                          label="No"/>
                    </RadioGroup>
                </FormControl>
                <br/>
                <FormControl>
                    <FormLabel className='job-file-upload-label'>Do you need the document to be signed and
                        return?</FormLabel>
                    <RadioGroup
                        value={this.state.requirements.signAndReturn}
                        onChange={this.handleSignAndReturnChange}
                        row
                    >
                        <FormControlLabel value="yes" control={<Radio color="default" icon={<RadioButtonUncheckedIcon
                            fontSize="small"/>} checkedIcon={<RadioButtonCheckedIcon fontSize="small"
                                                                                     className='green-radio'/>}/>}
                                          label="Yes"/>
                        <FormControlLabel value="no" control={<Radio color="default"
                                                                     icon={<RadioButtonUncheckedIcon fontSize="small"/>}
                                                                     checkedIcon={<RadioButtonCheckedIcon
                                                                         fontSize="small" className='green-radio'/>}/>}
                                          label="No"/>
                    </RadioGroup>
                </FormControl>

                {this.state.requirements.needPrintCopy === 'yes' ?
                    <div>

                        <Form.Group className='d-flex flex-column'>
                            <div className='d-flex align-items-center'>
                            <Form.Label className='job-file-upload-label'>Attachment</Form.Label>
                            <Form.Control as="select" onChange={this.handleUploadType}
                                          className='job-file-upload-attach-input'>
                                <option>Choose from Computer</option>
                                {/*<option>Google Drive</option>*/}
                                {/*<option>DropBox</option>*/}
                            </Form.Control>
                            </div>
                            <Form.Label className='job-detail-section-label-helper-text' style={{marginTop: 5}}>*Please ensure the documents uploaded are clear</Form.Label>
                        </Form.Group>

                        {this.renderUpload()}

                    </div> :
                    <Col xs={12} sm={6} className='col-no-padding'>
                        <Form.Group className='d-flex flex-column'>
                            <Form.Label className='job-file-upload-label' style={{marginBottom:0}}>Document Name</Form.Label>
                            <Form.Label className='job-detail-section-label-helper-text' style={{marginTop: 5}}>*Please ensure the documents printed are clear</Form.Label>
                            <Form.Control as="input" placeholder='Enter Document Name'
                                          type='text'
                                          onChange={(e)=>this.handleDocumentTitleChange(e, this.props.jobFile)} value={this.state.filename}
                                          className='job-file-upload-remarks-input'>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                }

                <Form.Group>
                    <Form.Label className='job-file-upload-label'>Number of Copies</Form.Label>
                    <Col xs={4} sm={2} className='col-no-padding'>
                        <Form.Control as="input" type='number' min="0" onChange={this.handleNumberOfCopiesChange}
                                      value={this.state.numCopies}
                                      className='job-file-upload-numcopies-input'>
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Col xs={12} sm={6} className='col-no-padding'>
                    <Form.Group>
                        <Form.Label className='job-file-upload-label'>Remarks (Optional)</Form.Label>
                        <Form.Control as="textarea" rows="4" placeholder='Write any additional instructions '
                                      type='text'
                                      onChange={this.handleRemarksChange} value={this.state.remarks}
                                      className='job-file-upload-remarks-input'>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <div className='d-flex align-items-center justify-content-center' style={{marginTop: '20px'}}>
                    <Button variant='outline-success' className='job-file-upload-cancel-btn'
                            onClick={(e) => this.props.handleCancel(this.props.type)}>Cancel</Button>
                    {this.props.type === 'upload' ?
                        <Button variant='success' className='job-file-upload-submit-btn'
                                onClick={this.handleAddDocument}>Submit</Button>
                        : <Button variant='success' className='job-file-upload-submit-btn'
                                  onClick={this.handleEditDocument}>Update</Button>}
                </div>
            </Form>
        );
    }

}

const mapStateToProps = ({auth}) => {
    return {auth};
};

export default withRouter(connect(mapStateToProps)(FileUploadSection));
