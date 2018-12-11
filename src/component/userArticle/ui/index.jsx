import React from "react";

import dateFun from "../../../public/date";
import Paging from "../../paging";

function LiList(props) {
  return (
    // <li className={props.index % 2 === 0 ? "djm-iua-left" : "djm-iua-right"}>
    <li className="djm-iua-list">
      <p className="djm-iua-line">
        <b className="line-one" />
        <b className="line-two" />
        <i className="round-big" />
        <span className="article-author">
          {props.language.author}
          {props.item.authorName}
        </span>
        <span className="article-data">
          {props.language.date}
          {dateFun(props.item.date, "MM-DD-YYYY")}
        </span>
      </p>
      <div className="djm-iua-img">
        <img
          onClick={event =>
            props.handleClickLink(props.item.id, props.index, event)
          }
          src={props.item.imgUrl}
          alt="图片"
        />
      </div>
      <p className="djm-iua-text">{props.item.title}</p>
      <div className="djm-iua-function">
        <span className="iconfont icon-comments">
          {props.item.comments > 100000
            ? `${parseInt(props.item.comments / 1000)}K+`
            : props.item.comments}
        </span>
        <span
          onClick={event => {
            props.handleClickAction("givelike", props.item.id, event);
            props.handleClickGivelike(props.index, event);
          }}
          className={`${
            props.item.givelike.isChoose ? "choosed" : ""
          } iconfont icon-givelike ${
            props.chooseGivelike === props.index ? "click-givelike" : ""
          }`}
        >
          {props.item.givelike.number > 100000
            ? `${parseInt(props.item.givelike.number / 1000)}K+`
            : props.item.givelike.number}
        </span>
        <span
          onClick={event =>
            props.handleClickAction("collection", props.item.id, event)
          }
          className={`${
            props.item.collection.isChoose ? "choosed" : ""
          } iconfont icon-collection`}
        >
          {props.item.collection > 100000
            ? `${parseInt(props.item.collection.number / 1000)}K+`
            : props.item.collection.number}
        </span>
        <span
          className={`djm-iua-share iconfont icon-plane ${
            props.chooseShare === props.index ? "click-share" : ""
          }`}
          onClick={event => props.handleClickShare(props.index, event)}
          ref={props.shareRef("span" + props.index)}
        >
          {props.language.share}
        </span>
      </div>
    </li>
  );
}

function UserArticle(props) {
  return (
    <React.Fragment>
      <ul className="djm-index-uesr-article clearfloat">
        {props.userInfo.map((item, index) => {
          return props.displayList === "myCollection" ? (
            item.collection.isChoose ? (
              <LiList key={index} {...props} item={item} index={index} />
            ) : null
          ) : (
            <LiList key={index} {...props} item={item} index={index} />
          );
        })}
        <span className="separated-line" />
      </ul>
      {props.userInfo.length === 0 ? null : (
        <Paging
          {...props}
          pageLength={Math.ceil(props.uesrArr.length / 8)}
          changePage={props.changePage}
        />
      )}
    </React.Fragment>
  );
}
export default UserArticle;
