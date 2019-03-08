import React from 'react';
import { connect } from 'react-redux';

// import regexFun from "../../public/regex";

import EmailPaw from './emailPaw';
import EmailQuick from './emailQuick';

import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        email: '',
        password: '',
        dynamicCode: '',
      },
      loginWay: true,
      codeNumber: 60,
      codeTime: null,
      error: false,
      errorText: null,
      errorInfo: {
        email: false,
        password: false,
        dynamicCode: false,
      },
    };
    this.handleClickLogin = this.handleClickLogin.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleClickClear = this.handleClickClear.bind(this);
    this.handleClickLoginWay = this.handleClickLoginWay.bind(this);
    this.handleClickDynamicCode = this.handleClickDynamicCode.bind(this);
    this.handleOnBlur = this.handleOnBlur.bind(this);
    this.setUserInfoFun = this.setUserInfoFun.bind(this);
    this.forUserInfo = this.forUserInfo.bind(this);
    this.handleClickJump = this.handleClickJump.bind(this);
  }

  componentWillUnmount() {
    const { codeTime } = this.state;
    if (codeTime) {
      clearInterval(codeTime);
    }
  }

  setUserInfoFun(stateName, element, content) {
    /* eslint-disable */
    if (element === 'dynamicCode' && isNaN(content)) {
      return;
    }
    this.setState(
      Object.assign(this.state[stateName], this.state[stateName], {
        [element]: content,
      }),
    );
    /* eslint-enable */
  }

  forUserInfo() {
    /* eslint-disable */
    for (const key in this.state.userInfo) {
      if (this.state.userInfo[key] === '') {
        if (!this.state.loginWay && key === 'password') {
          continue;
        } else if (this.state.loginWay && key === 'dynamicCode') {
          continue;
        }
        this.setState({ errorText: `${[key]}Null` });
        return false;
      }
      continue;
    }
    /* eslint-enable */
    return true;
  }

  handleClickLogin() {
    const isNull = this.forUserInfo();
    if (isNull) {
      const propsObj = this.props;
      const userInfo = this.state;
      const temporary = JSON.parse(sessionStorage.getItem('router'));
      sessionStorage.setItem('isLogin', true);
      propsObj.dispatch({ type: 'USER_LOGIN' });
      propsObj.dispatch({
        type: 'USER_NAME',
        data: userInfo.email,
      });
      if (temporary[0] === 'register' || temporary[0] === 'forget') {
        propsObj.history.push('/');
      } else {
        propsObj.history.goBack(-1);
      }
    }
  }

  handleOnBlur(element) {
    const { userInfo } = this.state;
    if (userInfo[element] === '') {
      this.forUserInfo();
    }
    // if (!regexFun(element, event.target.value)) {
    //   this.setState({ errorText: [element] + "Text" });
    //   return;
    // }
  }

  handleChangeInput(element, event) {
    this.setUserInfoFun('userInfo', element, event.target.value);
    // if (regexFun(element, event.target.value) && event.target.value === "") {
    //   this.setUserInfoFun("errorInfo", element, true);
    //   this.setState({ errorText: null });
    // } else {
    //   this.setUserInfoFun("errorInfo", element, false);
    // }
    // this.setState({
    //   error:
    //     this.state.errorInfo.email &&
    //     (this.state.errorInfo.password || this.state.errorInfo.dynamicCode)
    // });
  }

  handleClickClear(element) {
    this.setState({ error: false });
    this.setUserInfoFun('userInfo', element, '');
  }

  handleClickLoginWay() {
    const { loginWay } = this.state;
    this.setUserInfoFun('userInfo', 'password', '');
    this.setUserInfoFun('userInfo', 'dynamicCode', '');
    this.setState({ errorText: null });
    this.setState({ error: false });
    this.setState({ loginWay: !loginWay });
  }

  handleClickDynamicCode() {
    this.setState({ codeNumber: 59 });
    this.setState({
      codeTime: setInterval(() => {
        const { codeNumber, codeTime } = this.state;
        this.setState({ codeNumber: codeNumber - 1 });
        if (codeNumber === -1) {
          clearInterval(codeTime);
          this.setState({ codeNumber: 60 });
        }
      }, 1000),
    });
  }

  handleClickJump(pageName) {
    /* eslint-disable */
    this.props.history.push(`/${pageName}`);
    /* eslint-enable */
  }

  render() {
    const { languageStore } = this.props;
    const language = languageStore.language.login;
    const {
      error, errorText, userInfo, loginWay, codeNumber,
    } = this.state;
    return (
      <div className="dji-login">
        <img className="djm-login-bg" src={require('./images/timg.jfif')} alt="" />
        <div className="dji-login-nav">
          <h1 className="djm-login-logo">This is Logo!</h1>
          <p className="djm-login-error-info">{!error ? language.error[errorText] : null}</p>
          <form className="djm-login-from" action="form_action.asp" method="post">
            <label className="djm-login-username" htmlFor="userEmail">
              <input
                id="userEmail"
                value={userInfo.email}
                autoComplete="off"
                type="text"
                placeholder={language.email}
                // ref="userEmail"
                onChange={this.handleChangeInput.bind(this, 'email')}
                onBlur={this.handleOnBlur.bind(this, 'email')}
              />
              <span
                onClick={e => this.handleClickClear('email', e)}
                onKeyDown={e => this.handleClickClear('email', e)}
                role="button"
                tabIndex={0}
                className={`clear-all-value ${userInfo.email ? 'display' : null}`}
                /* eslint-disable */
              >
                x
              </span>
            </label>
            {loginWay ? (
              /* eslint-enable */
              <EmailPaw
                {...this.props}
                changeInput={this.handleChangeInput}
                clearAll={this.handleClickClear}
                userInfo={userInfo}
                handleOnBlur={this.handleOnBlur}
                language={language}
                handleClickJump={this.handleClickJump}
              />
            ) : (
              <EmailQuick
                {...this.props}
                changeInput={this.handleChangeInput}
                clearAll={this.handleClickClear}
                userInfo={userInfo}
                dynamicCode={this.handleClickDynamicCode}
                codeNumber={codeNumber}
                handleOnBlur={this.handleOnBlur}
                language={language}
              />
            )}
            <label className="djm-login-button" htmlFor="loginInput">
              <input
                id="loginInput"
                type="button"
                value={language.loginButton}
                onClick={this.handleClickLogin}
              />
            </label>
          </form>
          <div className="djm-login-footer">
            <span
              onClick={event => this.handleClickJump('register', event)}
              onKeyDown={event => this.handleClickJump('register', event)}
              role="button"
              tabIndex={0}
            >
              {language.goRegister}
            </span>
            <span
              onClick={this.handleClickLoginWay}
              onKeyDown={this.handleClickLoginWay}
              role="button"
              tabIndex={0}
              className="djm-login-email-loginWay"
            >
              {loginWay ? language.emailQuick : language.emailPaw}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Login);
