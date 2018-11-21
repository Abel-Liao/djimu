import React from "react";

function UserText(props) {
  return (
    <React.Fragment>
      <span>{props.content}</span>
      <span
        onClick={event => props.handleClickChange(props.title, event)}
        className="djm-information-change"
      >
        <i className="iconfont icon-pen" />
        {props.language.changeText}
      </span>
    </React.Fragment>
  );
}
export default UserText;
