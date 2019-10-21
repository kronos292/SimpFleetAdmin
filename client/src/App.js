import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import VIP from "./components/common/PrivateRoute";
import ExNavbar from "./components/layout/ExNavbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import History from "./components/History/History";
import JobAssignment from "./components/Job/JobAssignment/JobAssignment";
import SideMenuSlider from "./components/SideMenuSlider/SideMenuSlider";
import JobDetails from "./components/Job/JobDetails/JobDetails";
import UserApproval from "./components/UserApproval/UserApproval";

class DynamicImport extends Component {
  state = {
    component: null
  };

  componentDidMount() {
    this.props.load().then(component => {
      this.setState(() => ({
        component: component.default ? component.default : component
      }));
    });
  }

  render() {
    return this.props.children(this.state.component);
  }
}
const MainNavbar = props => (
  <DynamicImport load={() => import("./components/layout/MainNavbar.js")}>
    {Component =>
      Component === null ? <p>Loading</p> : <Component {...props} />
    }
  </DynamicImport>
);
const Home = props => (
  <DynamicImport load={() => import("./components/content/Home.js")}>
    {Component =>
      Component === null ? <p>Loading</p> : <Component {...props} />
    }
  </DynamicImport>
);
const Analytics = props => (
  <DynamicImport load={() => import("./components/Analytics/Analytics.js")}>
    {Component =>
      Component === null ? <p>Loading</p> : <Component {...props} />
    }
  </DynamicImport>
);
class App extends Component {
  state = {
    openMenu: false,
    isPopoverOpen: false
  };

  handleMenuStateChange = state => {
    this.setState({ openMenu: state.isOpen });
  };

  handlePopoverOpen = () => {
    this.setState({ isPopoverOpen: true });
  };

  handleOpenMenu = () => {
    this.setState({ openMenu: true });
  };

  handleCloseMenu = () => {
    this.setState({ openMenu: false });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    return (
      <div className="App">
        <Router>
          {isAuthenticated ? (
            <SideMenuSlider
              open={this.state.openMenu}
              handleCloseMenu={this.handleCloseMenu}
              handleMenuStateChange={this.handleMenuStateChange}
              handlePopoverOpen={this.handlePopoverOpen}
            />
          ) : (
            ""
          )}
          <Switch>
            {isAuthenticated ? (
              <Route
                exact
                path="/"
                render={props => (
                  <MainNavbar {...props} handleOpenMenu={this.handleOpenMenu} />
                )}
              />
            ) : (
              <Route exact path="/" component={ExNavbar} />
            )}
            <Route
              path="/"
              render={props => (
                <MainNavbar {...props} handleOpenMenu={this.handleOpenMenu} />
              )}
            />
          </Switch>
          <Route exact path="/" component={Home} />
          <div className="">
            <Route exact path="/login" component={Login} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/history" component={History} />
            <Route
              exact
              path="/job_details"
              render={props => (
                <JobDetails
                  {...props}
                  handlePopoverClose={this.handlePopoverClose}
                  isPopoverOpen={this.state.isPopoverOpen}
                />
              )}
            ></Route>
            {user.userType === "Admin" ? (
              <React.Fragment>
                <Route path="/user_approval" component={UserApproval} />
                <Route exact path="/job_assignment" component={JobAssignment} />
                <Route path="/analytics" component={Analytics} />
              </React.Fragment>
            ) : null}
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);
