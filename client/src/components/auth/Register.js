import React, { Component } from "react";
import { Link } from "react-router-dom";

class Register extends Component {
  render() {
    return (
      <div className="login-div mt-0">
        <div className="container login col-10 col-lg-4">
          <h3 className="text-center text-success">Sign up with SimpFleet</h3>
          <form action="">
            <div className="row ">
              <div className="form-group col-6">
                <small>First Name*</small>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name*"
                />
              </div>
              <div className="form-group col-6">
                <small>Last Name*</small>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name*"
                />
              </div>
            </div>
            <div className="form-group">
              <small>Contact Number*</small>
              <input
                type="password"
                className="form-control"
                placeholder="Contact Number*"
              />
            </div>
            <div className="form-group">
              <small>Email Address*</small>
              <input
                type="password"
                className="form-control"
                placeholder="Email Address*"
              />
            </div>
            <div className="form-group">
              <small>Company Name*</small>
              <input
                type="password"
                className="form-control"
                placeholder="Company Name*"
              />
            </div>
            <div className="form-group">
              <small>Password*</small>
              <input
                type="password"
                className="form-control"
                placeholder="Password*"
              />
            </div>
            <div className="form-group">
              <small>Confirm Password*</small>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password*"
              />
            </div>
            <button type="submit" className="btn btn-success btn-block mb-3">
              SIGN UP NOW
            </button>
          </form>
        </div>
        <div className="container signup col-10 col-lg-4">
          <p className="text-center">
            Have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}
export default Register;
