import React from 'react';

function EmailPaw(props) {
  const propsObj = props;
  const { userInfo, language } = propsObj;
  return (
    <label className="djm-login-userpaw" htmlFor="userPassword">
      <input
        id="userPassword"
        value={userInfo.password}
        autoComplete="off"
        type="password"
        placeholder={language.password}
        // ref="password"
        onChange={event => propsObj.changeInput('password', event)}
        onBlur={event => propsObj.handleOnBlur('password', event)}
      />
      <span
        onClick={e => propsObj.clearAll('password', e)}
        onKeyDown={e => propsObj.clearAll('password', e)}
        role="button"
        tabIndex={0}
        className={`clear-all-value ${userInfo.password ? 'display' : null}`}
        /* eslint-disable */
      >
        x
      </span>
      <span
        /* eslint-enable */
        className="djm-login-forget"
        onClick={event => propsObj.handleClickJump('forget', event)}
        onKeyDown={event => propsObj.handleClickJump('forget', event)}
        role="button"
        tabIndex={0}
      >
        {language.forgetPaw}
      </span>
    </label>
  );
}

export default EmailPaw;
