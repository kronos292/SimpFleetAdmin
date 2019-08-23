import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div className="login-div mt-0">
        <div className="container login col-10 col-lg-4">
          <h3 className="text-center text-success">Log In</h3>
          <form action="">
            <div className="form-group">
              <small>Email Address</small>
              <input
                type="text"
                className="form-control"
                placeholder="Email Address"
              />
            </div>
            <div className="form-group">
              <small>Password</small>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="form-check mb-3">
              <label className="form-check-small">
                <input type="checkbox" className="form-check-input" value="" />
                Remember me
              </label>
            </div>
            <Link to="/admin_home">
              <button type="submit" className="btn btn-success btn-block mb-3">
                SIGN IN
              </button>
            </Link>
            <p className="text-center mb-0">
              <Link to="/" className="forget">
                Forget Password?{" "}
              </Link>
            </p>
          </form>
        </div>
        <div className="container signup col-10 col-lg-4">
          <p className="text-center">
            Don't have account? <Link to="/sign_up">Sign Up</Link>
          </p>
        </div>
      </div>
    );
  }
}
export default Login;
