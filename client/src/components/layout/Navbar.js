import React, { Component } from "react";
import Logo from "../../img/logo.jpg";

class Navbar extends Component {
  render() {
    return (
      <nav className="nav-bar navbar navbar-expand-lg navbar-light">
        <a href="#">
          <img src={Logo} alt="logo" className="logo" />
        </a>
        <div className="ml-auto navbar-nav">
          <div className="nav-item">
            <form className="form-inline mt-2 mt-md-0">
              <button
                className="btn btn-outline-success my-2 my-sm-0 font"
                type="button"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
