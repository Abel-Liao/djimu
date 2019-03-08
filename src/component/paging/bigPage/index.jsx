import React from 'react';

function BigPage(props) {
  const propsObj = props;
  const temporary = propsObj.page.slice(propsObj.midPage - 2, propsObj.midPage + 3);
  return (
    <React.Fragment>
      <span
        className={propsObj.choosePage === 0 ? 'dji-paging-choose' : null}
        onClick={event => propsObj.handleClickPage(0, event)}
        onKeyDown={event => propsObj.handleClickPage(0, event)}
        role="button"
        tabIndex={0}
        /* eslint-disable */
      >
        1
      </span>
      {propsObj.choosePage < 5 ? null : <span className="djm-paging-omit">...</span>}
      {temporary.map(idex => (
        /* eslint-enable */
        <span
          key={idex}
          className={propsObj.choosePage === idex - 1 ? 'dji-paging-choose' : null}
          onClick={event => propsObj.handleClickPage(idex - 1, event)}
          onKeyDown={event => propsObj.handleClickPage(idex - 1, event)}
          role="button"
          tabIndex={0}
        >
          {idex}
        </span>
      ))}
      {propsObj.choosePage > propsObj.page.length - 6 ? null : (
        <span className="djm-paging-omit">...</span>
      )}
      <span
        className={propsObj.choosePage === propsObj.page.length - 1 ? 'dji-paging-choose' : null}
        onClick={event => propsObj.handleClickPage(propsObj.page.length - 1, event)}
        onKeyDown={event => propsObj.handleClickPage(propsObj.page.length - 1, event)}
        role="button"
        tabIndex={0}
      >
        {propsObj.page.length}
      </span>
    </React.Fragment>
  );
}
export default BigPage;
