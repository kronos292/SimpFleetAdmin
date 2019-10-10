import React, { Component } from "react";
import { Container } from "reactstrap";
import { Row, Table, Col } from "reactstrap";
import Axios from "axios";

class UserApproval extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    Axios.get(`/api/users`)
      .then(res => {
        let users = res.data;
        this.setState({ users });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onUpdateIsApprove = users => {
    Axios.put(`/api/users`, users).then(
      Axios.get(`/api/users`)
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
        const content = Object.keys(this.state.users).map((key, index) => {
          const users = this.state.users[key];
          return (
            <tr key={index}>
              <td>{users.firstName === "" ? "-" : users.firstName}</td>
              <td>{users.lastName === "" ? "-" : users.lastName}</td>
              <td>{users.email === "" ? "-" : users.email}</td>
              <td>{users.companyName === "" ? "-" : users.companyName}</td>
              <td>{users.contactNumber === "" ? "-" : users.contactNumber}</td>
              <td>
                {users.isApproved === true ? "approved" : "not yet approved"}
              </td>
              <td>
                <button
                  className={`btn btn-${
                    users.isApproved ? "danger" : "primary"
                  }`}
                  onClick={() => this.onUpdateIsApprove(users)}
                >
                  {users.isApproved ? "disable" : "enable"}
                </button>
              </td>
            </tr>
          );
        });
        return (
          <Container fluid>
            <br />
            <Row>
              <Col cs="12" md={{ size: 12, offset: 0 }} className="text-center">
                <h1>User Approval</h1>
              </Col>
              <Col cs="12" md={{ size: 12, offset: 0 }}>
                <Table striped hover bordered responsive>
                  <tr>
                    <th>First name</th>
                    <th>Last name</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                  {content}
                </Table>
              </Col>
            </Row>
          </Container>
        );
    }
  }
}
export default UserApproval;
