import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

import '../JobDetails.css';

import FileUploadSection from "./FileUploadSection"
import AffirmationModal from "../../../ui/Modal/AffirmationModal";

import {Paper} from '@material-ui/core';

import JobFileSummaryTable from "./JobFileSummaryTable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare} from "@fortawesome/free-regular-svg-icons";
import MediaQuery from "react-responsive";
import JobFileSummaryTableMobile from "./JobFileSummaryTableMobile";


class JobFilesDisplay extends Component {
    state = {
        jobFiles: null,
        editJobFile: null,
        showJobFileDeleteModal: false,
        jobFileToDelete: [],
        activeScreen: 'showFiles',
        selectOption: true,
        refresh: false,
        numPages: null,
        pageNumber: 1,
    };

    componentDidMount() {
        this.getJobFiles();
    }

    getJobFiles = () => {
        axios.get(`/api/job_files?jobID=${this.props.job._id}`).then(res => {
            const jobFiles = res.data;
            const userJobFiles = jobFiles.filter(o=> o.user === this.props.auth.user.id);
            this.setState({jobFiles: userJobFiles});
        }).catch(err => {
            console.log(err);
        });
    };

    jobFileChange = (jobFile) => {
        const {jobFiles} = this.state;
        const newJobFiles = [];
        for (let i = 0; i < jobFiles.length; i++) {
            if (jobFiles[i]._id === jobFile._id) {
                newJobFiles.push(jobFile);
            } else {
                newJobFiles.push(jobFiles[i]);
            }
        }
        this.setState({jobFiles: newJobFiles});
    };

    loadRequirements = () => {
        return [
            {
                id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
                key: "signAndReturn",
                name: "Sign and Return",
                check: false
            },
            {
                id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
                key: "needPrintCopy",
                name: "Need Printed Copy",
                check: false
            }
        ];
    };

    updateJobFiles = () => {
        axios.put(`/api/job_files`, {
            jobFiles: this.state.jobFiles
        }).then(res => {
            this.setState({jobFiles: res.data});
        }).catch(err => {
            console.log(err);
        });
    };

    handleDeleteJobFiles = () => {
        this.setState({refresh: true});
        const jobFileToDelete = this.state.jobFileToDelete;
        for (let i = 0; i < jobFileToDelete.length; i++) {
            let jobFile = jobFileToDelete[i];
            const index = this.state.jobFiles.indexOf(jobFile);
            this.state.jobFiles.splice(index, 1);
            this.deleteJobFiles(jobFile);
        }
        this.setState(this.state.jobFiles);
        this.setState({jobFileToDelete: []});
        window.setTimeout(() => {
            this.setState({refresh: false});
        }, 1000)

    };

    deleteJobFiles = (jobFileToDelete) => {
        axios.delete(`/api/job_files`, {
            data: {
                jobFile: jobFileToDelete
            }
        }).catch(err => {
            console.log(err);
        });
    };

    handleSingleDelete = (jobFile) => {
        this.state.jobFileToDelete.push(jobFile);
        this.setState({showJobFileDeleteModal: true}
        )
    };

    handleMultipleDelete = (data) => {
        const delArray = data.reduce((a, jobFile) => {
            a.push(jobFile.job);
            return a
        }, []);
        this.setState({showJobFileDeleteModal: true, jobFileToDelete: delArray})
    };

    handleAddEvent = () => {
        const jobFile = {
            id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
            fileURL: "",
            filename:'',
            numCopies: 1,
            requirements: this.loadRequirements(),
            remarks: "",
        };

        const jobFiles = this.state.jobFiles;
        jobFiles.push(jobFile);
        this.setState({jobFiles: this.state.jobFiles, activeScreen: 'uploadFile'});
    };

    handleCancel = (type) => {
        if (type === 'upload') {
            this.state.jobFiles.splice(-1, 1);
            this.setState({activeScreen: 'showFiles'});
        } else {
            this.setState({activeScreen: 'showFiles'});
        }
    };

    handleUploadSuccess = () => {
        this.updateJobFiles();
        this.setState({activeScreen: 'showFiles'});
    };

    handleEditFile = (jobFile) => {
        this.setState({activeScreen: 'editFile', editJobFile: jobFile});
    };

    handleEditCancel = () => {
        this.setState({activeScreen: 'showFile', editJobFile: null});
    };

    render() {
        switch (this.state.jobFiles) {
            case null:
                return <div></div>;
            default:
                switch (this.state.activeScreen) {
                    case 'uploadFile':
                        return (
                            <div>
                                <Paper square={true} className='job-detail-paper' elevation={0}>
                                    {
                                        this.state.jobFiles.length > 0 ?
                                            <div>
                                                <FileUploadSection
                                                    handleCancel={this.handleCancel}
                                                    successClose={this.handleUploadSuccess}
                                                    jobFile={this.state.jobFiles[this.state.jobFiles.length - 1]}
                                                    job={this.props.job}
                                                    type='upload'
                                                    handleSingleDelete={this.handleSingleDelete}
                                                />
                                            </div> : ''
                                    }
                                </Paper>
                            </div>
                        );
                    case 'editFile':
                        return (
                            <div>
                                <Paper square={true} className='job-detail-paper' elevation={0}>
                                    {
                                        this.state.editJobFile !== null ?
                                            <div>
                                                <FileUploadSection
                                                    handleCancel={this.handleEditCancel}
                                                    successClose={this.handleUploadSuccess}
                                                    jobFile={this.state.editJobFile}
                                                    job={this.props.job}
                                                    type='edit'
                                                    handleSingleDelete={this.handleSingleDelete}
                                                />
                                            </div> : ''
                                    }
                                </Paper>
                            </div>
                        );
                    default:
                        return (<div>
                            <Paper square={true} className='job-detail-paper' elevation={0}>
                                <div>
                                    <div>
                                        <div className='d-flex flex-row align-items-center'>
                                            <FontAwesomeIcon icon={faPlusSquare} color="green" size="3x"
                                                             className='job-files-add-file'
                                                             onClick={this.handleAddEvent}
                                            />
                                            <h3 className='job-detail-section-header'>Upload your documents</h3>
                                        </div>
                                    </div>
                                    {this.state.jobFiles.length > 0 ?
                                        <div>
                                            <MediaQuery minWidth={768}>
                                                <JobFileSummaryTable
                                                    jobFiles={this.state.jobFiles}
                                                    deleteFile={this.handleSingleDelete}
                                                    editFile={this.handleEditFile}
                                                    deleteMultipleFiles={this.handleMultipleDelete}
                                                    selectOption={this.state.selectOption}
                                                    refresh={this.state.refresh}

                                                />
                                            </MediaQuery>
                                            <MediaQuery maxWidth={767}>
                                                <JobFileSummaryTableMobile
                                                    jobFiles={this.state.jobFiles}
                                                    deleteFile={this.handleSingleDelete}
                                                    editFile={this.handleEditFile}
                                                    deleteMultipleFiles={this.handleMultipleDelete}
                                                    selectOption={this.state.selectOption}
                                                    refresh={this.state.refresh}
                                                />
                                            </MediaQuery>
                                        </div>
                                        : <p>You have not uploaded any documents yet</p>}
                                </div>

                                <AffirmationModal
                                    modal={this.state.showJobFileDeleteModal}
                                    toggle={(e) => this.setState({showJobFileDeleteModal: !this.state.showJobFileDeleteModal})}
                                    title="Delete Document?"
                                    affirmativeAction={(e) => {
                                        this.setState({showJobFileDeleteModal: !this.state.showJobFileDeleteModal});
                                        this.handleDeleteJobFiles();
                                    }}
                                    affirmativeText='Yes'
                                    cancelText='No'
                                >
                                    <p>Are you sure you want to delete the document?</p>
                                </AffirmationModal>
                            </Paper>
                        </div>);
                }
        }
    }
}

const mapStateToProps = ({auth}) => {
    return {auth};
};

export default withRouter(connect(mapStateToProps)(JobFilesDisplay));
