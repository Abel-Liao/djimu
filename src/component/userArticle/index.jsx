import React from "react";
import { connect } from "react-redux";

import sortingFun from "../../public/sorting";

import UserArticleList from "./ui";
// import Paging from "../paging";

import "./userArticle.css";

class UserArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: [],
      displayList: "new",
      contentNav: ["new", "hot", "myCollection"],
      chooseShare: null,
      timeShare: null,
      fixedShare: {
        bottom: 0,
        left: -100
      },
      timeGivelike: null,
      chooseGivelike: -1,
      pageNum: sessionStorage.getItem("pageNum")
        ? sessionStorage.getItem("pageNum")
        : 0
    };
    this.handleClickAction = this.handleClickAction.bind(this);
    this.changeItemFun = this.changeItemFun.bind(this);
    this.handleClickNav = this.handleClickNav.bind(this);
    this.handleClickLink = this.handleClickLink.bind(this);
    this.handleClickShare = this.handleClickShare.bind(this);
    this.handleClickGivelike = this.handleClickGivelike.bind(this);
    this.changePage = this.changePage.bind(this);
    this.collectionFun = this.collectionFun.bind(this);
  }
  changeItemFun(changeItem, key, value) {
    this.setState(
      Object.assign(changeItem, changeItem, {
        [key]: value
      })
    );
  }
  collectionFun() {
    let temporary = [];
    for (let i = 0; i < this.state.userInfo.length; i++) {
      if (this.state.userInfo[i].collection.isChoose) {
        temporary.push(this.state.userInfo[i]);
      }
    }
    this.setState({ userInfo: sortingFun(temporary, "date") });
  }
  handleClickAction(dataName, stateId) {
    this.props.dispatch({
      type: "CHANGE_ARTICLE",
      dataNumber: stateId,
      dataName: dataName
    });
    if (dataName === "collection") {
      this.collectionFun();
    }
    // data来源于state
    // const changeItem = this.state.userInfo[stateIndex];
    // if (changeItem[dataName].isChoose) {
    // } else {
    //   this.changeItemFun(
    //     changeItem[dataName],
    //     "number",
    //     changeItem[dataName].number + 1
    //   );
    //   this.changeItemFun(changeItem[dataName], "isChoose", true);
    // }
  }
  handleClickNav(displayName) {
    if (displayName === "hot") {
      this.setState({ userInfo: sortingFun(this.state.userInfo, "givelike") });
    } else if (displayName === "myCollection") {
      this.collectionFun();
    } else {
      this.setState({ userInfo: sortingFun(this.state.userInfo, "date") });
    }
    this.setState({ displayList: displayName });
  }
  handleClickLink(idNumber, indexNUmber) {
    this.props.history.push(`/readArticle?id=${idNumber}&index=${indexNUmber}`);
  }
  handleClickShare(number) {
    setTimeout(this.state.timeShare);
    const temporary = this["span" + number].getBoundingClientRect();
    this.setState({
      fixedShare: {
        top: parseInt(temporary.y) - 4,
        left: parseInt(temporary.x)
      }
    });
    this.setState({ chooseShare: number });
    this.setState({
      timeShare: setTimeout(() => {
        this.setState({ chooseShare: null });
        this.setState({ fixedShare: { top: 0, left: -100 } });
      }, 1000)
    });
  }
  handleClickGivelike(number) {
    clearTimeout(this.state.timeGivelike);
    this.setState({ chooseGivelike: number });
    this.setState({
      timeGivelike: setTimeout(() => {
        this.setState({ chooseGivelike: null });
      }, 200)
    });
  }
  changePage(pageNum) {
    sessionStorage.setItem("pageNum", pageNum);
    this.setState({ pageNum: pageNum });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // 这样实现有违 getDerivedStateFromProps 初衷
    // if (prevState.displayList === "hot") {
    //   return { userInfo: sortingFun(prevState.userInfo, "givelike") };
    // }
    // if (prevState.displayList !== "hot") {
    //   return { userInfo: sortingFun(prevState.userInfo, "date") };
    // }
    if (
      nextProps.articleStore.length !== prevState.userInfo.length &&
      prevState.displayList !== "myCollection"
    ) {
      return { userInfo: nextProps.articleStore };
    }
    return null;
  }
  componentWillUnmount() {
    clearTimeout(this.state.timeShare);
    clearTimeout(this.state.timeGivelike);
  }
  render() {
    const language = this.props.languageStore.language.userArticle;
    const temporaryArr = this.state.userInfo;
    const temporary = temporaryArr.slice(
      this.state.pageNum * 8,
      this.state.pageNum * 8 + 8
    );
    return (
      <div className="djm-index-content">
        <ul className="djm-index-content-nav clearfloat">
          {this.state.contentNav.map(item => (
            <li
              key={item}
              onClick={event => this.handleClickNav(item, event)}
              className={
                this.state.displayList === item ? "choose-class" : null
              }
            >
              {language[item]}
              <span className="under-line" />
            </li>
          ))}
        </ul>
        {/* <ul className="djm-index-uesr-article clearfloat"> */}
        <UserArticleList
          {...this.props}
          userInfo={temporary}
          uesrArr={temporaryArr}
          handleClickAction={this.handleClickAction}
          changePage={this.changePage}
          language={language}
          displayList={this.state.displayList}
          handleClickLink={this.handleClickLink}
          handleClickShare={this.handleClickShare}
          chooseShare={this.state.chooseShare}
          shareRef={index => ele => {
            this[index] = ele;
          }}
          handleClickGivelike={this.handleClickGivelike}
          givelikeRef={index => ele => {
            this[index] = ele;
          }}
          chooseGivelike={this.state.chooseGivelike}
        />
        {/* <span className="separated-line" />
        </ul> */}
        <i
          className={`share-animation iconfont icon-plane ${
            this.state.chooseShare !== null ? "click-share" : ""
          }`}
          style={this.state.fixedShare}
        />
        {/* {temporary.length === 0 ? null : (
          <Paging
            {...this.props}
            pageLength={Math.ceil(temporaryArr.length / 8)}
            changePage={this.changePage}
          />
        )} */}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

export default connect(mapStateToProps)(UserArticle);
