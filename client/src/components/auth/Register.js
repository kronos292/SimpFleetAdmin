import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Col, Row, Container } from "reactstrap";
import { connect } from "react-redux";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { Paper } from "@material-ui/core";

import RegForm from "../content/public/regForm/regForm";
import "./Register.css";
class Register extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
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
        <Container fluid className="signup-background">
          <Row>
            <Col md={{ size: 4, offset: 4 }}>
              <Paper className="signup-paper-top">
                <RegForm />
              </Paper>
              <Paper>
                <p className="text-center signup">
                  Have an account?{" "}
                  <NavLink to="/login" className="link">
                    {" "}
                    Login
                  </NavLink>
                </p>
              </Paper>
            </Col>
          </Row>
        </Container>
      </ThemeProvider>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Register);
