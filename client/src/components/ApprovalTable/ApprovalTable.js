import React from "react";
import { Table } from "reactstrap";
import ApprovalModal from "./ApprovalModal";

function ApprovalTable(props) {
  /* map the user */
  const content = Object.keys(props.users).map((key, index) => {
    const users = props.users[key];
    let compObj = users.userCompany;
    if (users.userCompany === undefined) {
      compObj = users.company;
    }
    let compName = "";
    if (compObj === null || compObj === undefined) {
      compName = "";
    } else {
      compName = compObj.name;
    }
    return (
      /* body component */
      <React.Fragment key={index}>
        <tr>
          <td>{users.firstName === "" ? "-" : users.firstName}</td>
          <td>{users.lastName === "" ? "-" : users.lastName}</td>
          <td>{users.email === "" ? "-" : users.email}</td>
          <td>{compName === "" ? "-" : compName}</td>
          <td>{users.contactNumber === "" ? "-" : users.contactNumber}</td>
          <td>{users.isApproved === true ? "approved" : "not yet approved"}</td>
          <td>
            <button
              className={`btn btn-${users.isApproved ? "danger" : "primary"}`}
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
          <ApprovalModal
            user={users.firstName === "" ? "this account" : users.firstName}
            status={users.isApproved ? "disable" : "enable"}
            onUpdateIsApprove={props.onUpdateIsApprove}
            users={users}
          />
        </div>
      </React.Fragment>
    );
  });
  return (
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
  );
}
export default ApprovalTable;
