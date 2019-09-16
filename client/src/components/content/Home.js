import React, { Component } from "react";
import { connect } from "react-redux";

import User from "./user/User";
import Admin from "./admin/Admin";
import Public from "./public/Public";

class Home extends Component {
  renderContent = () => {
    const { isAuthenticated } = this.props.auth;
    switch (isAuthenticated) {
      case null:
        return <div></div>;
      case false:
        return <Public />;
      default:
        /* switch (this.props.auth.userType) {
          case "Admin":
            return <Admin />;
          default:
            return <User />;
        } */
        return <User />;
    }
  };

  render() {
    return <div>{this.renderContent()}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
