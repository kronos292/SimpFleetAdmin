import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import UserHistory from "./User/UserHistory";
import AdminHistory from "./Admin/AdminHistory";

class History extends Component {
  render() {
    switch (this.props.auth) {
      case null:
        return <div></div>;
      case false:
        return <Redirect to="/" />;
      default:
        switch (this.props.auth.user.userType) {
          case "Admin":
            return <AdminHistory />;
          default:
            return <UserHistory />;
        }
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};
export default connect(mapStateToProps)(History);
