import React, { Component } from "react";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authAction";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      first_name: "",
      last_name: "",
      fullname: "",
      contact: "",
      email: "",
      company: "",
      password: "",
      password2: "",
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      fullname: this.state.fullname,
      contact: this.state.contact,
      email: this.state.email,
      company: this.state.company,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login-div mt-0">
        <div className="container login col-10 col-lg-4">
          <h3 className="text-center text-success">Sign up with SimpFleet</h3>
          <p className="text-center">Get started with us by signing up</p>
          <form onSubmit={this.onSubmit}>
            <div className="row name">
              <div className="form-group col-6">
                <small>First Name*</small>
                <TextFieldGroup
                  placeholder="First Name"
                  name="first_name"
                  value={this.state.first_name}
                  onChange={this.onChange}
                  error={errors.first_name}
                />
              </div>
              <div className="form-group col-6">
                <small>Last Name*</small>
                <TextFieldGroup
                  placeholder="Last Name"
                  name="last_name"
                  value={this.state.last_name}
                  onChange={this.onChange}
                  error={errors.last_name}
                />
              </div>
            </div>
            <div className="form-group">
              <small>Contact Number*</small>
              <TextFieldGroup
                placeholder="Contact"
                name="contact"
                value={this.state.contact}
                onChange={this.onChange}
                error={errors.contact}
              />
            </div>
            <div className="form-group">
              <small>Email Address*</small>
              <TextFieldGroup
                placeholder="Email"
                name="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
              />
            </div>
            <div className="form-group">
              <small>Company Name*</small>
              <TextFieldGroup
                placeholder="Company"
                name="company"
                value={this.state.company}
                onChange={this.onChange}
                error={errors.company}
              />
            </div>
            <div className="form-group">
              <small>Password*</small>
              <TextFieldGroup
                placeholder="Password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
              />
            </div>
            <div className="form-group">
              <small>Confirm Password*</small>
              <TextFieldGroup
                placeholder="Confirm Password"
                name="password2"
                type="password"
                value={this.state.password2}
                onChange={this.onChange}
                error={errors.password2}
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(Register);
