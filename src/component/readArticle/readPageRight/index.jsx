import React from "react";

import Banner from "../../banner";

function ReadPageRight(props) {
  return (
    <div
      className={`djm-readpage-content-right ${
        props.scrollTop > 556 ? "right-fixed" : ""
      }`}
    >
      <div className="djm-rcr-top">
        {props.language.words}
        <span> {props.wordCount} </span>
        {props.language.and}
        <span> {props.imgCount.length} </span>
        {props.language.pictures}
      </div>
      <div className="djm-rcr-banner" onClick={props.handleClickLookImg}>
        <Banner
          bannerUrl={props.imgCount}
          dots={false}
          switchTime={2000}
          {...props}
        />
      </div>
      {/* <div className="djm-rcr-elevator" onScroll={props.onScrollHeight}> */}
      <div className="djm-rcr-elevator">
        <h3>{props.language.directory}</h3>
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
              props.childHeight > 500 && props.mouseDis ? "mouse-display" : ""
            }`}
          />
          <ul
            className="djm-rcr-elevator-ul"
            ref={props.refScroll}
            onMouseEnter={props.onMouseEnter}
            style={props.ulStyle}
            onMouseLeave={props.onMouseLeave}
          >
            {props.h2Elevator.map((item, index) => (
              <li
                className={props.elevatorNum === index ? "choose-elevator" : ""}
                key={index}
                onClick={event => props.handleClickElevator(item.index, event)}
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
