import React from 'react';
import { connect } from 'react-redux';

import regexFun from '../../public/regex';

import './publicForm.css';

class PublicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputArr: null,
      userInfo: {
        email: '',
        password: '',
        againPassword: '',
        newPassword: '',
        dynamicCode: '',
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
        dynamicCode: true,
      },
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

  componentDidMount() {
    const { inputArr, errorInfo } = this.state;
    for (let i = 0; i < inputArr.length; i += 1) {
      this.setState(
        Object.assign(errorInfo, errorInfo, {
          [inputArr[i]]: false,
        }),
      );
    }
  }

  componentWillUnmount() {
    const { codeTime } = this.state;
    if (codeTime) {
      clearInterval(codeTime);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data !== prevState.inputArr) {
      return { inputArr: nextProps.data };
    }
    return null;
  }

  setUserInfoFun(stateName, element, content) {
    /* eslint-disable */
    if (element === 'dynamicCode' && (isNaN(content) || content.length > 4)) {
      return;
    }
    this.setState(
      Object.assign(this.state[stateName], this.state[stateName], {
        [element]: content,
      }),
    );
    /* eslint-enable */
  }

  handleClickJump(pageName) {
    const propsObj = this.props;
    propsObj.history.push(`/${pageName}`);
  }

  forUserInfo() {
    /* eslint-disable */
    for (const key in this.state.userInfo) {
      for (let i = 0; i < this.state.inputArr.length; i += 1) {
        if (this.state.userInfo[key] === '' && this.state.inputArr.length[i] === key) {
          this.setState({ errorText: `${[key]}Null` });
          return false;
        }
        break;
      }
    }
    /* eslint-enable */
    return true;
  }

  handleClickpublic() {
    const isNull = this.forUserInfo();
    if (isNull) {
      const propsObj = this.props;
      // this.props.history.push("/");
      propsObj.history.goBack(-1);
    }
  }

  handleOnBlur(element, event) {
    const { userInfo } = this.state;
    if (userInfo[element] === '') {
      this.forUserInfo();
      return;
    }
    if (!regexFun(element, event.target.value)) {
      this.setState({ errorText: `${[element]}Text` });
      return;
    }
    if (element === 'againPassword') {
      this.againPasswordFun(event.target.value);
    }
    if (element === 'newPasswordFun') {
      this.againPasswordFun(event.target.value);
    }
  }

  againPasswordFun(value) {
    const { userInfo } = this.state;
    if (value !== userInfo.password) {
      this.setUserInfoFun('errorInfo', 'againPassword', false);
      this.setState({ errorText: 'againPasswordText' });
    }
  }

  newPasswordFun(value) {
    const { userInfo } = this.state;
    if (value === userInfo.password) {
      this.setUserInfoFun('errorInfo', 'newPassword', false);
      this.setState({ errorText: 'newPasswordText' });
    }
  }

  handleChangeInput(element, event) {
    this.setUserInfoFun('userInfo', element, event.target.value);
    if (regexFun(element, event.target.value)) {
      if (element === 'againPassword') {
        this.againPasswordFun(event.target.value);
      }
      if (element === 'newPasswordFun') {
        this.newPasswordFun(event.target.value);
      }
      this.setUserInfoFun('errorInfo', element, true);
      this.setState({ errorText: null });
    } else {
      this.setUserInfoFun('errorInfo', element, false);
    }
    const { errorInfo } = this.state;
    this.setState({
      error:
        errorInfo.email
        && errorInfo.password
        && errorInfo.dynamicCode
        && errorInfo.againPassword
        && errorInfo.newPassword,
    });
  }

  handleClickClear(element) {
    this.setState({ error: false });
    this.setUserInfoFun('userInfo', element, '');
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

  render() {
    const propsObj = this.props;
    const language = propsObj.languageStore.language.login;
    const {
      errorText, error, inputArr, userInfo, codeNumber, pageName,
    } = this.state;
    return (
      <div className="dji-public">
        <img className="djm-public-bg" src={require('./images/timg.jfif')} alt="" />
        <div className="dji-public-nav">
          <h1
            className={`djm-public-logo ${
              propsObj.pageName === 'register' ? 'djm-public-logo-register' : ''
            }`}
            /* eslint-disable */
          >
            This is Logo!
          </h1>
          <p className="djm-public-error-info">{!error ? language.error[errorText] : null}</p>
          <form className="djm-public-from" action="form_action.asp" method="post">
            {inputArr.map(item => (
              /* eslint-enable */
              <label className={`djm-public-${item}`} key={item} htmlFor={item}>
                <input
                  id={item}
                  value={userInfo[item]}
                  autoComplete="off"
                  type={item === 'dynamicCode' || item === 'email' ? 'text' : 'password'}
                  placeholder={language[item]}
                  onChange={this.handleChangeInput.bind(this, item)}
                  onBlur={this.handleOnBlur.bind(this, item)}
                />
                <span
                  onClick={e => this.handleClickClear(item, e)}
                  onKeyDown={e => this.handleClickClear(item, e)}
                  role="button"
                  tabIndex={0}
                  className={userInfo[item] ? 'display' : null}
                  /* eslint-disable */
                >
                  x
                </span>
                {item === 'dynamicCode' ? (
                  <p
                    className={codeNumber === 60 ? null : 'dont-click'}
                    onClick={this.handleClickDynamicCode}
                    onKeyDown={this.handleClickDynamicCode}
                    role="button"
                    tabIndex={0}
                    /* eslint-enable */
                  >
                    {codeNumber === 60 ? language.sendDynamicCode : `${codeNumber} S`}
                  </p>
                ) : null}
              </label>
            ))}
            <label className="djm-public-button" htmlFor="publicInput">
              <input
                id="publicInput"
                type="button"
                disabled={!error}
                value={language[`${pageName}Button`]}
                onClick={this.handleClickpublic}
              />
            </label>
          </form>
          <div className="djm-public-footer">
            <span
              onClick={event => this.handleClickJump('login', event)}
              onKeyDown={event => this.handleClickJump('login', event)}
              role="button"
              tabIndex={0}
            >
              {language.goLogin}
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
export default connect(mapStateToProps)(PublicForm);
