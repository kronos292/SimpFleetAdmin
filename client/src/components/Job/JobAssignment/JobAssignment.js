import React, { Component } from "react";
import { Input, Table, Button, Container, Row, Col } from "reactstrap";
import axios from "axios";

class JobAssignment extends Component {
  state = {
    jobAssignments: null,
    logisticsCompanies: null
  };

  componentDidMount() {
    axios
      .get("/api/job_assignments")
      .then(res => {
        this.setState({
          jobAssignments: res.data.reverse()
        });
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get("/api/logistics_companies")
      .then(res => {
        this.setState({
          logisticsCompanies: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  saveJobAssignments = () => {
    axios
      .put("/api/job_assignments", {
        jobAssignments: this.state.jobAssignments
      })
      .then(res => {
        window.location.reload();
      })
      .catch(err => {
        console.log(err);
      });
  };

  renderLogisticsCompanies = jobAssignment => {
    const defaultValue = "Please Select";
    return (
      <Input
        type="select"
        value={
          jobAssignment.logisticsCompany !== undefined
            ? jobAssignment.logisticsCompany.name
            : defaultValue
        }
        onChange={e => {
          const jobAssignments = this.state.jobAssignments;
          for (let i = 0; i < jobAssignments.length; i++) {
            const jobAssignmentObj = jobAssignments[i];
            if (jobAssignmentObj._id === jobAssignment._id) {
              const logisticsCompanies = this.state.logisticsCompanies;
              for (let j = 0; j < logisticsCompanies.length; j++) {
                const logisticsCompanyObj = logisticsCompanies[j];
                if (logisticsCompanyObj.name === e.target.value) {
                  jobAssignmentObj.logisticsCompany = logisticsCompanyObj;
                  break;
                }
              }
              break;
            }
          }
          this.setState({ jobAssignments });
        }}
      >
        <option>{defaultValue}</option>
        {this.state.logisticsCompanies.map((logisticsCompany, index) => {
          return <option key={index}>{logisticsCompany.name}</option>;
        })}
      </Input>
    );
  };

  render() {
    switch (this.state.jobAssignments) {
      case null:
        return <div></div>;
      default:
        switch (this.state.logisticsCompanies) {
          case null:
            return <div></div>;
          default:
            const jobAssignments = this.state.jobAssignments.map(
              (jobAssignment, index) => {
                const { job } = jobAssignment;
                const { user, vessel } = job;
                const { userCompany } = user;
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{job.index}</td>
                    <td>{userCompany.name}</td>
                    <td>{job.jobId}</td>
                    <td>{vessel !== null ? vessel.vesselName : ""}</td>
                    <td>{this.renderLogisticsCompanies(jobAssignment)}</td>
                  </tr>
                );
              }
            );

            return (
              <Container fluid>
                <br />
                <Row>
                  <Col xs="12" className="text-center">
                    <Button
                      type="button"
                      onClick={e => this.saveJobAssignments()}
                    >
                      Save Changes
                    </Button>
                  </Col>
                </Row>
                <br />

                <Table striped hover bordered responsive>
                  <tr>
                    <th>No.</th>
                    <th>Job ID</th>
                    <th>Company</th>
                    <th>Job Number</th>
                    <th>Vessel</th>
                    <th>Assignment</th>
                  </tr>
                  {jobAssignments}
                </Table>
              </Container>
            );
        }
    }
  }
}

export default JobAssignment;
