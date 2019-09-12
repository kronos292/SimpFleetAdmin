import Avatar from "@material-ui/core/Avatar";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./AvatarIco.css";

class AvatarIco extends Component {
  state = {
    fullName: ""
  };

  componentDidMount() {
    let fullName = this.props.auth.full_name;
    this.setState({ fullName: fullName });
  }

  render() {
    return (
      <div>
        <Avatar className="avatar-icon-color">{this.state.fullName}</Avatar>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(AvatarIco));
