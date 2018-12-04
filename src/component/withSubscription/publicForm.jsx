import React from "react";
import { connect } from "react-redux";

import regexFun from "../../public/regex";

import "./publicForm.css";

class PublicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputArr: props.data,
      userInfo: {
        email: "",
        password: "",
        againPassword: "",
        newPassword: "",
        dynamicCode: ""
      },
      publicWay: true,
      codeNumber: 60,
      codeTime: null,
      error: false,
      errorText: null,
      errorInfo: {
        email: true,
        password: true,
        againPassword: true,
        newPassword: true,
        dynamicCode: true
      }
    };
    this.handleClickpublic = this.handleClickpublic.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
    this.handleClickDynamicCode = this.handleClickDynamicCode.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.setUserInfoFun = this.setUserInfoFun.bind(this);
    this.forUserInfo = this.forUserInfo.bind(this);
    this.handleClickJump = this.handleClickJump.bind(this);
    this.againPasswordFun = this.againPasswordFun.bind(this);
    this.newPasswordFun = this.newPasswordFun.bind(this);
  }
  handleClickJump(pageName) {
    this.props.history.push(`/${pageName}`);
  }
  setUserInfoFun(stateName, element, content) {
    if (element === "dynamicCode" && (isNaN(content) || content.length > 4)) {
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
      for (const i = 0; i < this.state.inputArr.length; i++) {
        if (
          this.state.userInfo[key] === "" &&
          this.state.inputArr.length[i] === key
        ) {
          this.setState({ errorText: [key] + "Null" });
          return false;
        } else {
          break;
        }
      }
    }
    return true;
  }
  handleClickpublic() {
    const isNull = this.forUserInfo();
    console.log(111);
    if (isNull) {
      console.log(222);
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
    if (element === "againPassword") {
      this.againPasswordFun(event.target.value);
    }
    if (element === "newPasswordFun") {
      this.againPasswordFun(event.target.value);
    }
  }
  againPasswordFun(value) {
    if (value !== this.state.userInfo.password) {
      this.setUserInfoFun("errorInfo", "againPassword", false);
      this.setState({ errorText: "againPasswordText" });
    }
  }
  newPasswordFun(value) {
    if (value === this.state.userInfo.password) {
      this.setUserInfoFun("errorInfo", "newPassword", false);
      this.setState({ errorText: "newPasswordText" });
    }
  }
  handleChangeInput(element, event) {
    this.setUserInfoFun("userInfo", element, event.target.value);
    if (regexFun(element, event.target.value)) {
      if (element === "againPassword") {
        this.againPasswordFun(event.target.value);
      }
      if (element === "newPasswordFun") {
        this.newPasswordFun(event.target.value);
      }
      this.setUserInfoFun("errorInfo", element, true);
      this.setState({ errorText: null });
    } else {
      this.setUserInfoFun("errorInfo", element, false);
    }
    this.setState({
      error:
        this.state.errorInfo.email &&
        this.state.errorInfo.password &&
        this.state.errorInfo.dynamicCode &&
        this.state.errorInfo.againPassword &&
        this.state.errorInfo.newPassword
    });
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
  componentDidMount() {
    const temporary = this.state.inputArr;
    for (let i = 0; i < temporary.length; i++) {
      this.setState(
        Object.assign(this.state.errorInfo, this.state.errorInfo, {
          [temporary[i]]: false
        })
      );
    }
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
      <div className="dji-public">
        <img
          className="djm-public-bg"
          src={require("./images/timg.jfif")}
          alt=""
        />
        <div className="dji-public-nav">
          <h1
            className={`djm-public-logo ${
              this.props.pageName === "register"
                ? "djm-public-logo-register"
                : ""
            }`}
          >
            This is Logo!
          </h1>
          <p className="djm-public-error-info">
            {!this.state.error ? language.error[this.state.errorText] : null}
          </p>
          <form
            className="djm-public-from"
            action="form_action.asp"
            method="post"
          >
            {this.state.inputArr.map((item, index) => (
              <label
                className={`djm-public-${item}`}
                key={index}
                htmlFor={item}
              >
                <input
                  id={item}
                  value={this.state.userInfo[item]}
                  autoComplete="off"
                  type={
                    item === "dynamicCode" || item === "email"
                      ? "text"
                      : "password"
                  }
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
            <label className="djm-public-button" htmlFor="publicInput">
              <input
                id="publicInput"
                type="button"
                disabled={!this.state.error}
                value={language[`${this.props.pageName}Button`]}
                onClick={this.handleClickpublic}
              />
            </label>
          </form>
          <div className="djm-public-footer">
            <span onClick={event => this.handleClickJump("login", event)}>
              {language.goLogin}
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
export default connect(mapStateToProps)(PublicForm);
