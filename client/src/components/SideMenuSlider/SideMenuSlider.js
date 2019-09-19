import "./SideMenuSlider.css";
import React, { Component } from "react";

import CreateJobModal from "../Job/CreateJobModal";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import { push as Menu } from "react-burger-menu";
import { NavLink, withRouter } from "react-router-dom";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

class SideMenuSlider extends Component {
  state = {
    showHistory: false,
    showModal: false
  };

  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <MediaQuery maxWidth={768}>
        <Menu
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
          customBurgerIcon={false}
          isOpen={this.props.open}
          onStateChange={state => this.props.handleMenuStateChange(state)}
          customCrossIcon={false}
          className="menu-width"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} className="d-flex align-items-center">
              <IconButton
                className="closeButtonMenu ml-auto"
                onClick={this.props.handleCloseMenu}
              >
                <CloseIcon className="closeIconMenu" />
              </IconButton>
            </Grid>
            <Grid item xs={12} className="d-flex justify-content-center">
              <Fab
                variant="extended"
                size="large"
                className="side-bar-create-job-button"
                onClick={this.handleOpenModal}
              >
                <AddIcon style={{ marginRight: "5px" }} fontSize="small" />
                Create job
              </Fab>
            </Grid>
            <Grid item xs={12}>
              <NavLink
                to="/"
                className="sidebar-link"
                onClick={this.props.handleCloseMenu}
              >
                Home
              </NavLink>
            </Grid>
            <Grid item xs={12}>
              <NavLink
                to="/dashboard"
                className="sidebar-link"
                onClick={this.props.handleCloseMenu}
              >
                Dashboard
              </NavLink>
            </Grid>
            <Grid item xs={12}>
              {/* {this.state.showHistory ? ( */}
              <NavLink
                to="/history"
                className="sidebar-link"
                onClick={this.props.handleCloseMenu}
              >
                History
              </NavLink>
              {/* ) : (
                ""
              )} */}
            </Grid>
            <Grid
              item
              xs={12}
              className="d-flex align-items-center justify-content-center"
            >
              <Divider style={{ width: "85%" }} />
            </Grid>
            <Grid item xs={12}>
              <NavLink
                to="/"
                className="sidebar-secondary-link"
                onClick={this.props.handleCloseMenu}
              >
                FAQ
              </NavLink>
            </Grid>
            <Grid item xs={12}>
              <NavLink
                to="/"
                className="sidebar-secondary-link"
                onClick={this.props.handleCloseMenu}
              >
                Setting
              </NavLink>
            </Grid>
            <Grid item xs={12}>
              <NavLink
                to="/"
                className="sidebar-secondary-link"
                onClick={this.onLogoutClick}
              >
                Logout
              </NavLink>
            </Grid>
          </Grid>
        </Menu>
        <CreateJobModal
          isOpen={this.state.showModal}
          fullScreen={true}
          handleCloseModal={this.handleCloseModal}
          handlePopoverOpen={this.props.handlePopoverOpen}
          handleCloseMenu={this.props.handleCloseMenu}
        />
      </MediaQuery>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

export default withRouter(connect(mapStateToProps)(SideMenuSlider));
