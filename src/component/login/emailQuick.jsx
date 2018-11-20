import React from "react";

class EmailQuick extends React.Component {
  render() {
    const language = this.props.languageStore.language.login;
    return (
      <label className="djm-login-dynamicCode" htmlFor="DynamicCode">
        <input
          id="DynamicCode"
          value={this.props.userInfo.dynamicCode}
          autoComplete="off"
          type="text"
          placeholder={language.dynamicCode}
          ref="dynamicCode"
          onChange={this.props.changeInput.bind(this, "dynamicCode")}
          onBlur={this.props.handleOnBlur.bind(this, "dynamicCode")}
        />
        <span
          onClick={e => this.props.clearAll("dynamicCode", e)}
          className={this.props.userInfo.dynamicCode ? "display" : null}
        >
          x
        </span>
        <p
          className={this.props.codeNumber === 60 ? null : "dont-click"}
          onClick={this.props.dynamicCode}
        >
          {this.props.codeNumber === 60
            ? language.sendDynamicCode
            : this.props.codeNumber + " S"}
        </p>
      </label>
    );
  }
}
export default EmailQuick;
