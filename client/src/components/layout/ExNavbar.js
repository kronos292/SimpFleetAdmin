import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Nav, Navbar, Image } from "react-bootstrap";

import "./ExNavbar.css";
class ExNavbar extends Component {
  render() {
    return (
      <Navbar expand="lg" className="nav-bar">
        <Navbar.Brand
          href="#"
          onClick={e => {
            e.preventDefault();
            this.props.history.push("/");
          }}
        >
          <Image className="logo" src="../../../images/logo.jpg" />
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Nav.Item>
            <form className="form-inline mt-2 mt-md-0">
              <button
                onClick={e => {
                  e.preventDefault();
                  this.props.history.push("/login");
                }}
                className="btn btn-outline-success my-2 my-sm-0 font"
                type="button"
              >
                SIGN IN
              </button>
            </form>
          </Nav.Item>
        </Nav>
      </Navbar>
    );
  }
}

export default withRouter(ExNavbar);
