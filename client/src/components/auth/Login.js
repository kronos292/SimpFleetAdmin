import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";
import TextFieldGroup from "../common/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login-div mt-0">
        <div className="container login col-10 col-lg-4">
          <h3 className="text-center text-success">Log In</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <small>Email Address</small>
              <TextFieldGroup
                placeholder="Email Address"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
            </div>
            <div className="form-group">
              <small>Password</small>
              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
            </div>
            <div className="form-check mb-3">
              <label className="form-check-small">
                <input type="checkbox" className="form-check-input" value="" />
                Remember me
              </label>
            </div>
            <button type="submit" className="btn btn-success btn-block mb-3">
              SIGN IN
            </button>
            <p className="text-center mb-0">
              <Link to="/" className="forget">
                Forget Password?{" "}
              </Link>
            </p>
          </form>
        </div>
        <div className="container signup col-10 col-lg-4">
          <p className="text-center">
            Don't have account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
