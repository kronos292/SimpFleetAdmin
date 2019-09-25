import React, { Component } from "react";
import { Collapse, NavbarToggler, Nav, NavItem, NavLink } from "reactstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAction";
import { Image, Navbar } from "react-bootstrap";
import MenuIcon from "@material-ui/icons/MenuRounded";
import "./MainNavbar.css";
import MediaQuery from "react-responsive";
import AvatarIco from "./AvatarIco";
import IconButton from "@material-ui/core/IconButton";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

class MainNavbar extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      transparent: false,
      showDropdown: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
      transparent: !this.state.transparent
    });
  };
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  handleAvatarMenuToggle = () => {
    this.setState({ showDropdown: !this.state.showDropdown });
  };

  renderContent = () => {
    const { user, isAuthenticated } = this.props.auth;
    switch (isAuthenticated) {
      case false:
        return (
          <div className="ml-auto">
            <MediaQuery minWidth={767}>
              <NavbarToggler onClick={this.toggle} />
              <Collapse
                isOpen={this.state.isOpen}
                className="collapse navbar-collapse"
                id="navbarCollapse"
              >
                <Nav className="navbar-nav mr-auto">
                  <NavItem>
                    <NavLink
                      href="/login"
                      onClick={e => {
                        e.preventDefault();
                        this.props.history.push("/login");
                        this.setState({ isOpen: false });
                      }}
                      style={
                        !this.state.transparent || this.state.isOpen
                          ? { color: "#48af4a" }
                          : { color: "#48af4a" }
                      }
                    >
                      Login
                    </NavLink>
                  </NavItem>
                </Nav>
                <form className="form-inline mt-2 mt-md-0">
                  <button
                    onClick={e => this.props.history.push("/sign_up")}
                    className="btn btn-outline-success my-2 my-sm-0"
                    type="button"
                  >
                    Join Our Platform
                  </button>
                </form>
              </Collapse>
            </MediaQuery>
          </div>
        );
      default:
        return (
          <div className="ml-auto">
            <MediaQuery minWidth={767}>
              <NavbarToggler onClick={this.toggle} />
              <Collapse
                isOpen={this.state.isOpen}
                className="collapse navbar-collapse"
                id="navbarCollapse"
              >
                <Nav className="navbar-nav ml-auto">
                  <form className="form-inline mt-2 mt-md-0">
                    {/*<SearchBar user_only={true}/>*/}
                    <div>
                      <Dropdown
                        as={NavItem}
                        show={this.state.showDropdown}
                        onClick={this.handleAvatarMenuToggle}
                        alignRight={true}
                      >
                        <Dropdown.Toggle as={AvatarIco} />
                        <Dropdown.Menu alignRight className="avatar-dropdown">
                          <Dropdown.Header
                            style={{ marginBottom: "4px", marginTop: "4px" }}
                          >
                            <div className="d-flex align-items-center">
                              <AvatarIco />
                              <div className="d-flex flex-column">
                                <strong>{user.firstName}</strong>
                                {user.email}
                              </div>
                            </div>
                          </Dropdown.Header>
                          {/*<Dropdown.Item as={NavLink} href="#" onClick={(e) => {*/}
                          {/*    this.props.history.push('/');*/}
                          {/*}} className='header-avatar-icon-nav-link'>Home</Dropdown.Item>*/}
                          <Dropdown.Divider style={{ marginBottom: "0px" }} />
                          <Dropdown.Header>
                            <div className="d-flex">
                              <Button
                                onClick={this.onLogoutClick.bind(this)}
                                variant="secondary"
                                className="ml-auto logout-btn"
                              >
                                Sign Out
                              </Button>
                            </div>
                          </Dropdown.Header>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </form>
                </Nav>
              </Collapse>
            </MediaQuery>
            <MediaQuery maxWidth={766}>
              {/*<IconButton style={{marginRight: '10px'}}>*/}
              {/*    <SearchIcon fontSize='large'/>*/}
              {/*</IconButton>*/}
              <div></div>
            </MediaQuery>
          </div>
        );
    }
  };
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <Navbar expand="md" className="nav-bar">
        <MediaQuery maxWidth={768}>
          {isAuthenticated ? (
            <IconButton
              style={{ marginLeft: "5px" }}
              onClick={this.props.handleOpenMenu}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          ) : (
            ""
          )}
        </MediaQuery>
        <Navbar.Brand
          href="#"
          onClick={e => {
            e.preventDefault();
            this.props.history.push("/");
          }}
        >
          <Image className="logo" src="../../../images/logo.jpg" />
        </Navbar.Brand>
        {this.renderContent()}
      </Navbar>
    );
  }
}

MainNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(MainNavbar));
