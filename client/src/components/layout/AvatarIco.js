import Avatar from "@material-ui/core/Avatar";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./AvatarIco.css";

class AvatarIco extends Component {
  state = {
    AvName: ""
  };

  componentDidMount() {
    let firstName = this.props.auth.user.firstName;
    this.setState({ AvName: firstName.charAt(0) });
  }

  render() {
    return (
      <div>
        <Avatar className="avatar-icon-color">{this.state.AvName}</Avatar>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(AvatarIco));
