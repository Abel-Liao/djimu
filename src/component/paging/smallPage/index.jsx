import React from 'react';

function SmallPage(props) {
  const propsObj = props;
  return (
    <React.Fragment>
      {propsObj.page.map((idex, index) => (
        <span
          className={index === propsObj.choosePage ? 'dji-paging-choose' : null}
          key={idex}
          onClick={event => propsObj.handleClickPage(index, event)}
          onKeyDown={event => propsObj.handleClickPage(index, event)}
          role="button"
          tabIndex={0}
        >
          {idex + 1}
        </span>
      ))}
    </React.Fragment>
  );
}
export default SmallPage;
