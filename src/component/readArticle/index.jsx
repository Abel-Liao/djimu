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
      ulClientHeight: null,
      ulScrollHeight: null,
      partentHeight: null,
      childHeight: null,
      ulNode: null,
      bannerUrl: [
        require("./images/banner/read_banner1.jpg"),
        require("./images/banner/read_banner2.jpg"),
        require("./images/banner/read_banner3.jpg"),
        require("./images/banner/read_banner4.jpg")
      ],
      scrollNumber: 0,
      stepNum: 0,
      pStyle: {
        // height: "70%",
        transform: "translateY(0)"
      },
      ulStyle: {
        transform: "translateY(0)"
      }
    };
    this.handleClickCollection = this.handleClickCollection.bind(this);
    this.handleClickLookImg = this.handleClickLookImg.bind(this);
    this.handleClickElevator = this.handleClickElevator.bind(this);
    this.onScrollHeight = this.onScrollHeight.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollFun = this.scrollFun.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
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
  onScrollHeight(parentHeight, childHight, e) {
    const step = Math.ceil((childHight - parentHeight) / 50);
    let temporary = null;
    if (e.wheelDelta) {
      temporary = e.wheelDelta > 0 ? true : false;
    } else {
      temporary = e.detail < 0 ? true : false;
    }
    if (temporary && this.state.scrollNumber < 0) {
      this.setState(
        state => ({ stepNum: state.stepNum - 100 / step }),
        () => {
          return this.ulScrollFun(temporary, this.state.stepNum);
        }
      );
    } else if (
      !temporary &&
      this.state.scrollNumber > Math.ceil(parentHeight - childHight)
    ) {
      this.setState(
        state => ({ stepNum: state.stepNum + 100 / step }),
        () => {
          return this.ulScrollFun(temporary, this.state.stepNum);
        }
      );
    }
  }
  ulScrollFun(isUp, step) {
    this.setState(
      num => ({ scrollNumber: num.scrollNumber + (isUp ? 1 : -1) * 50 }),
      () => {
        const temporaryNum = this.state.scrollNumber;
        return (
          this.setState({
            pStyle: {
              transform: `translateY(${step}%`
            }
          }),
          this.setState({
            ulStyle: {
              transform: `translateY(${temporaryNum}px`
            }
          })
        );
      }
    );
  }
  onMouseEnter() {
    const temporary = this.refScroll;
    const temporaryPar = temporary.offsetParent.clientHeight;
    const temporaryChi = temporary.scrollHeight;
    if (temporaryChi > 500) {
      this.setState({
        pStyle: {
          transform: `translateY(${this.state.scrollNumber})`
        }
      });
      if (temporary.addEventListener) {
        temporary.addEventListener("DOMMouseScroll", event =>
          this.onScrollHeight(temporaryPar, temporaryChi, event)
        );
      }
      temporary.onmousewheel = event =>
        this.onScrollHeight(temporaryPar, temporaryChi, event);
    }
  }
  onMouseLeave() {}
  handleClickElevator(index) {
    clearInterval(this.state.timeScroll);
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
    for (let i = 0; i < temporaryH2.length - 1; i++) {
      if (
        temporary >= temporaryEle[temporaryH2[i].index].offsetTop &&
        temporary <= temporaryEle[temporaryH2[i + 1].index].offsetTop
      ) {
        this.setState({ elevatorNum: i });
      }
    }
    if (
      temporary >=
      temporaryEle[temporaryH2[temporaryH2.length - 1].index].offsetTop
    ) {
      this.setState({ elevatorNum: temporaryH2.length - 1 });
    }
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
            content: temporary[i].innerText,
            index: i
          });
        }
        wordCount += temporary[i].innerText.length;
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
    this.setState({ elementNode: this.childEle.children }, () => {
      return this.scrollFun();
    });
    window.addEventListener("scroll", this.handleScroll);
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
    this.refScroll.removeEventListener("scroll", this.onScrollHeight);
    clearInterval(this.state.timeScroll);
  }
  render() {
    const temporary = this.state.articleInfo;
    const language = this.props.languageStore.language.readArticle;
    // console.log(this.state.ulClientHeight);
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
              onScrollHeight={this.onScrollHeight}
              scrollTop={this.state.scrollTop}
              language={language}
              refScroll={ele => {
                this.refScroll = ele;
              }}
              onMouseEnter={this.onMouseEnter}
              onMouseLeave={this.onMouseLeave}
              pStyle={this.state.pStyle}
              ulStyle={this.state.ulStyle}
              childHeight={this.childHeight}
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
