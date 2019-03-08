import React from 'react';

import Banner from '../../banner';

function ReadPageRight(props) {
  const propsObj = props;
  const {
    scrollTop,
    language,
    wordCount,
    imgCount,
    mouseDis,
    childHeight,
    refScroll,
    onMouseEnter,
    ulStyle,
    onMouseLeave,
    h2Elevator,
  } = propsObj;
  return (
    <div className={`djm-readpage-content-right ${scrollTop > 556 ? 'right-fixed' : ''}`}>
      <div className="djm-rcr-top">
        {language.words}
        <span>
          {' '}
          {wordCount}
          {' '}
        </span>
        {language.and}
        <span>
          {' '}
          {imgCount.length}
          {' '}
        </span>
        {language.pictures}
      </div>
      <div
        className="djm-rcr-banner"
        onClick={propsObj.handleClickLookImg}
        onKeyDown={propsObj.handleClickLookImg}
        role="button"
        tabIndex={0}
      >
        <Banner bannerUrl={imgCount} dots={false} switchTime={2000} {...props} />
      </div>
      {/* <div className="djm-rcr-elevator" onScroll={props.onScrollHeight}> */}
      <div className="djm-rcr-elevator">
        <h3>{language.directory}</h3>
        <div className="djm-rcr-elevator-div">
          {/* <p
            className={`djm-rcr-elevator-scroll ${
              props.childHeight > 500 ? "display-scroll" : ""
            }`}
          >
            <span style={props.pStyle} />
          </p> */}
          <p
            className={`iconfont icon-mouse djm-rcr-elevator-mouse ${
              childHeight > 500 && mouseDis ? 'mouse-display' : ''
            }`}
          />
          <ul
            className="djm-rcr-elevator-ul"
            ref={refScroll}
            onMouseEnter={onMouseEnter}
            style={ulStyle}
            onMouseLeave={onMouseLeave}
          >
            {h2Elevator.map((item, index) => (
              <li
                /* eslint-disable */
                className={propsObj.elevatorNum === index ? 'choose-elevator' : ''}
                key={item.index}
                onClick={event => propsObj.handleClickElevator(item.index, event)}
                onKeyDown={event => propsObj.handleClickElevator(item.index, event)}
                role="button"
                tabIndex={0}
                /* eslint-enable */
              >
                <span>
                  <i />
                </span>
                {item.content}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ReadPageRight;
