import React from "react";
import { connect } from "react-redux";

import "./information.css";

import firstImg from "./images/logo.png";

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeInfo: {
        email: true,
        impressionAddr: true
      },
      headPortraitUrl: firstImg
    };
    this.handleClcikChange = this.handleClcikChange.bind(this);
    this.handleChangeImg = this.handleChangeImg.bind(this);
  }
  handleClcikChange(changeName) {
    this.setState(
      Object.assign(this.state.changeInfo, this.state.changeInfo, {
        [changeName]: !this.state.changeInfo[changeName]
      })
    );
  }
  handleChangeImg(event) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0], "UTF-8");
    fileReader.onload = event => {
      this.setState({ headPortraitUrl: event.target.result });
    };
  }
  render() {
    return (
      <div className="djm-information">
        <div className="djm-information-main">
          <div className="djm-information-top">
            <img src={require("./images/top_img.jfif")} alt="img" />
          </div>
          <div className="djm-information-content">
            <div className="djm-information-userImg">
              <img src={this.state.headPortraitUrl} alt="" />
              <span className="djm-information-head-portrait iconfont icon-camera">
                <span className="djm-information-hp-text">修改头像</span>
                <input
                  onChange={this.handleChangeImg}
                  type="file"
                  accept="image/png, image/jpeg"
                />
              </span>
            </div>
            <div className="djm-information-userName">
              <h2>Abel</h2>
              <ul className="djm-information-userInfoList">
                <li>
                  <b>Email:</b>
                  {this.state.changeInfo.email ? (
                    <React.Fragment>
                      <span>sdas@adas.com</span>
                      <span
                        onClick={event =>
                          this.handleClcikChange("email", event)
                        }
                        className="djm-information-change"
                      >
                        <i className="iconfont icon-pen" />
                        修改
                      </span>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <input
                        className="djm-information-change-input"
                        type="text"
                        placeholder="输入邮箱"
                      />
                      <span className="djm-information-sure">确定</span>
                      <span
                        className="djm-information-cancel"
                        onClick={event =>
                          this.handleClcikChange("email", event)
                        }
                      >
                        取消
                      </span>
                    </React.Fragment>
                  )}
                </li>
                <li>
                  <b>描述自己:</b>abcdefg
                </li>
                <li>
                  <b>最想去的地方:</b>西藏
                </li>
                <li>
                  <b>印象最深的地方:</b>
                  {this.state.changeInfo.impressionAddr ? (
                    <p
                      onClick={this.handleClcikChange.bind(
                        this,
                        "impressionAddr"
                      )}
                      className="djm-information-add"
                    >
                      <span className="djm-information-addButton">+</span>
                      添加
                    </p>
                  ) : (
                    <React.Fragment>
                      <input
                        className="djm-information-change-input"
                        type="text"
                        placeholder="输入地名"
                      />
                      <span className="djm-information-sure">确定</span>
                      <span
                        className="djm-information-cancel"
                        onClick={event =>
                          this.handleClcikChange("impressionAddr", event)
                        }
                      >
                        取消
                      </span>
                    </React.Fragment>
                  )}
                </li>
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
