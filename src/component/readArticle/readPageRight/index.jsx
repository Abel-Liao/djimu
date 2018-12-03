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
        <Banner bannerUrl={props.imgCount} dots={false} {...props} />
      </div>
      <div className="djm-rcr-elevator" onScroll={props.onScrollHight}>
        <h3>游记目录</h3>
        <ul>
          {props.h2Elevator.map((item, index) => (
            <li
              className={props.elevatorNum === index ? "choose-elevator" : ""}
              key={index}
              onClick={event =>
                props.handleClickElevator(index, item.scrollTop, event)
              }
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
  );
}

export default ReadPageRight;
