import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAction";
import Typography from "@material-ui/core/Typography";
import { NavLink, Redirect } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Grid, Paper, TextField } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Container, Row, Col, Form } from "reactstrap";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import "./Login.css";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      rememberMe: false,
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
      if (
        localStorage.getItem("checked") &&
        localStorage.getItem("checked") !== ""
      ) {
        this.setState({
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
          rememberMe: true
        });
      }
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
    if (this.state.rememberMe) {
      localStorage.setItem("checked", "checked");
      localStorage.setItem("email", this.state.email);
      localStorage.setItem("password", this.state.password);
    } else {
      localStorage.setItem("checked", "");
    }
    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onChecked = e => {
    this.setState({ rememberMe: e.target.checked });
  };
  renderContent = () => {
    const { errors } = this.state;
    switch (this.props.auth.isAuthenticated) {
      case false:
        return (
          <Container fluid className="signin-background">
            <Row>
              <Col xs="12" md={{ size: 10, offset: 1 }}>
                <Row>
                  <Col md={{ size: 4, offset: 4 }}>
                    <Paper className="signin-top">
                      <Form onSubmit={this.onSubmit}>
                        <Grid container spacing={0}>
                          <Grid item xs={12}>
                            <h2 className="text-center signin-title">Log In</h2>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              name="email"
                              type="email"
                              value={this.state.email}
                              onChange={this.onChange}
                              variant="outlined"
                              fullWidth
                              id="email-login"
                              label="Email Address"
                              autoComplete="email"
                              autoFocus
                            />
                            <Typography
                              variant="caption"
                              display="block"
                              style={{ color: "red" }}
                            >
                              {errors.email}
                            </Typography>
                            <TextField
                              variant="outlined"
                              margin="normal"
                              name="password"
                              type="password"
                              value={this.state.password}
                              onChange={this.onChange}
                              fullWidth
                              label="Password"
                              id="password"
                              autoComplete="current-password"
                              helperText=""
                            />
                            <Typography
                              variant="caption"
                              display="block"
                              style={{ color: "red" }}
                            >
                              {errors.password}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  onChange={this.onChecked}
                                  checked={this.state.rememberMe}
                                  color="primary"
                                />
                              }
                              label="Remember me"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              className="button-text"
                            >
                              Sign In
                            </Button>
                          </Grid>
                          <Grid item xs={12}>
                            <p className="text-center signin-forget">
                              <NavLink to="/password_reset" className="link">
                                Forgot Password?
                              </NavLink>
                            </p>
                          </Grid>
                        </Grid>
                      </Form>
                    </Paper>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        );
      case null:
        return <Redirect to="/" />;
    }
  };
  render() {
    const theme = createMuiTheme({
      palette: {
        primary: {
          main: "#49AE4B"
        }
      }
    });

    return (
      <ThemeProvider theme={theme}>
        <div>{this.renderContent()}</div>
      </ThemeProvider>
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
