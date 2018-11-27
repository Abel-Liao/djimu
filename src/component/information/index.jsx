import React from "react";
import { connect } from "react-redux";

import HeadPortrait from "./headPortrait";
import AddText from "./addText";
import UserText from "./userText";
import ChangeText from "./changeText";

import "./information.css";

import firstImg from "./images/logo.png";

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeInfo: {
        email: true,
        describeYourself: true,
        wantPlace: true,
        impressionPlace: true
      },
      headPortraitUrl: firstImg,
      userInfoArr: [
        { title: "email", content: "sdas@adas.com" },
        { title: "describeYourself", content: "abcdefg" },
        { title: "wantPlace", content: "西藏" },
        { title: "impressionPlace", content: "" }
      ],
      oldInfoArr: [
        { title: "email", content: "sdas@adas.com" },
        { title: "describeYourself", content: "abcdefg" },
        { title: "wantPlace", content: "西藏" },
        { title: "impressionPlace", content: "" }
      ]
    };
    this.handleClickChange = this.handleClickChange.bind(this);
    this.handleChangeImg = this.handleChangeImg.bind(this);
    this.handleClickSure = this.handleClickSure.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.changeObjectFun = this.changeObjectFun.bind(this);
  }
  changeObjectFun(stateName, key, value, stateIndex) {
    this.setState(
      Object.assign(
        this.state[stateName][stateIndex],
        this.state[stateName][stateIndex],
        {
          [key]: value
        }
      )
    );
  }
  handleClickChange(changeName, changeIndex, isCancel) {
    this.setState(
      Object.assign(this.state.changeInfo, this.state.changeInfo, {
        [changeName]: !this.state.changeInfo[changeName]
      }),
      () => {
        if (this.state.changeInfo[changeName] && isCancel) {
          this.changeObjectFun(
            "userInfoArr",
            "content",
            this.state.oldInfoArr[changeIndex].content,
            changeIndex
          );
        }
      }
    );
  }
  handleClickSure(changeName, changeIndex, element) {
    this.changeObjectFun("userInfoArr", "content", element.value, changeIndex);
    this.changeObjectFun("oldInfoArr", "content", element.value, changeIndex);
  }
  handleChangeValue(changeIndex, event) {
    this.changeObjectFun(
      "userInfoArr",
      "content",
      event.target.value,
      changeIndex
    );
  }
  handleChangeImg(event) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = event => {
      this.setState({ headPortraitUrl: event.target.result });
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    return null;
  }
  render() {
    const language = this.props.languageStore.language.information;
    return (
      <div className="djm-information">
        <div className="djm-information-main">
          <div className="djm-information-top">
            <img src={require("./images/top_img.jfif")} alt="img" />
          </div>
          <div className="djm-information-content">
            <HeadPortrait
              handleChangeImg={this.handleChangeImg}
              headPortraitUrl={this.state.headPortraitUrl}
              language={language}
              {...this.props}
            />
            <div className="djm-information-userName">
              <h2>Abel</h2>
              <ul className="djm-information-userInfoList">
                {this.state.userInfoArr.map((item, index) => (
                  <li key={index}>
                    <b>{language[item.title]}</b>
                    {item.content === "" &&
                    this.state.changeInfo[item.title] ? (
                      <AddText
                        {...this.props}
                        handleClickChange={this.handleClickChange}
                        title={item.title}
                        language={language}
                        index={index}
                      />
                    ) : this.state.changeInfo[item.title] ? (
                      <UserText
                        {...this.props}
                        content={item.content}
                        title={item.title}
                        handleClickChange={this.handleClickChange}
                        language={language}
                        index={index}
                      />
                    ) : (
                      <ChangeText
                        {...this.props}
                        handleClickSure={this.handleClickSure}
                        handleClickChange={this.handleClickChange}
                        handleChangeValue={this.handleChangeValue}
                        language={language}
                        title={item.title}
                        content={item.content}
                        index={index}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(Information);
