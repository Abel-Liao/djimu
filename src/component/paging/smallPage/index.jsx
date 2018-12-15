import React from "react";

function SmallPage(props) {
  return (
    <React.Fragment>
      {props.page.map((idex, index) => (
        <span
          className={index === props.choosePage ? "dji-paging-choose" : null}
          key={index}
          onClick={event => props.handleClickPage(index, event)}
        >
          {idex + 1}
        </span>
      ))}
    </React.Fragment>
  );
}
export default SmallPage;
