import React from "react";
import { connect } from "react-redux";

import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClickLogin = this.handleClickLogin.bind(this);
  }
  handleClickLogin() {
    sessionStorage.setItem("isLogin", true);
    this.props.dispatch({ type: "USER_LOGIN" });
  }
  render() {
    return (
      <div className="dji-login">
        <div className="dji-login-nav">
          <form
            className="djm-login-from"
            action="form_action.asp"
            method="post"
          >
            <label className="djm-login-username" htmlFor="userName">
              <input
                id="userName"
                autoComplete="off"
                type="text"
                placeholder={this.props.login.uesrName}
              />
            </label>
            <label className="djm-login-userpaw" htmlFor="userPassword">
              <input
                id="userPassword"
                autoComplete="off"
                type="paw"
                placeholder={this.props.login.password}
              />
            </label>
            <label className="djm-login-button" htmlFor="loginInput">
              <input
                id="loginInput"
                type="button"
                value={this.props.login.button}
                onClick={this.handleClickLogin}
              />
            </label>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(Login);
