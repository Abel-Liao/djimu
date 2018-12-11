import React from "react";

function BigPage(props) {
  const temporary = props.page.slice(props.midPage - 2, props.midPage + 3);
  return (
    <React.Fragment>
      <span
        className={props.choosePage === 0 ? "dji-paging-choose" : null}
        onClick={event => props.handleClickPage(0, event)}
      >
        1
      </span>
      {props.choosePage < 5 ? null : (
        <span className="djm-paging-omit">...</span>
      )}
      {temporary.map((idex, index) => (
        <span
          key={index}
          className={props.choosePage === idex - 1 ? "dji-paging-choose" : null}
          onClick={event => props.handleClickPage(idex - 1, event)}
        >
          {idex}
        </span>
      ))}
      {props.choosePage > props.page.length - 6 ? null : (
        <span className="djm-paging-omit">...</span>
      )}
      <span
        className={
          props.choosePage === props.page.length - 1
            ? "dji-paging-choose"
            : null
        }
        onClick={event => props.handleClickPage(props.page.length - 1, event)}
      >
        {props.page.length}
      </span>
    </React.Fragment>
  );
}
export default BigPage;
