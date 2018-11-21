import React from "react";

function AddText(props) {
  return (
    <p
      onClick={event => props.handleClickChange(props.title, event)}
      className="djm-information-add"
    >
      <span className="djm-information-addButton">+</span>
      {props.language.addText}
    </p>
  );
}
export default AddText;
