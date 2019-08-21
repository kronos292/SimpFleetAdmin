import React, { Component } from "react";
import Logo from "../../img/logo.jpg";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg justify-content-between nav-bar">
        <Link className="navbar-brand" to="/">
          <img src={Logo} className="logo" alt="logo" />
        </Link>
        <form className="form-inline mt-2 mt-md-0">
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
          <Link to="/login">
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              SIGN IN
            </button>
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto nav">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <Link to="/sign_up">
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="submit"
                >
                  Join Our Platform
                </button>
              </Link>
            </ul>
          </div>
        </form>
      </nav>
    );
  }
}

export default Navbar;
