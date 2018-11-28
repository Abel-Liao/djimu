import React from "react";
import { connect } from "react-redux";

import sortingFun from "../../public/sorting";

import UserArticleList from "../../container/userArticle";

import "./userArticle.css";

class UserArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      displayList: "new",
      contentNav: ["new", "hot", "myCollection"]
    };
    this.handleClickAction = this.handleClickAction.bind(this);
    this.changeItemFun = this.changeItemFun.bind(this);
    this.handleClickNav = this.handleClickNav.bind(this);
    this.handleClickLink = this.handleClickLink.bind(this);
  }
  changeItemFun(changeItem, key, value) {
    this.setState(
      Object.assign(changeItem, changeItem, {
        [key]: value
      })
    );
  }
  handleClickAction(dataName, stateIndex) {
    // const changeItem = this.state.userInfo[stateIndex];
    this.props.dispatch({
      type: "CHANGE_ARTICLE",
      dataNumber: stateIndex,
      dataName: dataName,
      dataValue: !this.state.userInfo[stateIndex][dataName].isChoose
    });
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
    } else {
      this.setState({ userInfo: sortingFun(this.state.userInfo, "date") });
    }
    this.setState({ displayList: displayName });
  }
  handleClickLink(idNumber) {
    this.props.history.push(`/readArticle?id=${idNumber}`);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    // 这样实现有违 getDerivedStateFromProps 初衷
    // if (prevState.displayList === "hot") {
    //   return { userInfo: sortingFun(prevState.userInfo, "givelike") };
    // }
    // if (prevState.displayList !== "hot") {
    //   return { userInfo: sortingFun(prevState.userInfo, "date") };
    // }
    if (nextProps.articleStore !== prevState.userInfo) {
      return { userInfo: nextProps.articleStore };
    }
    return null;
  }
  render() {
    const language = this.props.languageStore.language.userArticle;
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
        <ul className="djm-index-uesr-article clearfloat">
          <UserArticleList
            {...this.props}
            userInfo={this.state.userInfo}
            handleClickAction={this.handleClickAction}
            language={language}
            displayList={this.state.displayList}
            handleClickLink={this.handleClickLink}
          />
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
