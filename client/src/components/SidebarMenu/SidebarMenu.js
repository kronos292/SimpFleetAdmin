import "./SidebarMenu.css";
import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";

import CreateJobModal from "../Job/CreateJobModal";

class SidebarMenu extends Component {
  state = {
    sidebarOpen: true,
    showModal: false,
    showHistory: false
  };

  componentDidMount() {}

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
          {/* this.props.auth.userType !== "Admin" ? ( */}
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
          {/* ) : ( "" )} */}
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
          {/* this.state.showHistory ? ( */}
          <Grid item xs={12}>
            <NavLink to="/history" className="sidebar-link">
              History
            </NavLink>
          </Grid>
          {/* ) : ( "" )} */}
          {/* this.props.auth.userType === "Admin" ? ( */}
          {/* <Grid item xs={12}>
            <NavLink to="/job_assignment" className="sidebar-link">
              Job Assignment
            </NavLink>
          </Grid> */}
          {/* ) : ( "" )} */}
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
export default SidebarMenu;
