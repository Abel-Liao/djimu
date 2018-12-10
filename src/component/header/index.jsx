import React from "react";
import { connect } from "react-redux";

import "./header.css";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.loginStore.userName || sessionStorage.getItem("userName"),
      num: 1,
      language: props.languageStore.language.header,
      isLogin: sessionStorage.getItem("isLogin"),
      changeLan: false,
      lanTran: 5,
      lanOpcation: 0,
      lanStyle: null,
      lanTimer: null
    };
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleChangeLan = this.handleChangeLan.bind(this);
    this.handleMouseEnterChangel = this.handleMouseEnterChangel.bind(this);
    this.handleMouseLeaveChangel = this.handleMouseLeaveChangel.bind(this);
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
    sessionStorage.clear();
    this.props.dispatch({ type: "USER_LOGIN" });
    this.setState({ isLogin: false });
  }
  handleChangeLan(language) {
    this.props.dispatch({ type: "CHANGE_LAN", language: language });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    const isLogin = sessionStorage.getItem("isLogin");
    if (prevState.isLogin !== isLogin) {
      return { isLogin: false };
    }
    if (
      nextProps.loginStore.userName !== prevState.userName &&
      nextProps.loginStore.userName !== null
    ) {
      return { userName: nextProps.loginStore.userName };
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
                  onClick={event => this.handleChangePage("login", event)}
                  className="djm-header-login-button"
                >
                  {language.login}
                  <b />
                </li>
                <li
                  onClick={event => this.handleChangePage("register", event)}
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
                  <span>{this.state.userName}</span>
                  <i className="iconfont icon-triangle" />
                  <ul className="djm-hu-setting">
                    <li
                      onClick={eventt =>
                        this.handleChangePage("information", eventt)
                      }
                    >
                      {language.MyProfile}
                    </li>
                    <li
                      onClick={eventt =>
                        this.handleChangePage("myarticle", eventt)
                      }
                    >
                      {language.MyArticle}
                    </li>
                    <li>{language.EditArticles}</li>
                    <li
                      onClick={eventt => {
                        this.handleClickLogout(eventt);
                        this.handleChangePage("", eventt);
                      }}
                    >
                      {language.logout}
                    </li>
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
          <p className="djm-header-search">
            <input
              type="text"
              placeholder={language.placeholder}
              onClick={this.handleClickSearch}
            />
            <i className="iconfont icon-search" />
          </p>
        </div>
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
