import React from "react";

import dateFun from "../../public/date";

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
          onClick={event =>
            props.handleClickAction("givelike", props.index, event)
          }
          className={`${
            props.item.givelike.isChoose ? "choosed" : null
          } iconfont icon-givelike`}
        >
          {props.item.givelike.number > 100000
            ? `${parseInt(props.item.givelike.number / 1000)}K+`
            : props.item.givelike.number}
        </span>
        <span
          onClick={event =>
            props.handleClickAction("collection", props.index, event)
          }
          className={`${
            props.item.collection.isChoose ? "choosed" : null
          } iconfont icon-collection`}
        >
          {props.item.collection > 100000
            ? `${parseInt(props.item.collection.number / 1000)}K+`
            : props.item.collection.number}
        </span>
        <span className="djm-iua-share iconfont icon-plane">
          {props.language.share}
        </span>
      </div>
    </li>
  );
}

function UserArticle(props) {
  return (
    <React.Fragment>
      {props.userInfo.map((item, index) => {
        return props.displayList === "myCollection" ? (
          item.collection.isChoose ? (
            <LiList key={index} {...props} item={item} index={index} />
          ) : null
        ) : (
          <LiList key={index} {...props} item={item} index={index} />
        );
      })}
    </React.Fragment>
  );
}
export default UserArticle;
