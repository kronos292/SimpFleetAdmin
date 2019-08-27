import React, { Component } from "react";
import Logo from "../../img/logo.jpg";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const userLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <div
            className="avatar ml-3 mr-3 d-flex align-items-center justify-content-center"
            data-toggle="dropdown"
          >
            <h5 className="text-light mt-1">S</h5>
          </div>
          <div className="dropdown-menu dropdown-menu-right dropdown-menu-lg-right">
            <div className="dropdown-item m-3 p-why disabled">
              <div className="row">
                <div className="avatar d-flex align-items-center justify-content-center">
                  <h5 className="text-light mt-1">S</h5>
                </div>
                <div className="col lg-auto">
                  <p className="closer font-weight-bold">{user.name}</p>
                  <p className="closer">Email</p>
                </div>
              </div>
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item text-right signout">
              <button
                className="btn btn-outline-success"
                onClick={this.onLogoutClick.bind(this)}
              >
                Sign Out
              </button>
            </div>
          </div>
        </li>
      </ul>
    );

    const guestLink = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link text-success" to="/login">
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/register">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Join Our Platform
            </button>
          </Link>
        </li>
        <li className="nav-item ml-1">
          <Link to="/login">
            <button
              className="btn btn-outline-success my-2 my-sm-0 font-weight-bold sign-in"
              /* style="padding-right: 25px; padding-left: 25px" */
              type="submit"
            >
              SIGN IN
            </button>
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand ml-5" to="/">
          <img src={Logo} width="133" height="40" alt="" />
        </Link>
        <button
          className="navbar-toggler btn btn-outline-secondary"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {isAuthenticated ? userLink : guestLink}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
