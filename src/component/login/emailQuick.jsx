import React from "react";

function EmailQuick(props) {
  return (
    <label className="djm-login-dynamicCode" htmlFor="DynamicCode">
      <input
        id="DynamicCode"
        value={props.userInfo.dynamicCode}
        autoComplete="off"
        type="text"
        placeholder={props.language.dynamicCode}
        // ref="dynamicCode"
        onChange={props.changeInput.bind(this, "dynamicCode")}
        onBlur={props.handleOnBlur.bind(this, "dynamicCode")}
      />
      <span
        onClick={e => props.clearAll("dynamicCode", e)}
        className={props.userInfo.dynamicCode ? "display" : null}
      >
        x
      </span>
      <p
        className={props.codeNumber === 60 ? null : "dont-click"}
        onClick={props.dynamicCode}
      >
        {props.codeNumber === 60
          ? props.language.sendDynamicCode
          : props.codeNumber + " S"}
      </p>
    </label>
  );
}
export default EmailQuick;
