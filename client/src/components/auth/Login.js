import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="login">
        <br />
        <div className="col-md-4 offset-md-4">
          <div id="formContent">
            <div class="first">
              <h2 class="my-5">Log In</h2>
            </div>

            <form>
              <input
                type="email"
                id="email"
                class="second zero-raduis"
                name="email"
                placeholder="Email Address"
              />
              <input
                type="text"
                id="password"
                class="third zero-raduis"
                name="login"
                placeholder="Password"
              />
              <div id="formFooter">
                <a class="underlineHover" href="#">
                  Forgot Password?
                </a>
              </div>
              <input type="submit" class="fourth zero-raduis" value="Sign In" />
              <h2>You don't have a account ?</h2>
              <input
                type="button"
                class="fourth zero-raduis pc"
                value="register"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Login;
