import React from "react";
import { connect } from "react-redux";

class UserArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [
        {
          name: "XXX",
          data: "2018-20-11",
          imgUrl: require("./images/index_banner1.jpg"),
          title: "hsahfhashfasfa",
          comments: 2356,
          givelike: {
            number: 6589,
            isChoose: false
          },
          collection: {
            number: 564,
            isChoose: false
          }
        },
        {
          name: "OOO",
          data: "2018-10-11",
          imgUrl: require("./images/index_banner2.jpg"),
          title:
            "ASFSAFASsb adasdsd savnd asndasdba sdnab dnav sanv dnad js bbfbm fdabfds bfsbdnfd nfs dvfs dvfn vsd nfs vdnf sdv nf mvfnm dsvfm sdv fjs dvf ja amdhasb dasn dvad asd san dvasb d ",
          comments: 2136,
          givelike: {
            number: 1289,
            isChoose: false
          },
          collection: {
            number: 230,
            isChoose: true
          }
        },
        {
          name: "AAA",
          data: "2014-10-11",
          imgUrl: require("./images/index_banner3.jpg"),
          title:
            "阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发阿贾克斯发发",
          comments: 6587,
          givelike: {
            number: 554,
            isChoose: true
          },
          collection: {
            number: 0,
            isChoose: false
          }
        },
        {
          name: "CCCC",
          data: "2016-02-11",
          imgUrl: require("./images/index_banner4.jpg"),
          title: "safsaffasf",
          comments: 6987123,
          givelike: {
            number: 2365124,
            isChoose: false
          },
          collection: {
            number: 1475,
            isChoose: false
          }
        }
      ]
    };
    this.handleClickAction = this.handleClickAction.bind(this);
    this.changeItemFun = this.changeItemFun.bind(this);
  }
  changeItemFun(changeItem, key, value) {
    this.setState(
      Object.assign(changeItem, changeItem, {
        [key]: value
      })
    );
  }
  handleClickAction(dataName, stateIndex) {
    const changeItem = this.state.userInfo[stateIndex];
    if (changeItem[dataName].isChoose) {
      this.changeItemFun(
        changeItem[dataName],
        "number",
        changeItem[dataName].number - 1
      );
      this.changeItemFun(changeItem[dataName], "isChoose", false);
    } else {
      this.changeItemFun(
        changeItem[dataName],
        "number",
        changeItem[dataName].number + 1
      );
      this.changeItemFun(changeItem[dataName], "isChoose", true);
    }
  }
  render() {
    const language = this.props.languageStore.language.userArticle;
    return (
      <React.Fragment>
        {this.state.userInfo.map((item, index) => (
          <li
            key={index}
            className={index % 2 === 0 ? "djm-iua-left" : "djm-iua-right"}
          >
            <p className="djm-iua-line">
              <b className="line-one" />
              <b className="line-two" />
              <i className="round-big" />
              <span className="article-author">
                {language.author}
                {item.name}
              </span>
              <span className="article-data">
                {language.date}
                {item.data}
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
}
function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(UserArticle);
