import React from "react";
import { connect } from "react-redux";

import dateFun from "../../public/date";

import Banner from "../banner";

import "./readArticle.css";

class ReadArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleNumber: props.location.search.split("&")[0].split("=")[1],
      articleInfo: null
    };
    this.handleClickCollection = this.handleClickCollection.bind(this);
  }
  handleClickCollection() {
    this.props.dispatch({
      type: "CHANGE_ARTICLE",
      dataNumber: this.props.location.search.split("&")[1].split("=")[1],
      dataName: "collection",
      dataValue: !this.state.articleInfo.collection.isChoose
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // if (this.chooseContent(nextProps.articleStore) !== prevState.articleInfo) {
    //   return { articleInfo: nextProps.articleStore[prevState.articleNumber] };
    // }
    const chooseContentFun = function(arr) {
      let temporary = null;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].id === parseInt(prevState.articleNumber)) {
          return (temporary = arr[i]);
        }
      }
      return temporary;
    };
    if (prevState.articleInfo === null) {
      return { articleInfo: chooseContentFun(nextProps.articleStore) };
    }
    if (chooseContentFun(nextProps.articleStore) !== prevState.articleInfo) {
      return { articleInfo: chooseContentFun(nextProps.articleStore) };
    }
    return null;
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const temporary = this.state.articleInfo;
    const language = this.props.languageStore.language.readArticle;
    return (
      <div className="djm-readPage">
        <Banner />
        <div className="djm-readPage-main">
          <div className="djm-readPage-header">
            <img src={require("./images/user_img.jpg")} alt="Head portrait" />
            <div className="title-author">
              <h1>{temporary.title}</h1>
              <p>
                <span className="article-author">{temporary.authorName}</span>
                <span className="focusOn-author">{language.focusOn}</span>
                <span>{dateFun("2018-10-15", "YYYY-MM-DD")}</span>
                <span className="iconfont icon-eyes">
                  {language.readNumber}
                  {temporary.readNumber}
                </span>
                <span
                  className={`iconfont icon-collection ${
                    temporary.collection.isChoose ? "collection-article" : null
                  }`}
                  onClick={this.handleClickCollection}
                >
                  {language.collection}
                </span>
                <span className="iconfont icon-plane">{language.share}</span>
              </p>
            </div>
          </div>
          <ul className="djm-readPage-travel-info clearfloat">
            <li>
              <span>{language.time}</span>
              {dateFun(temporary.date, "YYYY-MM-DD")}
            </li>
            <li>
              <span>{language.days}</span>
              {temporary.days}
              {language.dayUnit}
            </li>
            <li>
              <span>{language.peoples}</span>
              {temporary.peoples}
              {language.PeopleUnit}
            </li>
            <li>
              <span>{language.money}</span>
              {temporary.cost}
              {language.moneyUnit}
            </li>
          </ul>
          <div
            className="djm-readPage-content"
            dangerouslySetInnerHTML={{ __html: temporary.content }}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

export default connect(mapStateToProps)(ReadArticle);
