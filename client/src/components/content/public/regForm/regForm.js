import React, { Component } from "react";
import { registerUser } from "../../../../actions/authAction";
import "./regForm.css";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class RegForm extends Component {
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
      showSignUpSuccessModal: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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
    const name = this.state.first_name;
    alert(
      `Dear, ${name}. Thank you for signing up! Please wait for our confirmation email to gain access to your SimpFleet account. If however, you have something that is time sensitive and wish to reach us, please email us at service@simpfleet.com`
    );
  }
  render() {
    const { errors } = this.state;
    return (
      <Container>
        <form onSubmit={this.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <h3 className="text-center signup-title">
                Sign up with SimpFleet
              </h3>
              <h5 className="text-center signup-subtitle">
                Get started with us by signing up
              </h5>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                //autoComplete="given-name"
                name="first_name"
                variant="outlined"
                fullWidth
                id="given-name"
                label="First Name"
                autoFocus
                onChange={this.onChange}
                value={this.state.first_name}
                required
              />
              <Typography
                variant="caption"
                display="block"
                style={{ color: "red" }}
              >
                {errors.first_name}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                fullWidth
                id="family-name"
                label="Last Name"
                name="last_name"
                //autoComplete="family-name"
                onChange={this.onChange}
                value={this.state.last_name}
                required
              />
              <Typography
                variant="caption"
                display="block"
                style={{ color: "red" }}
              >
                {errors.last_name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="phone-signup"
                label="Contact Number"
                name="contact"
                //autoComplete="tel"
                onChange={this.onChange}
                value={this.state.contact}
                required
              />
              <Typography
                variant="caption"
                display="block"
                style={{ color: "red" }}
              >
                {errors.contact}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email-signup"
                label="Email Address"
                name="email"
                // autoComplete="email"
                type="email"
                value={this.state.email}
                onChange={this.onChange}
                required
              />
              <Typography
                variant="caption"
                display="block"
                style={{ color: "red" }}
              >
                {errors.email}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="company"
                label="Company Name"
                name="company"
                onChange={this.onChange}
                value={this.state.company}
                required
              />
              <Typography
                variant="caption"
                display="block"
                style={{ color: "red" }}
              >
                {errors.company}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                //autoComplete="current-password"
                onChange={this.onChange}
                value={this.state.password}
                required
              />
              <Typography
                variant="caption"
                display="block"
                style={{ color: "red" }}
              >
                {errors.password}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                //autoComplete="current-password"
                onChange={this.onChange}
                value={this.state.password2}
                required
              />
              <Typography
                variant="caption"
                display="block"
                style={{ color: "red" }}
              >
                {errors.password2}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                className="hover"
                variant="contained"
                color="primary"
              >
                SIGN UP NOW
              </Button>
            </Grid>
          </Grid>

          {/*<Button color="primary" onClick={() => {
              this.setState({ showSignUpSuccessModal: true })
          }}>
          Open alert dialog
      </Button>*/}
        </form>
      </Container>
    );
  }
}
RegForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withRouter(
  connect(
    mapStateToProps,
    { registerUser }
  )(RegForm)
);
