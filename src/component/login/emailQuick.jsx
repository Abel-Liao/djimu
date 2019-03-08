import React from 'react';

function EmailQuick(props) {
  const propsObj = props;
  const {
    userInfo, language, changeInput, handleOnBlur, codeNumber, dynamicCode,
  } = propsObj;
  return (
    <label className="djm-login-dynamicCode" htmlFor="DynamicCode">
      <input
        id="DynamicCode"
        value={userInfo.dynamicCode}
        autoComplete="off"
        type="text"
        placeholder={language.dynamicCode}
        // ref="dynamicCode"
        onChange={changeInput.bind(this, 'dynamicCode')}
        onBlur={handleOnBlur.bind(this, 'dynamicCode')}
      />
      <span
        onClick={e => propsObj.clearAll('dynamicCode', e)}
        onKeyDown={e => propsObj.clearAll('dynamicCode', e)}
        role="button"
        tabIndex={0}
        className={`clear-all-value ${userInfo.dynamicCode ? 'display' : null}`}
        /* eslint-disable */
      >
        x
      </span>
      <span
        /* eslint-enable */
        className={codeNumber === 60 ? 'countdown' : 'countdown dont-click'}
        onClick={dynamicCode}
        onKeyDown={dynamicCode}
        role="button"
        tabIndex={0}
      >
        {codeNumber === 60 ? language.sendDynamicCode : `${codeNumber} S`}
      </span>
    </label>
  );
}
export default EmailQuick;
