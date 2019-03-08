import React from 'react';
import { connect } from 'react-redux';

import './header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: sessionStorage.getItem('userName'),
      language: null,
      isLogin: sessionStorage.getItem('isLogin'),
      changeLan: false,
      lanTran: 5,
      lanOpcation: 0,
      lanStyle: null,
      lanTimer: null,
    };
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleClickLogout = this.handleClickLogout.bind(this);
    this.handleChangeLan = this.handleChangeLan.bind(this);
    this.handleMouseEnterChangel = this.handleMouseEnterChangel.bind(this);
    this.handleMouseLeaveChangel = this.handleMouseLeaveChangel.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const isLogin = sessionStorage.getItem('isLogin');
    if (prevState.isLogin !== isLogin) {
      return { isLogin: false };
    }
    if (
      nextProps.loginStore.userName !== prevState.userName
      && nextProps.loginStore.userName !== null
    ) {
      return { userName: nextProps.loginStore.userName };
    }
    if (prevState.language !== nextProps.languageStore.language.header) {
      return { language: nextProps.languageStore.language.header };
    }
    return null;
  }

  handleMouseEnterChangel() {
    this.setState({
      lanTimer: setInterval(() => {
        const { lanTran, lanOpcation, lanTimer } = this.state;
        this.setState({ lanTran: lanTran - 1 });
        this.setState({ lanOpcation: lanOpcation + 0.2 });
        if (lanTran <= 0) {
          clearInterval(lanTimer);
        }
        this.setState({
          lanStyle: {
            transform: `translateY(${lanTran}px)`,
            opacity: lanOpcation,
          },
        });
      }, 24),
    });

    this.setState({ changeLan: true });
  }

  handleMouseLeaveChangel() {
    this.setState({ lanTran: 5 });
    this.setState({ lanOpcation: 0 });
    this.setState({
      lanStyle: {
        transform: 'translateY(5px)',
        opacity: 0,
      },
    });
    const { lanTimer } = this.state;
    if (lanTimer) {
      clearInterval(lanTimer);
    }
    this.setState({ changeLan: false });
  }

  handleClickLogin() {
    const propsObj = this.props;
    propsObj.dispatch({ type: 'USER_LOGIN' });
  }

  handleChangePage(url) {
    const propsObj = this.props;
    propsObj.history.push(`/${url}`);
  }

  handleClickLogout() {
    sessionStorage.clear();
    const propsObj = this.props;
    propsObj.dispatch({ type: 'USER_LOGIN' });
    this.setState({ isLogin: false });
  }

  handleChangeLan(language) {
    const propsObj = this.props;
    propsObj.dispatch({ type: 'CHANGE_LAN', language });
  }

  render() {
    const propsObj = this.props;
    const language = propsObj.languageStore.language.header;
    const {
      isLogin, userName, changeLan, lanStyle,
    } = this.state;
    return (
      <header className="djm-header">
        <div className="djm-header-content clearfloat">
          <h1 className="djm-header-logo">
            <span
              onClick={this.handleChangePage.bind(this, '')}
              onKeyDown={this.handleChangePage.bind(this, '')}
              role="button"
              tabIndex={0}
            >
              <img src={require('./images/logo.png')} alt="LOGO" />
            </span>
          </h1>
          <ul className="dim-header-login clearfloat">
            {!isLogin ? (
              <React.Fragment>
                <li className="djm-header-login-button">
                  <span
                    onClick={event => this.handleChangePage('login', event)}
                    onKeyDown={event => this.handleChangePage('login', event)}
                    role="button"
                    tabIndex={0}
                  >
                    {language.login}
                  </span>
                  <b />
                </li>
                <li className="djm-header-register-button">
                  <span
                    onClick={event => this.handleChangePage('register', event)}
                    onKeyDown={event => this.handleChangePage('register', event)}
                    role="button"
                    tabIndex={0}
                  >
                    {language.register}
                  </span>
                  <b />
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="djm-header-uesename">
                  <img src={require('./images/logo.png')} alt="headPortrait" />
                  <span>{userName}</span>
                  <i className="iconfont icon-triangle" />
                  <ul className="djm-hu-setting">
                    <li>
                      <span
                        onClick={eventt => this.handleChangePage('information', eventt)}
                        onKeyDown={event => this.handleChangePage('information', event)}
                        role="button"
                        tabIndex={0}
                      >
                        {language.MyProfile}
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={eventt => this.handleChangePage('myarticle', eventt)}
                        onKeyDown={event => this.handleChangePage('myarticle', event)}
                        role="button"
                        tabIndex={0}
                      >
                        {language.MyArticle}
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={eventt => this.handleChangePage('edit', eventt)}
                        onKeyDown={event => this.handleChangePage('edit', event)}
                        role="button"
                        tabIndex={0}
                      >
                        {language.EditArticles}
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={(eventt) => {
                          this.handleClickLogout(eventt);
                          this.handleChangePage('', eventt);
                        }}
                        onKeyDown={(eventt) => {
                          this.handleClickLogout(eventt);
                          this.handleChangePage('', eventt);
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        {language.logout}
                      </span>
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
              {changeLan ? (
                <ul className="djimu-hcl-button" style={lanStyle}>
                  {language.language.map((changeLang, index) => (
                    <li key={changeLang} className={index === 0 ? 'dont-click' : null}>
                      <span
                        onClick={e => this.handleChangeLan(changeLang, e)}
                        onKeyDown={event => this.handleChangeLan('changeLang', event)}
                        role="button"
                        tabIndex={0}
                      >
                        {changeLang}
                      </span>
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
function mapStateToProps(state) {
  return state;
}
// function mapDispatchToProps(dispatch) {
//   console.log(dispatch);
//   return dispatch;
// }
export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Header);
