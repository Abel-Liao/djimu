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
        本文共有<span>{props.wordCount}</span>个字和
        <span>{props.imgCount.length}</span>张图片
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
