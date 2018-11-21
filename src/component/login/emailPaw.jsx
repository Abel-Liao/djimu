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
        className={props.userInfo.password ? "display" : null}
      >
        x
      </span>
    </label>
  );
}

export default EmailPaw;
