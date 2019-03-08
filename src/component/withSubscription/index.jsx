import React from 'react';

import regexFun from '../../public/regex';

function withSubscription(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.handleClickregister = this.handleClickregister.bind(this);
      this.handleChangeInput = this.handleChangeInput.bind(this);
      this.handleClickClear = this.handleClickClear.bind(this);
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
        if (this.state.userInfo[key] === '') {
          this.setState({ errorText: `${[key]}Null` });
          return false;
        }
      }
      /* eslint-enable */
      return true;
    }

    handleClickregister() {
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
      }
    }

    handleChangeInput(element, event) {
      this.setUserInfoFun('userInfo', element, event.target.value);
      if (regexFun(element, event.target.value)) {
        this.setUserInfoFun('errorInfo', element, true);
        this.setState({ errorText: null });
        const { errorInfo } = this.state;
        this.setState({
          error: errorInfo.email && errorInfo.password && errorInfo.dynamicCode,
        });
      } else {
        this.setUserInfoFun('errorInfo', element, false);
      }
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
      // const clickFun = {
      //   handleClickregister: this.handleClickregister,
      //   handleChangeInput: this.handleChangeInput,
      //   handleClickClear: this.handleClickClear,
      //   handleClickDynamicCode: this.handleClickDynamicCode,
      //   handleOnBlur: this.handleOnBlur,
      //   setUserInfoFun: this.setUserInfoFun,
      //   forUserInfo: this.forUserInfo,
      //   handleClickJump: this.handleClickJump
      // };
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSubscription;
