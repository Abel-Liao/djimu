import React from "react";
import { connect } from "react-redux";

import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: ""
    };
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
  }
  handleClickLogin() {
    sessionStorage.setItem("isLogin", true);
    this.props.dispatch({ type: "USER_LOGIN" });
  }
  handleChangeInput(element, event) {
    this.setState({ [element]: event.target.value });
  }
  handleClickClear(element) {
    this.setState({ [element]: "" });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
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
                value={this.state.userName}
                autoComplete="off"
                type="text"
                placeholder={this.props.login.uesrName}
                ref="userName"
                onChange={this.handleChangeInput.bind(this, "userName")}
              />
              <span
                onClick={e => this.handleClickClear("userName", e)}
                className={this.state.userName ? "display" : null}
              >
                x
              </span>
            </label>
            <label className="djm-login-userpaw" htmlFor="userPassword">
              <input
                id="userPassword"
                value={this.state.password}
                autoComplete="off"
                type="password"
                placeholder={this.props.login.password}
                ref="password"
                onChange={this.handleChangeInput.bind(this, "password")}
              />
              <span
                onClick={e => this.handleClickClear("password", e)}
                className={this.state.password ? "display" : null}
              >
                x
              </span>
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
