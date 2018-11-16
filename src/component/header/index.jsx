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
      changeLan: false,
      lanTran: 5,
      lanOpcation: 0,
      lanStyle: null,
      lanTimer: null,
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
    this.handleMouseEnterChangel = this.handleMouseEnterChangel.bind(this);
    this.handleMouseLeaveChangel = this.handleMouseLeaveChangel.bind(this);
  }
  // test
  handleClick() {
    this.props.dispatch({ type: "ADD_TODO", content: this.state.add });
  }
  handleMouseEnterChangel() {
    this.setState({
      lanTimer: setInterval(() => {
        this.setState({ lanTran: this.state.lanTran - 1 });
        this.setState({ lanOpcation: this.state.lanOpcation + 0.2 });
        if (this.state.lanTran <= 0) {
          clearInterval(this.state.lanTimer);
        }
        this.setState({
          lanStyle: {
            transform: `translateY(${this.state.lanTran}px)`,
            opacity: this.state.lanOpcation
          }
        });
      }, 24)
    });

    this.setState({ changeLan: true });
  }
  handleMouseLeaveChangel() {
    this.setState({ lanTran: 5 });
    this.setState({ lanOpcation: 0 });
    this.setState({
      lanStyle: {
        transform: "translateY(5px)",
        opacity: 0
      }
    });
    clearInterval(this.state.lanTimer);
    this.setState({ changeLan: false });
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
                  // onClick={this.handleClickLogin}
                  onClick={even => this.handleChangePage("login", even)}
                  className="djm-header-login-button"
                >
                  {language.login}
                  <b />
                </li>
                <li
                  onClick={even => this.handleChangePage("register", even)}
                  className="djm-header-register-button"
                >
                  {language.register}
                  <b />
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="djm-header-uesename">
                  <img src={require("./images/logo.png")} alt="headPortrait" />
                  <span>Abel</span>
                  <i className="iconfont icon-triangle" />
                  <ul className="djm-hu-setting">
                    <li>个人信息</li>
                    <li>编辑文章</li>
                    <li onClick={this.handleClickLogout}>{language.logout}</li>
                  </ul>
                </li>
              </React.Fragment>
            )}
            <li
              className="djm-header-change-lan"
              onMouseEnter={this.handleMouseEnterChangel}
              onMouseLeave={this.handleMouseLeaveChangel}
            >
              {language.language[0]}
              <i className="iconfont icon-triangle" />
              {this.state.changeLan ? (
                <ul className="djimu-hcl-button" style={this.state.lanStyle}>
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
              ) : null}
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
