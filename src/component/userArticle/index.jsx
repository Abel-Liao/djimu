import React from "react";
import { connect } from "react-redux";

import "./userArticle.css";

class UserArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [
        {
          name: "XXX",
          data: "2018-20-11",
          imgUrl: require("./images/index_banner1.jpg"),
          content: "hsahfhashfasfa"
        },
        {
          name: "OOO",
          data: "2018-10-11",
          imgUrl: require("./images/index_banner2.jpg"),
          content: "ASFSAFAS"
        },
        {
          name: "AAA",
          data: "2014-10-11",
          imgUrl: require("./images/index_banner3.jpg"),
          content: "阿贾克斯发发"
        },
        {
          name: "CCCC",
          data: "2016-02-11",
          imgUrl: require("./images/index_banner4.jpg"),
          content: "safsaffasf"
        }
      ]
    };
  }
  render() {
    return (
      <div className="djm-index-content">
        <ul className="djm-index-uesr-article clearfloat">
          {this.state.userInfo.map((item, index) => (
            <li
              key={index}
              className={index % 2 === 0 ? "djm-iua-left" : "djm-iua-right"}
            >
              <p className="djm-iua-line">
                <b className="line-one" />
                <b className="line-two" />
                <i className="round-big" />
                <span className="article-author">作者：{item.name}</span>
                <span className="article-data">日期：{item.data}</span>
              </p>
              <div className="djm-iua-content">
                <img src={item.imgUrl} alt="图片" />
                <p>{item.content}</p>
              </div>
            </li>
          ))}
          <span className="separated-line" />
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(UserArticle);
