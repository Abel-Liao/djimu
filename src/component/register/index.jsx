import React from "react";
import { connect } from "react-redux";

import regexFun from "../../public/regex";

import "./register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputArr: ["email", "password", "dynamicCode"],
      userInfo: {
        email: "",
        password: "",
        dynamicCode: ""
      },
      registerWay: true,
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
    this.handleClickregister = this.handleClickregister.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
    this.handleClickDynamicCode = this.handleClickDynamicCode.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.setUserInfoFun = this.setUserInfoFun.bind(this);
    this.forUserInfo = this.forUserInfo.bind(this);
  }
  setUserInfoFun(stateName, element, content) {
    if (element === "dynamicCode" && isNaN(content)) {
      return;
    }
    this.setState(
      Object.assign(this.state[stateName], this.state[stateName], {
        [element]: content
      })
    );
  }
  forUserInfo() {
    for (const key in this.state.userInfo) {
      if (this.state.userInfo[key] === "") {
        this.setState({ errorText: [key] + "Null" });
        return false;
      }
    }
    return true;
  }
  handleClickregister() {
    const isNull = this.forUserInfo();
    if (isNull) {
      // this.props.history.push("/");
      this.props.history.goBack(-1);
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
    if (regexFun(element, event.target.value)) {
      this.setUserInfoFun("errorInfo", element, true);
      this.setState({ errorText: null });
      this.setState({
        error:
          this.state.errorInfo.email &&
          this.state.errorInfo.password &&
          this.state.errorInfo.dynamicCode
      });
    } else {
      this.setUserInfoFun("errorInfo", element, false);
    }
  }
  handleClickClear(element) {
    this.setState({ error: false });
    this.setUserInfoFun("userInfo", element, "");
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
      <div className="dji-register">
        <img
          className="djm-register-bg"
          src={require("./images/timg.jfif")}
          alt=""
        />
        <div className="dji-register-nav">
          <h1 className="djm-register-logo">This is Logo!</h1>
          <p className="djm-register-error-info">
            {!this.state.error ? language.error[this.state.errorText] : null}
          </p>
          <form
            className="djm-register-from"
            action="form_action.asp"
            method="post"
          >
            {this.state.inputArr.map((item, index) => (
              <label
                className={`djm-register-${item}`}
                key={index}
                htmlFor={item}
              >
                <input
                  id={item}
                  value={this.state.userInfo[item]}
                  autoComplete="off"
                  type={item !== "password" ? "text" : "password"}
                  placeholder={language[item]}
                  onChange={this.handleChangeInput.bind(this, item)}
                  onBlur={this.handleOnBlur.bind(this, item)}
                />
                <span
                  onClick={e => this.handleClickClear(item, e)}
                  className={this.state.userInfo[item] ? "display" : null}
                >
                  x
                </span>
                {item === "dynamicCode" ? (
                  <p
                    className={
                      this.state.codeNumber === 60 ? null : "dont-click"
                    }
                    onClick={this.handleClickDynamicCode}
                  >
                    {this.state.codeNumber === 60
                      ? language.sendDynamicCode
                      : this.state.codeNumber + " S"}
                  </p>
                ) : null}
              </label>
            ))}
            <label className="djm-register-button" htmlFor="registerInput">
              <input
                id="registerInput"
                type="button"
                disabled={!this.state.error}
                value={language.registerButton}
                onClick={this.handleClickregister}
              />
            </label>
          </form>
          {/* <div className="djm-register-footer">
            <span className="djm-register-forget">{language.forgetPaw}</span>
          </div> */}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(Register);
