import React from "react";
import { connect } from "react-redux";

import Login from "../login";

import "./header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      add: {
        name: "G",
        age: 20
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
  }
  handleClick() {
    this.props.dispatch({ type: "ADD_TODO", content: this.state.add });
  }
  handleClickLogin() {
    this.props.dispatch({ type: "USER_LOGIN" });
  }
  handleClickRegister() {}
  handleClickLogout() {}
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    return false;
  }
  render() {
    return (
      <header className="djm-header">
        <div className="djm-header-content clearfloat">
          <h1 className="djm-header-logo">
            <img src="" alt="LOGO" />
          </h1>
          <ul className="dim-header-login clearfloat">
            <li
              onClick={this.handleClickLogin}
              className="djm-header-login-button"
            >
              {this.props.language.login}
              <span />
            </li>
            <li
              onClick={this.handleClickRegister}
              className="djm-header-register-button"
            >
              {this.props.language.register}
              <span />
            </li>
            <li
              onClick={this.handleClickLogout}
              className="djm-header-logout-button"
            >
              {this.props.language.logout}
              <span />
            </li>
          </ul>
        </div>
        {this.props.loginStore.login ? <Login /> : null}
      </header>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return state;
}
// function mapDispatchToProps(dispatch) {
//   console.log(dispatch);
//   return dispatch;
// }
export default connect(
  mapStateToProps
  // mapDispatchToProps
)(Header);
