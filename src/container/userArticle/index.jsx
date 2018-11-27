import React from "react";

import dateFun from "../../public/date";

function UserArticle(props) {
  return (
    <React.Fragment>
      {props.userInfo.map((item, index) => (
        <li
          key={index}
          className={index % 2 === 0 ? "djm-iua-left" : "djm-iua-right"}
        >
          <p className="djm-iua-line">
            <b className="line-one" />
            <b className="line-two" />
            <i className="round-big" />
            <span className="article-author">
              {props.language.author}
              {item.name}
            </span>
            <span className="article-data">
              {props.language.date}
              {dateFun(item.data, "MM-DD-YYYY")}
            </span>
          </p>
          <div className="djm-iua-img">
            <img src={item.imgUrl} alt="图片" />
          </div>
          <p className="djm-iua-text">{item.title}</p>
          <div className="djm-iua-function">
            <span className="iconfont icon-comments">
              {item.comments > 100000
                ? `${parseInt(item.comments / 1000)}K+ 评论`
                : item.comments}
            </span>
            <span
              onClick={event =>
                this.handleClickAction("givelike", index, event)
              }
              className={`${
                item.givelike.isChoose ? "choosed" : null
              } iconfont icon-givelike`}
            >
              {item.givelike.number > 100000
                ? `${parseInt(item.givelike.number / 1000)}K+ 点赞`
                : item.givelike.number}
            </span>
            <span
              onClick={event =>
                this.handleClickAction("collection", index, event)
              }
              className={`${
                item.collection.isChoose ? "choosed" : null
              } iconfont icon-collection`}
            >
              {item.collection > 100000
                ? `${parseInt(item.collection.number / 1000)}K+ 收藏`
                : item.collection.number}
            </span>
            <span className="iconfont icon-plane">分享</span>
          </div>
        </li>
      ))}
    </React.Fragment>
  );
}
export default UserArticle;
