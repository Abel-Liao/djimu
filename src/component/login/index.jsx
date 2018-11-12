import React from "react";

import "./login.css";

const Login = props => {
  return (
    <div className="dji-login">
      <div className="dji-login-nav">
        <form className="djm-login-from" action="form_action.asp" method="post">
          <label className="djm-login-username" htmlFor="userName">
            <input
              id="userName"
              autoComplete="off"
              type="text"
              placeholder={props.login.uesrName}
            />
          </label>
          <label className="djm-login-userpaw" htmlFor="userPassword">
            <input
              id="userPassword"
              autoComplete="off"
              type="paw"
              placeholder={props.login.password}
            />
          </label>
          <label className="djm-login-button" htmlFor="loginInput">
            <input id="loginInput" type="button" value={props.login.button} />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Login;
