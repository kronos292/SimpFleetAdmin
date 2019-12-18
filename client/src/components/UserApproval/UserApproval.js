import React, { Component } from "react";
import { Container } from "reactstrap";
import { Row, Col } from "reactstrap";
import axios from "axios";
import ApprovalTable from "../ApprovalTable/ApprovalTable";

class UserApproval extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    axios
      .get(`/api/users`)
      .then(res => {
        let users = res.data;
        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onUpdateIsApprove = users => {
    console.log(users);
    axios.put(`/api/users`, users).then(
      axios
        .get(`/api/users`)
        .then(res => {
          let users = res.data;
          this.setState({ users });
        })
        .catch(err => {
          console.log(err);
        })
    );
  };

  render() {
    switch (this.state.users) {
      case null:
        return <div></div>;
      default:
        return (
          <Container fluid>
            <br />
            <Row>
              <Col cs="12" md={{ size: 12, offset: 0 }} className="text-center">
                <h1>User Approval</h1>
              </Col>
              <Col cs="12" md={{ size: 12, offset: 0 }}>
                {/* approval table component */}
                <ApprovalTable
                  users={this.state.users}
                  onUpdateIsApprove={this.onUpdateIsApprove}
                />
              </Col>
            </Row>
          </Container>
        );
    }
  }
}
export default UserApproval;
