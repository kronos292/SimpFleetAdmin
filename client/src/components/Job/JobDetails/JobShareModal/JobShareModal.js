import React, {Component} from 'react';
import axios from 'axios';

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import InputGroup from 'react-bootstrap/InputGroup'
import ButtonB from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import {CopyToClipboard} from 'react-copy-to-clipboard';

import TagsInput from 'react-tagsinput';
import LinesEllipsis from 'react-lines-ellipsis'

import 'react-tagsinput/react-tagsinput.css'

import './JobShareModal.css';

import Snackbar from "@material-ui/core/Snackbar";
import Slide from "@material-ui/core/Slide";

function defaultRenderTag(props) {
    let {tag, key, disabled, onRemove, classNameRemove, getTagDisplayValue, ...other} = props
    return (
        <div key={key} {...other}>
            <div style={{maxWidth:400, wordBreak:"break-all"}}>
                <LinesEllipsis
                    text={getTagDisplayValue(tag)}
                    maxLine='1'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />
            </div>
            {!disabled &&
            <a className={classNameRemove} onClick={(e) => onRemove(key)}/>
            }
        </div>
    )
}

class JobShareModal extends Component {
    // Props: Close=Function to handle close, joburllink=url link string, show=boolean to show modal, job=job object//
    state = {
        copied: false,
        emailList: [],
        message: '',
        emailInputs: '',
        mobileWebShare: false,
        showSuccessSnackBar: false,
    };

    componentDidMount() {
        // Set whether mobile web share is possible
        this.setState({
            mobileWebShare: navigator.share !== undefined && navigator.share
        });
    }

    handleMessageChange = (e) => {
        this.setState({message: e.target.value});
    };

    updateEmailList = (emailList) => {
        this.setState({emailList})
    };

    handleEmailInputChange = (value) => {
        this.setState({emailInputs: value});
    };

    handleInputClear = () => {
        this.setState({emailInputs: ''})
    };


    //For Mobile Sharing
    webShareJobLink = () => {
        if (this.state.mobileWebShare) {
            navigator.share({
                title: `Job Invitation - ${this.props.job.jobId}`,
                text: `Click this link to join my delivery job to ${this.props.job.vessel.vesselName}`,
                url: this.props.joblinkurl
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        }
    };

    sendEmail = () => {
        const emailList = this.state.emailList;
        if (this.state.emailInputs.includes('@')) {
            emailList.push(this.state.emailInputs)
        }

        for (let i = 0; i < emailList.length; i++) {
            const email = emailList[i];

            if (email.trim() !== "") {
                axios.post('/api/job_links/share', {
                    email,
                    job: this.props.job,
                    message: this.state.message,
                }).then(res => {
                    this.setState({showSuccessSnackBar: true, emailList: [], emailInputs: '', message: ''});
                    window.setTimeout(() => this.setState({showSuccessSnackBar: false}), 5000)
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    };

    SlideTransition = (props) => {
        return <Slide {...props} direction="up"/>
    };

    handleSnackBarClose = () => {
        this.setState({showSuccessSnackBar: false})
    };


    render() {
        return (
            <div>
                <Dialog open={this.props.show} onClose={this.props.Close} maxWidth="sm" fullWidth={true}>
                    <DialogTitle id="alert-dialog-title" className='job-share-modal-top'>
                        <div className='d-flex align-items-center'>
                            <p className='job-share-modal-title'>{this.props.job.vessel.vesselName.toUpperCase()}, {this.props.job.vessel.vesselIMOID}</p>
                            <IconButton aria-label="Close" className='job-share-modal-close ml-auto'
                                        onClick={this.props.Close}>
                                <CloseIcon/>
                            </IconButton>
                        </div>
                    </DialogTitle>
                    <DialogContent className='job-share-modal-content'>
                        <div className='job-share-modal-copy'>
                            <h6 className='job-share-modal-copy-title'>Do you know anyone sending items
                                to {this.props.job.vessel.vesselName.toUpperCase()}, {this.props.job.vessel.vesselIMOID}?</h6>
                            <InputGroup className='job-share-modal-url'>
                                <FormControl
                                    value={this.props.joblinkurl}
                                    disabled={true}
                                    className='job-share-modal-url-link'
                                />
                                <InputGroup.Append>
                                    <CopyToClipboard text={this.props.joblinkurl}
                                                     onCopy={this.props.copied}
                                    >
                                        {
                                            this.state.mobileWebShare
                                                ? <ButtonB variant="outline-secondary"
                                                           className='job-share-modal-url-link'
                                                           onClick={this.webShareJobLink}>Share</ButtonB>
                                                : <ButtonB variant="outline-secondary"
                                                           className='job-share-modal-url-link'>Copy Link</ButtonB>
                                        }
                                    </CopyToClipboard>
                                </InputGroup.Append>
                            </InputGroup>
                            <p style={{
                                fontFamily: 'Roboto',
                                fontSize: '10px',
                                color: '#707070',
                                marginTop: 5,
                            }}><i>Please ensure that the other party using the link has an account and is logged in
                                before entering the above link.</i></p>

                        </div>
                        <div className='job-share-modal-email'>
                            <h6 className='job-share-modal-copy-title'>People</h6>
                            <InputGroup>
                                <div style={{width: '100%'}}>
                                    <TagsInput value={this.state.emailList} onChange={this.updateEmailList}
                                               className='form-control job-share-email-inputbox'
                                               onChangeInput={this.handleEmailInputChange}
                                               inputValue={this.state.emailInputs}
                                               inputProps={{
                                                   className: 'react-tagsinput-input job-share-email-input',
                                                   placeholder: 'Please Enter Email Address'
                                               }}
                                               tagProps={{
                                                   className: 'react-tagsinput-tag job-share-email-tag',
                                                   classNameRemove: 'react-tagsinput-remove'
                                               }}
                                               validate={this.validate}
                                               addKeys={[9, 13, 186]}
                                               renderTag={defaultRenderTag}

                                    />
                                    <p style={{
                                        fontFamily: 'Roboto',
                                        fontSize: '10px',
                                        color: '#707070',
                                        marginBottom: '8px',
                                    }}>for multiple recipients, please use semicolon to separate</p>
                                </div>
                            </InputGroup>
                            <FormControl placeholder='Add a note (Optional)' value={this.state.message} as="textarea"
                                         rows="4" onChange={this.handleMessageChange}
                                         className='job-share-modal-message'/>
                        </div>
                    </DialogContent>
                    <DialogActions className='d-flex justify-content-center job-share-modal-bottom'>
                        <Button onClick={(e) => {
                            if (this.state.emailList.length === 0 && this.state.emailInputs === '') {
                                alert('Email Cannot be Empty!')
                            } else {
                                this.props.Close();
                                this.sendEmail();
                            }
                        }} variant="contained" size="large" className='job-share-modal-button'>
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                          open={this.state.showSuccessSnackBar}
                          message={<span id="message-id">Message has been sent!</span>}
                          action={
                              <IconButton
                                  key="close"
                                  color="inherit"
                                  onClick={this.handleSnackBarClose}
                              >
                                  <CloseIcon/>
                              </IconButton>
                          }
                          TransitionComponent={this.SlideTransition}
                />
            </div>
        );
    }

    validate = (tag) => {
        return tag.includes('@')
    }

}

export default JobShareModal;