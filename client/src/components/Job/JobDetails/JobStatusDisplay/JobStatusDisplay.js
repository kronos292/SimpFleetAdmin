import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Paper, Button } from "@material-ui/core";

import { Timeline, TimelineEvent } from "react-event-timeline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

import JobDetailsEdit from "../JobDetailsEdit";

import "rc-steps/assets/index.css";
import "rc-steps/assets/iconfont.css";
import Steps, { Step } from "rc-steps";

import moment from "moment";

import "./JobStatusDisplay.css";

class JobStatusDisplay extends Component {
  state = {
    jobStatuses: [
      {
        index: 1,
        title: "Job booking pending confirmation",
        description:
          "We have received your job booking and are currently checking the details. We will send you a confirmation email once everything is verified.",
        trackingType: "Electronic"
      },
      {
        index: 2,
        title: "Job booking confirmed",
        description:
          "We have confirmed your job booking. Please deliver the items to 'No. 6 Tuas Ave 6, Singapore 639311' at least 24 hours before the vessel arrives.",
        trackingType: "Electronic"
      },
      {
        index: 3,
        title: "Pending items arrival at warehouse",
        description:
          "We have confirmed your job booking. Your job details have been passed to our operations side for processing.",
        trackingType: "Storage"
      },
      {
        index: 4,
        title: "All items have arrived at warehouse",
        description:
          "We have received all of your indicated items at our warehouse. We will proceed to check that everything is in order.",
        trackingType: "Storage"
      },
      {
        index: 5,
        title: "Items are on delivery",
        description:
          "Your items have been checked and loaded onto our trucks. It is currently on the way to the delivery destination.",
        trackingType: "Truck"
      },
      {
        index: 6,
        title: "Items have been received by customer",
        description:
          "Your items have been successfully received by the customer.",
        trackingType: "Truck"
      }
    ],
    showJobDetailsEdit: false
  };

  render() {
    const steps = this.state.jobStatuses;
    const job = this.props.job;
    const jobTrackers = job.jobTrackers.sort((a, b) => {
      return a.index - b.index;
    });
    const activeStep = jobTrackers.length;

    const renderSteps = steps.map((step, i) => {
      const jobStatus = jobTrackers.reduce((a, status) => {
        a.push(status.index);
        return a;
      }, []);
      if (!jobStatus.includes(step.index)) {
        return (
          <Step title={step.title} key={i} description={step.description} />
        );
      } else {
        const statusSelected = jobTrackers.filter(o => {
          return o.index === step.index;
        })[0];
        return (
          <Step
            title={statusSelected.title}
            key={i}
            description={
              <div className="d-flex flex-column">
                <span>
                  <i>
                    {moment(statusSelected.timestamp).format(
                      "Do MMMM YYYY, h:mm:ss a"
                    )}
                  </i>
                </span>
                <span>{statusSelected.description}</span>
                {statusSelected.remarks !== "" ? (
                  <span>Remarks: {statusSelected.remarks}</span>
                ) : (
                  ""
                )}
              </div>
            }
          />
        );
      }
    });

    //Overall Stepper View
    switch (this.state.showJobDetailsEdit) {
      case false:
        return (
          <div>
            <Paper square={true} elevation={0} className="job-detail-paper">
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ margin: 10 }}
              >
                {this.props.auth.userType === "Admin" ? (
                  <Button
                    variant="contained"
                    onClick={e => this.setState({ showJobDetailsEdit: true })}
                  >
                    Edit Status
                  </Button>
                ) : (
                  ""
                )}
              </div>
              <Steps
                direction="vertical"
                current={activeStep}
                icons={{
                  finish: <span className="status-finish">&#10003;</span>
                }}
              >
                {renderSteps}
              </Steps>
            </Paper>
            {/*<Paper square={true} elevation={0}>*/}
            {/*    <Timeline>*/}
            {/*        {*/}
            {/*            this.props.job.jobTrackers.sort((a, b) => {*/}
            {/*                return b.index - a.index;*/}
            {/*            }).map((jobTracker, index) => {*/}
            {/*                return (*/}
            {/*                    <TimelineEvent*/}
            {/*                        key={index}*/}
            {/*                        title={jobTracker.title}*/}
            {/*                        createdAt={new Date(jobTracker.timestamp).toString()}*/}
            {/*                        icon={<FontAwesomeIcon icon={faTruck}/>}*/}
            {/*                        titleStyle={{fontWeight: "400"}}*/}
            {/*                    >*/}
            {/*                        {jobTracker.description}*/}
            {/*                    </TimelineEvent>*/}
            {/*                );*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </Timeline>*/}
            {/*</Paper>*/}
          </div>
        );
      default:
        return (
          <div>
            {this.props.auth.userType === "Admin" ? (
              <JobDetailsEdit
                job={this.props.job}
                cancel={e => this.setState({ showJobDetailsEdit: false })}
              />
            ) : (
              ""
            )}
          </div>
        );
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(JobStatusDisplay));
