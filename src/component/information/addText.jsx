import React from 'react';

function AddText(props) {
  const propsObj = props;
  const { language, title, index } = propsObj;
  return (
    <span
      onClick={event => propsObj.handleClickChange(title, index, false, event)}
      onKeyDown={event => propsObj.handleClickChange(title, index, false, event)}
      role="button"
      tabIndex={0}
      className="djm-information-add"
    >
      <span className="djm-information-addButton">+</span>
      {language.addText}
    </span>
  );
}
export default AddText;
