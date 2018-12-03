import React from "react";
import { connect } from "react-redux";

import dateFun from "../../public/date";
import Banner from "../banner";

import ReadPageRight from "./readPageRight";
import LookImg from "./lookImg";

import "./readArticle.css";

class ReadArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articleNumber: props.location.search.split("&")[0].split("=")[1],
      articleInfo: null,
      lookImg: false,
      wordCount: null,
      imgCount: [],
      h2Elevator: [],
      elevatorNum: 0,
      scrollTop: 0,
      timeScroll: null,
      listenScroll: null,
      elementNode: null,
      bannerUrl: [
        require("./images/banner/read_banner1.jpg"),
        require("./images/banner/read_banner2.jpg"),
        require("./images/banner/read_banner3.jpg"),
        require("./images/banner/read_banner4.jpg")
      ]
    };
    this.handleClickCollection = this.handleClickCollection.bind(this);
    this.handleClickLookImg = this.handleClickLookImg.bind(this);
    this.handleClickElevator = this.handleClickElevator.bind(this);
    this.onScrollHight = this.onScrollHight.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollFun = this.scrollFun.bind(this);
  }
  handleClickCollection() {
    this.props.dispatch({
      type: "CHANGE_ARTICLE",
      dataNumber: this.props.location.search.split("&")[1].split("=")[1],
      dataName: "collection",
      dataValue: !this.state.articleInfo.collection.isChoose
    });
  }
  handleClickLookImg() {
    this.setState(state => ({ lookImg: !state.lookImg }));
  }
  onScrollHight(e, v) {
    console.log(e, v);
  }
  handleClickElevator(number, index) {
    clearInterval(this.state.timeScroll);
    this.setState({ elevatorNum: number });
    let temporaryScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const temporary = this.state.elementNode[index].offsetTop + 330;
    this.setState({
      timeScroll: setInterval(() => {
        if (temporaryScroll < temporary) {
          temporaryScroll += 200;
          window.scrollTo(0, temporaryScroll);
          if (temporaryScroll >= temporary) {
            clearInterval(this.state.timeScroll);
          }
        } else {
          temporaryScroll -= 200;
          window.scrollTo(0, temporaryScroll);
          if (temporaryScroll <= temporary) {
            clearInterval(this.state.timeScroll);
          }
        }
      }, 10)
    });
  }
  handleScroll() {
    const temporary =
      document.body.scrollTop || document.documentElement.scrollTop;
    const temporaryH2 = this.state.h2Elevator;
    const temporaryEle = this.state.elementNode;
    // for (let i = 0; i < temporaryH2.length; i++) {
    //   const abc = temporaryH2[i].index;
    //   let abd = null;
    //   if (i !== temporaryH2.length - 1) {
    //     abd = temporaryH2[i + 1].index;
    //   }
    //   if (
    //     temporary > temporaryEle[abc].offsetTop &&
    //     temporary < temporaryEle[abd].offsetTop &&
    //     i !== temporaryH2.length - 1
    //   ) {
    //     this.setState({ elevatorNum: i });
    //   } else {
    //     this.setState({ elevatorNum: temporaryH2.length - 1 });
    //   }
    // }
    this.setState({ scrollTop: temporary });
  }
  scrollFun() {
    const temporary = this.state.elementNode;
    let wordCount = 0;
    let imgCount = [];
    let h2Elevator = [];
    for (let i = 0; i < temporary.length; i++) {
      if (temporary[i].nodeName !== "IMG") {
        if (temporary[i].nodeName === "H2") {
          h2Elevator.push({
            content: temporary[i].outerText,
            index: i
          });
        }
        wordCount += temporary[i].outerText.length;
      } else {
        imgCount.push(temporary[i].src);
      }
    }
    this.setState({ wordCount: wordCount });
    this.setState({ imgCount: imgCount });
    this.setState({ h2Elevator: h2Elevator });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    window.addEventListener("scroll", this.handleScroll);
    this.setState({ elementNode: this.childEle.children }, () => {
      return this.scrollFun();
    });
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    return null;
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    return null;
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
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    clearInterval(this.state.timeScroll);
  }
  render() {
    const temporary = this.state.articleInfo;
    const language = this.props.languageStore.language.readArticle;
    return (
      <div className="djm-readPage">
        <div className="djm-readPage-banner">
          <Banner bannerUrl={this.state.bannerUrl} {...this.props} />
        </div>
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
          <div className="djm-readPage-content clearfloat">
            <div
              className="djm-readPage-content-left"
              dangerouslySetInnerHTML={{ __html: temporary.content }}
              ref={ele => (this.childEle = ele)}
            />
            <ReadPageRight
              {...this.props}
              wordCount={this.state.wordCount}
              imgCount={this.state.imgCount}
              handleClickLookImg={this.handleClickLookImg}
              h2Elevator={this.state.h2Elevator}
              elevatorNum={this.state.elevatorNum}
              handleClickElevator={this.handleClickElevator}
              onScrollHight={this.onScrollHight}
              scrollTop={this.state.scrollTop}
              language={language}
            />
          </div>
        </div>
        {this.state.lookImg ? (
          <LookImg
            {...this.props}
            imgCount={this.state.imgCount}
            handleClickLookImg={this.handleClickLookImg}
          />
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

export default connect(mapStateToProps)(ReadArticle);
