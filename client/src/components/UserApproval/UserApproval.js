import React, { Component } from "react";
import { Container } from "reactstrap";
import { Row, Table, Col } from "reactstrap";
import axios from "axios";
import UserApprovalModal from "./UserApprovalModal";

class UserApproval extends Component {
  state = {
    users: null
  };

  componentDidMount() {
    axios.get(`/api/users`)
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
        axios.get(`/api/users`)
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
          const compObj = users.userCompany;
          let compName = "";
          if (compObj === null) {
            compName = "";
          } else {
            compName = compObj.name;
          }
          return (
            <React.Fragment key={index}>
              <tr>
                <td>{users.firstName === "" ? "-" : users.firstName}</td>
                <td>{users.lastName === "" ? "-" : users.lastName}</td>
                <td>{users.email === "" ? "-" : users.email}</td>
                <td>{compName === "" ? "-" : compName}</td>
                <td>
                  {users.contactNumber === "" ? "-" : users.contactNumber}
                </td>
                <td>
                  {users.isApproved === true ? "approved" : "not yet approved"}
                </td>
                <td>
                  <button
                    className={`btn btn-${
                      users.isApproved ? "danger" : "primary"
                    }`}
                    /* onClick={() => this.onUpdateIsApprove(users) } */
                    data-toggle="modal"
                    data-target={`#approvemodal${users._id}`}
                  >
                    {users.isApproved ? "disable" : "enable"}
                  </button>
                </td>
              </tr>
              {/* modal approve */}
              <div
                className="modal fade"
                id={`approvemodal${users._id}`}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <UserApprovalModal
                  user={
                    users.firstName === "" ? "this account" : users.firstName
                  }
                  status={users.isApproved ? "disable" : "enable"}
                  onUpdateIsApprove={this.onUpdateIsApprove}
                  users={users}
                />
              </div>
            </React.Fragment>
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
                <Table hover bordered responsive striped>
                  <thead>
                    <tr>
                      <th>First name</th>
                      <th>Last name</th>
                      <th>Email</th>
                      <th>Company</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{content}</tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        );
    }
  }
}
export default UserApproval;
