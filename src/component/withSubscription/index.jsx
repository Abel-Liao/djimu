import React from "react";

import regexFun from "../../public/regex";

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
