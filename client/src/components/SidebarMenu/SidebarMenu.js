import "./SidebarMenu.css";
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import CreateJobModal from "../Job/CreateJobModal";

class SidebarMenu extends Component {
  state = {
    sidebarOpen: true,
    showModal: false,
    showHistory: false
  };

  componentDidMount() {
    axios
      .get(`/api/jobs?archive_only=true&user_only=true`)
      .then(res => {
        this.setState({
          showHistory: res.data.length >= 1
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div id="sidebar-body">
        <Grid container spacing={3}>
          {/* {this.props.auth.user.userType !== "Admin" ? (
            <Grid item xs={12} className="d-flex justify-content-center">
              <Fab
                variant="extended"
                size="medium"
                className="side-bar-create-job-button"
                onClick={this.handleOpenModal}
              >
                + Create job
              </Fab>
            </Grid>
          ) : (
            ""
          )} */}
          <Grid item xs={12}>
            <NavLink to="/" className="sidebar-link">
              Upcoming Jobs
            </NavLink>
          </Grid>
          <Grid item xs={12}>
            <NavLink to="/dashboard" className="sidebar-link">
              Dashboard
            </NavLink>
          </Grid>
          {this.state.showHistory ? (
            <Grid item xs={12}>
              <NavLink to="/history" className="sidebar-link">
                History
              </NavLink>
            </Grid>
          ) : (
            ""
          )}
          {this.props.auth.user.userType === "Admin" ? (
            <Grid item xs={12}>
              <NavLink to="/job_assignment" className="sidebar-link">
                Job Assignment
              </NavLink>
            </Grid>
          ) : (
            ""
          )}
          {this.props.auth.user.userType === "Admin" ? (
            <Grid item xs={12}>
              <NavLink to="/analytics" className="sidebar-link">
                Analytics
              </NavLink>
            </Grid>
          ) : (
            ""
          )}
          {/*{this.props.auth.user.userType === "Admin" ? (*/}
          {/*  <Grid item xs={12}>*/}
          {/*    <NavLink to="/delivery_schedule" className="sidebar-link">*/}
          {/*      Job Schedule*/}
          {/*    </NavLink>*/}
          {/*  </Grid>*/}
          {/*) : (*/}
          {/*  ""*/}
          {/*)}*/}
          {this.props.auth.user.userType === "Admin" ? (
            <Grid item xs={12}>
              <NavLink to="/user_approval" className="sidebar-link">
                User Approval
              </NavLink>
            </Grid>
          ) : (
            ""
          )}
        </Grid>

        <CreateJobModal
          isOpen={this.state.showModal}
          handleCloseModal={this.handleCloseModal}
          fullScreen={false}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(SidebarMenu));
