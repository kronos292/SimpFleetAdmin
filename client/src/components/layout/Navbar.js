import React, { Component } from "react";
import Logo from "../../img/logo.jpg";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand ml-5" to="/">
          <img src={Logo} width="133" height="40" alt="" />
        </Link>
        <button
          className="navbar-toggler"
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
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link text-success" to="/login">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sign_up">
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
        </div>
      </nav>
    );
  }
}

export default Navbar;
