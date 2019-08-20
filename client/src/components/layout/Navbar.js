import React, { Component } from "react";
import Logo from "../../img/logo.jpg";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <nav className="nav-bar navbar navbar-expand-lg navbar-light">
        <a href="/">
          <img src={Logo} alt="logo" className="logo" />
        </a>
        <div className="ml-auto navbar-nav">
          <div className="nav-item">
            <form className="form-inline mt-2 mt-md-0">
              <Link to="/login">
                <button
                  className="btn btn-outline-success my-2 my-sm-0 font"
                  type="button"
                >
                  SIGN IN
                </button>
              </Link>
              <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span class="navbar-toggler-icon" />
              </button>
              <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item">
                    <Link class="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link to="/sign_up">
                      <button
                        className="btn btn-outline-success my-2 my-sm-0"
                        type="button"
                      >
                        Join Our Platform
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* <Link to="/sign_up">
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  type="button"
                >
                  Join Our Platform
                </button>
              </Link> */}
            </form>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
