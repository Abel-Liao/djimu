import React from "react";
import { connect } from "react-redux";

import Login from "../login";

import "./header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      language: this.props.language.header,
      islogin: null,
      add: {
        name: "G",
        age: 20
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleClickRegister = this.handleClickRegister.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleClickChange = this.handleClickChange.bind(this);
  }
  handleClick() {
    this.props.dispatch({ type: "ADD_TODO", content: this.state.add });
  }
  handleClickLogin() {
    this.props.dispatch({ type: "USER_LOGIN" });
  }
  handleClickRegister() {}
  handleClickLogout() {
    sessionStorage.removeItem("isLogin");
    this.setState({ isLogin: null });
  }
  handleClickChange(language) {
    this.props.dispatch({ type: "CHANGE_LAN", language: language });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const isLogin = sessionStorage.getItem("isLogin");
    if (prevState.islogin !== isLogin) {
      return {
        isLogin: isLogin
      };
    }
    return null;
  }
  render() {
    return (
      <header className="djm-header">
        <div className="djm-header-content clearfloat">
          <h1 className="djm-header-logo">
            <img src={require("./images/logo.png")} alt="LOGO" />
          </h1>
          <ul className="dim-header-login clearfloat">
            {!this.state.isLogin ? (
              <React.Fragment>
                <li
                  onClick={this.handleClickLogin}
                  className="djm-header-login-button"
                >
                  {this.state.language.login}
                  <span />
                </li>
                <li
                  onClick={this.handleClickRegister}
                  className="djm-header-register-button"
                >
                  {this.state.language.register}
                  <span />
                </li>
              </React.Fragment>
            ) : (
              <li
                onClick={this.handleClickLogout}
                className="djm-header-logout-button"
              >
                {this.state.language.logout}
                <span />
              </li>
            )}
            <li className="djm-header-change-lan">
              {this.state.language.language[0]}
              <i />
              <ul className="djimu-hcl-button">
                {this.state.language.language.map((language, index) => (
                  <li
                    key={index}
                    // onClick={e => this.handleClickChange(language, e)}
                    onClick={event => {
                      this.handleClickChange(language, event);
                      this.props.languageFun();
                    }}
                    className={index === 0 ? "dont-click" : null}
                  >
                    {language}
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
        {this.props.loginStore.login ? (
          <Login {...this.props.language} />
        ) : null}
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
