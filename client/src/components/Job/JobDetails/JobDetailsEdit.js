import React, { Component } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row
} from "reactstrap";
import axios from "axios";

import AffirmationModal from "../../ui/Modal/AffirmationModal";

class JobDetailsEdit extends Component {
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
    jobStatus: null,
    showCheckJobStatusModal: false,
    cancellationConfirmationModal: false
  };

  updateJobStatus = () => {
    axios
      .post("/api/job_trackers", {
        ...this.state.jobStatus,
        jobId: this.props.job._id
      })
      .then(res => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  checkJobTracker = jobStatus => {
    this.setState({
      jobStatus,
      showCheckJobStatusModal: true
    });
  };

  cancelJob = () => {
    const job = this.props.job;
    job.isCancelled = "Confirmed";

    axios
      .put("/api/jobs", {
        job,
        sendEmailUpdate: false
      })
      .then(res => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const job = this.props.job;
    const jobTrackers = job.jobTrackers.sort((a, b) => {
      return a.index - b.index;
    });

    return (
      <Container fluid>
        <Row>
          <Col xs="12" md={{ size: 4, offset: 4 }}>
            <Button
              type="button"
              color="danger"
              onClick={e =>
                this.setState({ cancellationConfirmationModal: true })
              }
            >
              Cancel Job
            </Button>
            <br />
            <br />
            <Form>
              {this.state.jobStatuses.map((jobStatus, index) => {
                return (
                  <FormGroup check key={index}>
                    <Label check>
                      <Input
                        type="checkbox"
                        disabled={!(jobStatus.index === jobTrackers.length + 1)}
                        checked={jobStatus.index <= jobTrackers.length}
                        onChange={e => this.checkJobTracker(jobStatus)}
                      />{" "}
                      {jobStatus.title}
                    </Label>
                  </FormGroup>
                );
              })}
              <br />
              <FormGroup>
                <Button
                  className="global-primary-button"
                  onClick={this.props.cancel}
                >
                  Back
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>

        <AffirmationModal
          modal={this.state.showCheckJobStatusModal}
          toggle={e =>
            this.setState({
              showCheckJobStatusModal: !this.state.showCheckJobStatusModal
            })
          }
          title="Job Status Update"
          affirmativeAction={this.updateJobStatus}
          affirmativeText="Yes"
          cancelText="No"
        >
          Are you sure you want to update this job status?
        </AffirmationModal>

        <AffirmationModal
          modal={this.state.cancellationConfirmationModal}
          toggle={e =>
            this.setState({
              cancellationConfirmationModal: !this.state
                .cancellationConfirmationModal
            })
          }
          title="Job Cancellation"
          affirmativeAction={this.cancelJob}
          affirmativeText="Confirm"
        >
          Are you sure you want to cancel this job?
        </AffirmationModal>
      </Container>
    );
  }
}

export default JobDetailsEdit;
