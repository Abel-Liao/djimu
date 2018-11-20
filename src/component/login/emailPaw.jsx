import React from "react";

class EmailPaw extends React.Component {
  render() {
    const language = this.props.languageStore.language.login;
    return (
      <label className="djm-login-userpaw" htmlFor="userPassword">
        <input
          id="userPassword"
          value={this.props.userInfo.password}
          autoComplete="off"
          type="password"
          placeholder={language.password}
          ref="password"
          onChange={this.props.changeInput.bind(this, "password")}
          onBlur={this.props.handleOnBlur.bind(this, "password")}
        />
        <span
          onClick={e => this.props.clearAll("password", e)}
          className={this.props.userInfo.password ? "display" : null}
        >
          x
        </span>
      </label>
    );
  }
}

export default EmailPaw;
