import React from "react";

export default function UserApprovalModal(props) {
  return (
    <React.Fragment>
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              User Approval
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            Are you sure to {props.status} {props.user} to login?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className={`btn btn-${
                props.status === "disable" ? "danger" : "primary"
              }`}
              onClick={() => props.onUpdateIsApprove(props.users)}
              data-dismiss="modal"
            >
              {props.status}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
