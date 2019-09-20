import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Paper } from "@material-ui/core";
import { Col, Container, Row, Button } from "react-bootstrap";

import "./JobBillingDetail.css";

class JobBillingDetail extends Component {
  state = {
    status: null,
    showJobCancelModal: false,
    paymentTrackers: [],
    paymentTrackerList: [
      {
        index: 1,
        label: "Not Yet Invoiced"
      },
      {
        index: 2,
        label: "Invoiced, Not Paid"
      },
      {
        index: 3,
        label: "Paid"
      }
    ]
  };

  componentDidMount() {
    const job = this.props.job;
    /* const paymentTrackers = job.paymentTrackers; */
    if (this.props.auth.userType === "Admin") {
      this.setState({
        status: /* job.isCancelled */ "Denied"
        /* paymentTrackers: paymentTrackers */
      });
    } else {
      /* const userPaymentTrackers = paymentTrackers
        .filter(o => o.user === this.props.auth._id)
        .sort((a, b) => {
          return b.index - a.index;
        }); */
      this.setState({
        status: /* job.isCancelled */ "Denied"
        /* paymentTrackers: userPaymentTrackers */
      });
    }
  }

  updatePaymentTracker = (paymentTacker, user) => {};

  renderCancelProcedure = () => {
    switch (this.state.status) {
      case "Pending":
        return (
          <div className="job-billing-request-section">
            <h3 className="job-billing-request-requested">
              Cancellation Requested
            </h3>
            <span>We will do our best in cancelling this job for you.</span>
            <ul>
              <li>
                <span className="font-weight-bold">
                  If this item is canceled:
                </span>
                <br />
                You will receive a confirmation email.
              </li>
              <li>
                <span className="font-weight-bold">
                  If this item is not canceled:
                </span>
                <br />
                You will receive an email informing you
                <br />
                that your request for cancellation is unsuccessful.
              </li>
            </ul>
          </div>
        );
      case "Confirmed":
        return (
          <div className="job-billing-request-section">
            <h3 className="job-billing-request-success">
              Cancellation Successful
            </h3>
            <p>
              Your request for cancellation has been approved.
              <br />
              Your job has been successfully canceled.
            </p>
          </div>
        );
      case "Denied":
        return (
          <div className="job-billing-request-section">
            <h3 className="job-billing-request-failure">
              Cancellation Unsuccessful
            </h3>
            <span>
              Your request for cancellation was unsuccessful.
              <br />
              We are not able to cancel your job.
              <br />
              Contact us at service@simpfleet.com for any queries.
            </span>
          </div>
        );
      default:
        return (
          <div className="job-billing-request-section">
            <h6
              className="job-billing-request-cancel-text"
              onClick={() => {
                this.setState({ showJobCancelModal: true });
              }}
            >
              Request Cancellation
            </h6>
            <p>
              Please take note that if your cancellation is within 2 hours of
              the given loading time or vessel berthing time, we will charge the
              Full Rate Of The Delivery.
            </p>
          </div>
        );
    }
  };

  render() {
    let renderAdminPaymentPanel;
    if (this.props.auth.user.userType === "Admin") {
      /* const partyList = this.state.paymentTrackers
        .reduce((a, tracker) => {
          a.push(tracker.user);
          return a;
        }, [])
        .filter((v, i, a) => a.indexOf(v) === i); */
      /* renderAdminPaymentPanel = partyList.map((id, index) => {
        let userPaymentTracker = this.state.paymentTrackers
          .filter(o => o.user === id)
          .sort((a, b) => {
            return b.index - a.index;
          });
        return (
          <div key={index} className="d-flex align-items-center">
            <p>Payment Status: {userPaymentTracker[0].label}</p>
            {userPaymentTracker.length === 3 ? (
              ""
            ) : (
              <Button
                onClick={e => {
                  const paymentIndex = userPaymentTracker.length;
                  this.updatePaymentTracker(
                    this.state.paymentTrackerList[paymentIndex],
                    id
                  );
                }}
              >
                Advance Payment
              </Button>
            )}
          </div>
        );
      }); */
    }

    return (
      <div>
        <Paper square={true} className="job-detail-paper" elevation={0}>
          <Container>
            <Row>
              <Col xs={12} md={8}>
                {/*<h3 className='job-detail-section-header-price'>Price</h3>*/}
                {/*<JobCreatePriceTable jobItems={this.props.job.jobItems}/>*/}
                {/* {this.state.paymentTrackers[0] ? (
                  <div>
                    {this.props.auth.userType === "Admin" ? (
                      <div>{renderAdminPaymentPanel}</div>
                    ) : (
                      <p>
                        Payment Status: {this.state.paymentTrackers[0].label}
                      </p>
                    )}
                  </div>
                ) : (
                  ""
                )} */}
                {this.renderCancelProcedure()}
                {this.props.auth.userType === "Admin" &&
                this.state.status === "Pending" ? (
                  <div>
                    <Button
                      variant="danger"
                      onClick={() => {
                        const job = this.props.job;
                        job.isCancelled = "Denied";
                        this.props.saveJobCancellation(job);
                        this.setState({ status: job.isCancelled });
                      }}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => {
                        const job = this.props.job;
                        job.isCancelled = "Confirmed";
                        this.props.saveJobCancellation(job);
                        this.setState({ status: job.isCancelled });
                      }}
                      style={{ marginLeft: "15px" }}
                    >
                      Approve
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </Col>
            </Row>
            {/* <AffirmationModal
              modal={this.state.showJobCancelModal}
              toggle={e =>
                this.setState({
                  showJobCancelModal: !this.state.showJobCancelModal
                })
              }
              title="Cancellation"
              affirmativeAction={() => {
                const job = this.props.job;
                job.isCancelled = "Confirmed";
                this.props.saveJobCancellation(job);
                this.setState({
                  status: job.isCancelled,
                  showJobCancelModal: false
                });
              }}
              affirmativeText="Yes"
              cancelText="No"
            >
              <p>
                <strong>Are you sure you want to cancel job?</strong>
              </p>
              <p>
                Please take note that if your cancellation is within 2 hours of
                the given loading time or vessel berthing time, we will charge
                the full rate of the delivery.
              </p>
            </AffirmationModal> */}
          </Container>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(JobBillingDetail));
