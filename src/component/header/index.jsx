import React from "react";
import { connect } from "react-redux";

import Login from "../login";

import "./header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      language: props.languageStore.language.header,
      islogin: null,
      add: {
        name: "G",
        age: 20
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleChangeLan = this.handleChangeLan.bind(this);
  }
  // test
  handleClick() {
    this.props.dispatch({ type: "ADD_TODO", content: this.state.add });
  }
  handleClickLogin() {
    this.props.dispatch({ type: "USER_LOGIN" });
  }
  handleChangePage(url) {
    this.props.history.push(`/${url}`);
  }
  handleClickLogout() {
    sessionStorage.removeItem("isLogin");
    this.setState({ isLogin: null });
  }
  handleChangeLan(language) {
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
    const language = this.props.languageStore.language.header;
    console.log(language);
    return (
      <header className="djm-header">
        <div className="djm-header-content clearfloat">
          <h1
            className="djm-header-logo"
            onClick={this.handleChangePage.bind(this, "")}
          >
            <img src={require("./images/logo.png")} alt="LOGO" />
          </h1>
          <ul className="dim-header-login clearfloat">
            {!this.state.isLogin ? (
              <React.Fragment>
                <li
                  onClick={this.handleClickLogin}
                  className="djm-header-login-button"
                >
                  {language.login}
                  <span />
                </li>
                <li
                  onClick={even => this.handleChangePage("register", even)}
                  className="djm-header-register-button"
                >
                  {language.register}
                  <span />
                </li>
              </React.Fragment>
            ) : (
              <li
                onClick={this.handleClickLogout}
                className="djm-header-logout-button"
              >
                {language.logout}
                <span />
              </li>
            )}
            <li className="djm-header-change-lan">
              {language.language[0]}
              <i />
              <ul className="djimu-hcl-button">
                {language.language.map((changeLan, index) => (
                  <li
                    key={index}
                    onClick={e => this.handleChangeLan(changeLan, e)}
                    className={index === 0 ? "dont-click" : null}
                  >
                    {changeLan}
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
