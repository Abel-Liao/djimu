import React from "react";
import { connect } from "react-redux";

import regexFun from "../../public/regex";

import EmailPaw from "./emailPaw";
import EmailQuick from "./emailQuick";

import "./login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: "",
        password: "",
        dynamicCode: ""
      },
      loginWay: true,
      codeNumber: 60,
      codeTime: null,
      error: false,
      errorText: null,
      errorInfo: {
        email: false,
        password: false,
        dynamicCode: false
      }
    };
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
    this.handleClickLoginWay = this.handleClickLoginWay.bind(this);
    this.handleClickDynamicCode = this.handleClickDynamicCode.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.setUserInfoFun = this.setUserInfoFun.bind(this);
    this.forUserInfo = this.forUserInfo.bind(this);
  }
  setUserInfoFun(stateName, element, content) {
    this.setState(
      Object.assign(this.state[stateName], this.state[stateName], {
        [element]: content
      })
    );
  }
  forUserInfo() {
    for (const key in this.state.userInfo) {
      if (this.state.userInfo[key] === "") {
        if (!this.state.loginWay && key === "password") {
          continue;
        } else if (this.state.loginWay && key === "dynamicCode") {
          continue;
        }
        this.setState({ errorText: [key] + "Null" });
        return false;
      } else {
        continue;
      }
    }
    return true;
  }
  handleClickLogin() {
    const isNull = this.forUserInfo();
    if (isNull) {
      sessionStorage.setItem("isLogin", true);
      this.props.history.push("/");
    }
  }
  handleOnBlur(element, event) {
    if (this.state.userInfo[element] === "") {
      this.forUserInfo();
      return;
    }
    if (!regexFun(element, event.target.value)) {
      this.setState({ errorText: [element] + "Text" });
      return;
    }
  }
  handleChangeInput(element, event) {
    this.setUserInfoFun("userInfo", element, event.target.value);
    if (regexFun(element, event.target.value) && event.target.value === "") {
      this.setUserInfoFun("errorInfo", element, true);
      this.setState({ errorText: null });
    } else {
      this.setUserInfoFun("errorInfo", element, false);
    }
    this.setState({
      error:
        this.state.errorInfo.email &&
        (this.state.errorInfo.password || this.state.errorInfo.dynamicCode)
    });
  }
  handleClickClear(element) {
    this.setState({ error: false });
    this.setUserInfoFun("userInfo", element, "");
  }
  handleClickLoginWay() {
    this.setUserInfoFun("userInfo", "password", "");
    this.setUserInfoFun("userInfo", "dynamicCode", "");
    this.setState({ errorText: null });
    this.setState({ error: false });
    this.setState({ loginWay: !this.state.loginWay });
  }
  handleClickDynamicCode() {
    this.setState({ codeNumber: 59 });
    this.setState({
      codeTime: setInterval(() => {
        this.setState({ codeNumber: this.state.codeNumber - 1 });
        if (this.state.codeNumber === -1) {
          clearInterval(this.state.codeTime);
          this.setState({ codeNumber: 60 });
        }
      }, 1000)
    });
  }
  componentWillUnmount() {
    clearInterval(this.state.codeTime);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }
  render() {
    const language = this.props.languageStore.language.login;
    return (
      <div className="dji-login">
        <div className="dji-login-nav">
          <h1 className="djm-login-logo">This is Logo!</h1>
          <p className="djm-login-error-info">
            {!this.state.error ? language.error[this.state.errorText] : null}
          </p>
          <form
            className="djm-login-from"
            action="form_action.asp"
            method="post"
          >
            <label className="djm-login-username" htmlFor="userEmail">
              <input
                id="userEmail"
                value={this.state.userInfo.email}
                autoComplete="off"
                type="text"
                placeholder={language.uesrName}
                ref="userEmail"
                onChange={this.handleChangeInput.bind(this, "email")}
                onBlur={this.handleOnBlur.bind(this, "email")}
              />
              <span
                onClick={e => this.handleClickClear("email", e)}
                className={this.state.userInfo.email ? "display" : null}
              >
                x
              </span>
            </label>
            {this.state.loginWay ? (
              <EmailPaw
                {...this.props}
                changeInput={this.handleChangeInput}
                clearAll={this.handleClickClear}
                userInfo={this.state.userInfo}
                handleOnBlur={this.handleOnBlur}
              />
            ) : (
              <EmailQuick
                {...this.props}
                changeInput={this.handleChangeInput}
                clearAll={this.handleClickClear}
                userInfo={this.state.userInfo}
                dynamicCode={this.handleClickDynamicCode}
                codeNumber={this.state.codeNumber}
                handleOnBlur={this.handleOnBlur}
              />
            )}
            <label className="djm-login-button" htmlFor="loginInput">
              <input
                // className={this.state.error ? null : "dont-click"}
                id="loginInput"
                type="button"
                value={language.button}
                onClick={this.handleClickLogin}
              />
            </label>
          </form>
          <div className="djm-login-footer">
            <span className="djm-login-forget">{language.forgetPaw}</span>
            <span
              onClick={this.handleClickLoginWay}
              className="djm-login-email-l"
            >
              {this.state.loginWay ? language.emailQuick : language.emailPaw}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(Login);
