import React from "react";

function EmailPaw(props) {
  return (
    <label className="djm-login-userpaw" htmlFor="userPassword">
      <input
        id="userPassword"
        value={props.userInfo.password}
        autoComplete="off"
        type="password"
        placeholder={props.language.password}
        // ref="password"
        onChange={event => props.changeInput("password", event)}
        onBlur={event => props.handleOnBlur("password", event)}
      />
      <span
        onClick={e => props.clearAll("password", e)}
        className={`clear-all-value ${
          props.userInfo.password ? "display" : null
        }`}
      >
        x
      </span>
      <span
        className="djm-login-forget"
        onClick={event => props.handleClickJump("forget", event)}
      >
        {props.language.forgetPaw}
      </span>
    </label>
  );
}

export default EmailPaw;
