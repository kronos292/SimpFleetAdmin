import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import AdminDashboard from "./Admin/AdminDashboard";
import ConsumerDashboard from "./Consumer/ConsumerDashboard";

class Dashboard extends Component {
  render() {
    switch (this.props.auth) {
      case null:
        return <div></div>;
      case false:
        return <Redirect to="/" />;
      default:
        switch (this.props.auth.user.userType) {
          case "Admin":
            return <AdminDashboard />;
          default:
            return <ConsumerDashboard />;
        }
    }
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default connect(mapStateToProps)(Dashboard);
