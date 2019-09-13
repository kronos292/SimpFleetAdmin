import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import VIP from "./components/common/PrivateRoute";
import ExNavbar from "./components/layout/ExNavbar";
import Footer from "./components/layout/Footer";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

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

class App extends Component {
  state = {
    openMenu: false,
    isPopoverOpen: false
  };

  handleOpenMenu = () => {
    this.setState({ openMenu: true });
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App">
        <Router>
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
            <Route exact path="/register" component={Register} />
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
