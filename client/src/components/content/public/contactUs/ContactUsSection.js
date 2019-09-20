import React, { Component } from "react";
import axios from "axios";

import "./ContactUsSection.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

class ContactUsSection extends Component {
  state = {
    email: "",
    name: "",
    contactNumber: "",
    remarks: ""
  };

  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };

  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };

  handleContactNumberChange = e => {
    this.setState({ contactNumber: e.target.value });
  };

  handleRemarksChange = e => {
    this.setState({ remarks: e.target.value });
  };

  validateUserDetails = () => {
    // Check if Field is empty
    if (this.state.name === "") {
      return "Name is required";
    }

    if (this.state.contactNumber === "") {
      return "Contact Number is required";
    }

    if (this.state.email === "") {
      return "Email is required";
    }

    if (this.state.remarks === "") {
      return "Message is required";
    }

    return "";
  };

  onSubmit = e => {
    e.preventDefault();

    const formData = {
      email: this.state.email,
      name: this.state.name,
      contactNumber: this.state.contactNumber,
      remarks: this.state.remarks
    };

    const error = this.validateUserDetails();
    if (error !== "") {
      window.alert(error);
    } else {
      axios
        .post("/api/users/contact_mail", formData)
        .then(res => {
          window.alert(
            "Contact request successfully submitted! We will get back to you soon."
          );
          this.setState({
            email: "",
            name: "",
            contactNumber: "",
            remarks: ""
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  render() {
    return (
      <div className="contact-padding font-contact">
        <h1 className="section-title">Contact Us</h1>
        <Container>
          <Row>
            <Col md={{ span: 5, offset: 1 }} xs={12}>
              <h6 className="h6-contact">Contact:</h6>
              <a className="hover_underline a-contact" href="tel:+65 8748 0467">
                <p>+65 8748 0467</p>
              </a>
              <br></br>
              <h6 className="h6-contact ">Email:</h6>
              <a
                className="hover_underline a-contact"
                href="mailto:service@simpfleet.com"
              >
                <p>service@simpfleet.com</p>
              </a>
              <br></br>
              <h6 className="h6-contact">Location:</h6>
              <a
                className="hover_underline a-contact"
                href="https://www.google.com/maps/place/PSA+Pasir+Panjang+Terminal+Building+3/@1.2748411,103.7914553,15z/data=!4m2!3m1!1s0x0:0xbe14fc54d013435b"
              >
                <p>PSA Unboxed, Pasir Panjang Terminal Building 3</p>
              </a>
              <br></br>
            </Col>
            <Col md={{ span: 4, offset: 1 }} xs={12}>
              <Container>
                <form onSubmit={this.onSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="name"
                        name="name"
                        variant="outlined"
                        fullWidth
                        id="name"
                        label="Your Name"
                        onChange={this.handleNameChange}
                        value={this.state.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="email-contact"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={this.handleEmailChange}
                        value={this.state.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="phone-contact"
                        label="Contact Number"
                        name="phone"
                        autoComplete="tel"
                        onChange={this.handleContactNumberChange}
                        value={this.state.contactNumber}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        label="Message"
                        multiline
                        rows="4"
                        onChange={this.handleRemarksChange}
                        value={this.state.remarks}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth
                        className="hover contact-button"
                        variant="contained"
                        color="primary"
                        TouchRippleProps={{ className: "ripple-color" }}
                      >
                        SUBMIT
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default ContactUsSection;
