import React, {Component} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import {withRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";

import {
    Paper,
    Breadcrumbs,
    Link,
    Typography,
    List,
    ListItem,
    ListItemText,
    Snackbar,
    IconButton,
    Slide
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';

import {Col, Container, Row, Button} from 'react-bootstrap'

import JobDetailCard from "./JobDetailCard";
import JobFilesDisplay from "./Files/JobFilesDisplay";
import JobShareModal from "./JobShareModal/JobShareModal";
import JobStatusDisplay from "./JobStatusDisplay/JobStatusDisplay";
import JobDropoffDetail from "./JobDropoffDetail";
import JobBillingDetail from "./JobBillingDetail/JobBillingDetail";
import './JobDetails.css';
import MediaQuery from "react-responsive";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {withStyles} from '@material-ui/core/styles';
import JobShareSlide from "../JobShareSlide/JobShareSlide";

import Popover, {ArrowContainer} from "react-tiny-popover";
import {FocusOn} from "react-focus-on";

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#49AE86',
    },
})(Tabs);

const AntTab = withStyles(theme => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(0),
        padding: 6,
        fontFamily: 'Roboto',
        '&:hover': {
            color: '#707070',
            opacity: 1,
        },
        '&$selected': {
            color: '#707070',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#707070',
            outline: "none",
        },
    },
    selected: {},
}))(props => <Tab disableRipple {...props} />);

class JobDetails extends Component {
    state = {
        job: null,
        jobLink: '',
        activeScreen: 'jobDetails',
        showSharingModal: false,
        copied: false,
        inputSelected: false,
    };

    componentDidMount() {
        // Get job
        axios.get(`/api/jobs/index?index=${queryString.parse(this.props.location.search).job}`).then(res => {
            const job = res.data;
            this.setState({job});

            // Get job link
            axios.get(`/api/job_links?jobIndex=${job.index}`).then(res => {
                this.setState({jobLink: res.data});
            }).catch(err => {
                console.log(err);
            });

            const url = new URL(window.location.href);
            const tab = url.searchParams.get("tab");
            if (tab !== null && tab !== '') {
                this.setTabURL(tab);
                this.setState({activeScreen: tab});
            } else {
                this.setState({activeScreen: 'jobDetails'});
            }
        }).catch(err => {
            console.log(err);
        });
    }

    setTabURL = (tabName) => {
        const url = new URL(window.location.href);
        url.searchParams.set("tab", tabName);
        window.history.pushState('page2', 'Title', url.toString());
    };

    generateInvitationLink = () => {
        axios.post('/api/job_links', {
            job: this.state.job
        }).then(res => {
            this.setState({jobLink: res.data});
        }).catch(err => {
            console.log(err);
        });
        this.setState({showSharingModal: true});
    };

    handleShareModalClose = () => {
        this.setState({showSharingModal: false, inputSelected: false});
    };

    handleDrawerClick(key) {
        this.setTabURL(key);
        this.setState({activeScreen: key});
    }

    handleCopy = () => {
        this.setState({copied: true});
        window.setTimeout(() => {
            this.setState({copied: false})
        }, 5000)
    };


    handleClose = () => {
        this.setState({copied: false})
    };

    SlideTransition = (props) => {
        return <Slide {...props} direction="up"/>
    };

    saveJobCancellation = (job) => {
        // Save job details
        axios.put('/api/jobs', {
            job,
            sendEmailUpdate: false
        }).then(res => {
            this.setState({job: res.data});
        }).catch(err => {
            console.log(err);
        });
    };

    handleChangeTab = (event, newValue) => {
        this.setTabURL(newValue);
        this.setState({activeScreen: newValue})
    };

    handleSelect = (e) => {
        this.setState({inputSelected: true});
    };

    render() {
        const showComponent = () => {
            switch (this.state.activeScreen) {
                case 'jobDetails':
                    return <JobDetailCard job={this.state.job}/>;
                case 'document':
                    return <JobFilesDisplay job={this.state.job}/>;
                case 'status':
                    return <JobStatusDisplay job={this.state.job}/>;
                case 'dropoff':
                    return <JobDropoffDetail job={this.state.job}/>;
                case 'billing':
                    return <JobBillingDetail job={this.state.job} saveJobCancellation={this.saveJobCancellation}/>;
                default:
                    return <JobDetailCard job={this.state.job}/>;
            }
        };

        switch (this.props.auth) {
            case null:
                return <div></div>;
            case false:
                return <Redirect to="/"/>;
            default:
                switch (this.state.job) {
                    case null:
                        return <div></div>;
                    default:
                        return (
                            <div>
                                <MediaQuery minWidth={769}>
                                    <Container fluid style={{marginTop: 20, marginBottom: 30}}>
                                        <Row>
                                            <Col xs={12} md={{span: 10, offset: 1}}>
                                                <Paper elevation={0} className='job-detail-breadcrumbs' square={true}>
                                                    <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>}
                                                                 aria-label="Breadcrumb">
                                                        <Link href="#" onClick={(e) => {
                                                            this.props.history.push('/');
                                                        }} className='job-detail-breadcrumbs-link'>
                                                            Dashboard
                                                        </Link>
                                                        <h4>{this.state.job.vessel.vesselName.toUpperCase()}, {this.state.job.vessel.vesselIMOID}</h4>
                                                    </Breadcrumbs>
                                                </Paper>
                                                <Paper square={true}>
                                                    <Paper className='job-details-ship-title' square={true}>
                                                        <div className='d-flex align-items-center'>
                                                            <h1 className='job-detail-fonts'
                                                                style={{marginBottom: '0px'}}>{this.state.job.vessel.vesselName.toUpperCase()} {this.state.job.vessel.vesselIMOID}</h1>
                                                            <Button variant="outlined"
                                                                    onClick={this.generateInvitationLink}
                                                                    className='job-details-share-button ml-auto'
                                                                    href="#">
                                                                <ShareIcon className='job-detail-share-icon'/>
                                                                Share
                                                            </Button>
                                                        </div>
                                                    </Paper>
                                                    <Paper square={true} className='job-detail-side-bar'>
                                                        <Container fluid>
                                                            <Row className='align-items-stretch'>
                                                                <Col xs={3} className='col-no-padding job-details-menu'>
                                                                    <Paper square={true}
                                                                           className='job-details-menu-paper'
                                                                           elevation={0}>
                                                                        <List disablePadding={true}>
                                                                            <ListItem button key='jobDetails'
                                                                                      onClick={() => {
                                                                                          this.handleDrawerClick('jobDetails')
                                                                                      }}
                                                                                      className={this.state.activeScreen === 'jobDetails' ? 'job-details-nav-active' : 'job-details-nav'}>
                                                                                <ListItemText>Job Details</ListItemText>
                                                                            </ListItem>
                                                                            <ListItem button key='status'
                                                                                      onClick={() => {
                                                                                          this.handleDrawerClick('status')
                                                                                      }}
                                                                                      className={this.state.activeScreen === 'status' ? 'job-details-nav-active' : 'job-details-nav'}>
                                                                                <ListItemText>Status</ListItemText>
                                                                            </ListItem>
                                                                            <ListItem button key='document'
                                                                                      onClick={() => {
                                                                                          this.handleDrawerClick('document')
                                                                                      }}
                                                                                      className={this.state.activeScreen === 'document' ? 'job-details-nav-active' : 'job-details-nav'}>
                                                                                <ListItemText>Document</ListItemText>
                                                                            </ListItem>
                                                                            <ListItem button key='dropoff'
                                                                                      onClick={() => {
                                                                                          this.handleDrawerClick('dropoff')
                                                                                      }}
                                                                                      className={this.state.activeScreen === 'dropoff' ? 'job-details-nav-active' : 'job-details-nav'}>
                                                                                <ListItemText>Drop Off</ListItemText>
                                                                            </ListItem>
                                                                            <ListItem button key='billing'
                                                                                      onClick={() => {
                                                                                          this.handleDrawerClick('billing')
                                                                                      }}
                                                                                      className={this.state.activeScreen === 'billing' ? 'job-details-nav-active' : 'job-details-nav'}>
                                                                                <ListItemText>Billing</ListItemText>
                                                                            </ListItem>
                                                                        </List>
                                                                    </Paper>
                                                                </Col>
                                                                <Col xs={9}
                                                                     className='col-no-padding job-detail-content-border-rad'
                                                                     as={Paper}>
                                                                    {showComponent()}
                                                                </Col>
                                                            </Row>
                                                        </Container>
                                                    </Paper>
                                                </Paper>

                                                <div>
                                                    <JobShareModal show={this.state.showSharingModal}
                                                                   Close={this.handleShareModalClose}
                                                                   joblinkurl={this.state.jobLink.url}
                                                                   job={this.state.job}
                                                                   copied={this.handleCopy}
                                                    />
                                                    <Snackbar anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                                              open={this.state.copied}
                                                              message={<span
                                                                  id="message-id">Link Has Been Copied</span>}
                                                              action={
                                                                  <IconButton
                                                                      key="close"
                                                                      color="inherit"
                                                                      onClick={this.handleClose}
                                                                  >
                                                                      <CloseIcon/>
                                                                  </IconButton>
                                                              }
                                                              TransitionComponent={this.SlideTransition}
                                                    />
                                                </div>
                                            </Col>
                                        </Row>
                                    </Container>
                                </MediaQuery>
                                <MediaQuery maxWidth={768}>
                                    <Container fluid
                                               style={{ padding: "5% 8%", backgroundColor: '#F7F8F7'}}>
                                        <Row>
                                            <Paper elevation={0} square={true}
                                                   className='d-flex align-items-center w-100' style={{backgroundColor: '#F7F8F7'}}>
                                                <Breadcrumbs separator={<NavigateNextIcon fontSize="small"/>}
                                                             aria-label="Breadcrumb">
                                                    <Link href="#" onClick={(e) => {
                                                        this.props.history.push('/');
                                                    }} className='job-detail-breadcrumbs-link'>
                                                        Dashboard
                                                    </Link>
                                                    <h4 className='job-details-ship-title-font'>{this.state.job.vessel.vesselName.toUpperCase()}, {this.state.job.vessel.vesselIMOID}</h4>
                                                </Breadcrumbs>
                                                <div className='ml-auto'>
                                                    <FocusOn enabled={this.props.isPopoverOpen}
                                                             onClickOutside={this.props.handlePopoverClose}
                                                             onEscapeKey={this.props.handlePopoverClose}>
                                                        <Popover
                                                            isOpen={this.props.isPopoverOpen}
                                                            position={'bottom'}
                                                            padding={10}
                                                            containerStyle={{marginTop: '-10px'}}
                                                            windowBorderPadding={15}
                                                            onClickOutside={this.props.handlePopoverClose}
                                                            content={({position, targetRect, popoverRect}) => (
                                                                <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                                                                    position={position}
                                                                    targetRect={targetRect}
                                                                    popoverRect={popoverRect}
                                                                    arrowColor={'#666666'}
                                                                    arrowSize={10}
                                                                    arrowStyle={{opacity: 1}}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            backgroundColor: '#666666',
                                                                            opacity: 1,
                                                                            width: "80vw",
                                                                            padding: 16,
                                                                            borderRadius: '5px'
                                                                        }}
                                                                        onClick={this.props.handlePopoverClose}
                                                                    ><span style={{
                                                                        fontFamily: 'Roboto',
                                                                        fontSize: '14px',
                                                                        color: 'white'
                                                                    }}>Click on this button to share the job with
                                                            anyone who is sending items to the same
                                                            vessel!</span>
                                                                    </div>
                                                                </ArrowContainer>
                                                            )}
                                                        >
                                                            <IconButton onClick={this.generateInvitationLink}>
                                                                <ShareIcon
                                                                    className='job-detail-share-icon-button'/>
                                                            </IconButton>
                                                        </Popover>
                                                    </FocusOn>
                                                </div>
                                            </Paper>
                                        </Row>
                                        <Row>
                                            <AntTabs value={this.state.activeScreen} onChange={this.handleChangeTab} variant="fullWidth" centered className='w-100'>
                                                <AntTab label='Job Details' value='jobDetails'/>
                                                <AntTab label='Status' value='status'/>
                                                <AntTab label='Documents' value='document'/>
                                                <AntTab label='Drop-off' value='dropoff'/>
                                                <AntTab label='Billing' value='billing'/>
                                            </AntTabs>
                                        </Row>
                                        <Row>
                                            <Paper square={true} elevation={5} className='w-100'>
                                                {showComponent()}
                                            </Paper>
                                        </Row>
                                        <div>
                                            <JobShareSlide open={this.state.showSharingModal}
                                                           onClose={this.handleShareModalClose}
                                                           joblinkurl={this.state.jobLink.url}
                                                           job={this.state.job}
                                                           inputSelected={this.state.inputSelected}
                                                           handleSelect={this.handleSelect}/>
                                        </div>
                                    </Container>
                                </MediaQuery>
                            </div>
                        );
                }
        }
    }
}


const mapStateToProps = ({auth}) => {
    return {auth};
};


export default withRouter(connect(mapStateToProps)(JobDetails));