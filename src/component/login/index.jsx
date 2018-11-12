import React from "react";

import "./login.css";

const Login = () => {
  return (
    <div className="dji-login">
      <div className="dji-login-nav">
        <form className="djm-login-from" action="form_action.asp" method="post">
          <label className="djm-login-username" htmlFor="userName">
            <input
              id="userName"
              autocomplete="off"
              type="text"
              placeholder="请输入用户名"
            />
          </label>
          <label className="djm-login-userpaw" htmlFor="userPassword">
            <input
              id="userPassword"
              autocomplete="off"
              type="paw"
              placeholder="请输入密码"
            />
          </label>
          <label className="djm-login-button" htmlFor="loginInput">
            <input id="loginInput" type="button" value="登录" />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Login;
