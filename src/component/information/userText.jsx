import React from 'react';

function UserText(props) {
  const propsObj = props;
  const {
    content, title, index, language,
  } = propsObj;
  return (
    <React.Fragment>
      <span>{content}</span>
      <span
        /* eslint-disable */
        onClick={event => propsObj.handleClickChange(title, index, false, event)}
        onKeyDown={event => propsObj.handleClickChange(title, index, false, event)}
        /* eslint-enable */
        role="button"
        tabIndex={0}
        className="djm-information-change"
      >
        <i className="iconfont icon-pen" />
        {language.changeText}
      </span>
    </React.Fragment>
  );
}
export default UserText;
