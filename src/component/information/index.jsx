import React from 'react';
import { connect } from 'react-redux';

import HeadPortrait from './headPortrait';
import AddText from './addText';
import UserText from './userText';
import ChangeText from './changeText';

import './information.css';

import firstImg from './images/logo.png';

class Information extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: props.loginStore.userName || sessionStorage.getItem('userName'),
      isChangeName: false,
      newUserName: '',
      changeInfo: {
        email: true,
        describeYourself: true,
        wantPlace: true,
        impressionPlace: true,
      },
      headPortraitUrl: firstImg,
      userInfoArr: [
        { title: 'email', content: 'sdas@adas.com' },
        { title: 'describeYourself', content: 'abcdefg' },
        { title: 'wantPlace', content: '西藏' },
        { title: 'impressionPlace', content: '' },
      ],
      oldInfoArr: [
        { title: 'email', content: 'sdas@adas.com' },
        { title: 'describeYourself', content: 'abcdefg' },
        { title: 'wantPlace', content: '西藏' },
        { title: 'impressionPlace', content: '' },
      ],
    };
    this.handleClickChange = this.handleClickChange.bind(this);
    this.handleChangeImg = this.handleChangeImg.bind(this);
    this.handleClickSure = this.handleClickSure.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.changeObjectFun = this.changeObjectFun.bind(this);
    this.handleClickUserName = this.handleClickUserName.bind(this);
    this.handleClickNameButton = this.handleClickNameButton.bind(this);
    this.handleChangeUser = this.handleChangeUser.bind(this);
  }

  changeObjectFun(stateName, key, value, stateIndex) {
    this.setState(
      /* eslint-disable */
      Object.assign(this.state[stateName][stateIndex], this.state[stateName][stateIndex], {
        [key]: value,
      }),
      /* eslint-enable */
    );
  }

  handleClickChange(changeName, changeIndex, isCancel) {
    const { changeInfo } = this.state;
    this.setState(
      Object.assign(changeInfo, changeInfo, {
        [changeName]: !changeInfo[changeName],
      }),
      () => {
        const { oldInfoArr } = this.state;
        /* eslint-disable */
        if (this.state.changeInfo[changeName] && isCancel) {
          /* eslint-enable */
          this.changeObjectFun(
            'userInfoArr',
            'content',
            oldInfoArr[changeIndex].content,
            changeIndex,
          );
        }
      },
    );
  }

  handleClickSure(changeName, changeIndex, element) {
    this.changeObjectFun('userInfoArr', 'content', element.value, changeIndex);
    this.changeObjectFun('oldInfoArr', 'content', element.value, changeIndex);
  }

  handleChangeValue(changeIndex, event) {
    this.changeObjectFun('userInfoArr', 'content', event.target.value, changeIndex);
  }

  handleChangeImg(event) {
    const fileReader = new FileReader();
    const temporary = event.target.files[0];
    if (
      (temporary.type === 'image/jpeg'
        || temporary.type === 'image/png'
        || temporary.type === 'image/jpg')
      && parseInt(temporary.size / 1024, 10) < 1024
    ) {
      fileReader.readAsDataURL(temporary);
      fileReader.onload = () => {
        this.setState({ headPortraitUrl: event.target.result });
      };
    } else {
      console.log('图片太大，或者格式不正确');
    }
  }

  handleClickUserName() {
    const { isChangeName } = this.state;
    this.setState({ isChangeName: !isChangeName });
  }

  handleChangeUser(event) {
    this.setState({ newUserName: event.target.value });
  }

  handleClickNameButton(isSure) {
    const { newUserName, isChangeName } = this.state;
    if (isSure) {
      const propsObj = this.props;
      sessionStorage.setItem('userName', newUserName);
      propsObj.dispatch({
        type: 'USER_NAME',
        data: newUserName,
      });
      this.setState({ userName: newUserName });
      this.setState({ isChangeName: !isChangeName });
    } else {
      this.setState({ isChangeName: !isChangeName });
    }
  }

  render() {
    const propsObj = this.props;
    const language = propsObj.languageStore.language.information;
    const {
      headPortraitUrl,
      isChangeName,
      userName,
      userInfoArr,
      changeInfo,
    } = this.state;
    return (
      <div className="djm-information">
        <div className="djm-information-main">
          <div className="djm-information-top">
            <img src={require('./images/top_img.jfif')} alt="img" />
          </div>
          <div className="djm-information-content">
            <HeadPortrait
              handleChangeImg={this.handleChangeImg}
              headPortraitUrl={headPortraitUrl}
              language={language}
              {...this.props}
            />
            <div className="djm-information-userName">
              <h2 className="djm-information-userName-h2">
                {!isChangeName ? (
                  <React.Fragment>
                    {userName}
                    <span
                      className="djm-information-change"
                      onClick={this.handleClickUserName}
                      onKeyDown={this.handleClickUserName}
                      role="button"
                      tabIndex={0}
                    >
                      <i className="iconfont icon-pen" />
                      {language.changeText}
                    </span>
                  </React.Fragment>
                ) : (
                  <span className="djm-information-userName-change">
                    <input
                      type="text"
                      className="djm-information-change-input"
                      onChange={this.handleChangeUser}
                    />
                    <span
                      onClick={event => this.handleClickNameButton(true, event)}
                      onKeyDown={event => this.handleClickNameButton(true, event)}
                      role="button"
                      tabIndex={0}
                      className="djm-information-sure"
                    >
                      {language.changeSure}
                    </span>
                    <span
                      onClick={event => this.handleClickNameButton(false, event)}
                      onKeyDown={event => this.handleClickNameButton(false, event)}
                      role="button"
                      tabIndex={0}
                      className="djm-information-cancel"
                    >
                      {language.changeCancel}
                    </span>
                  </span>
                )}
              </h2>
              <ul className="djm-information-userInfoList">
                {userInfoArr.map((item, index) => (
                  /* eslint-disable */
                  <li key={item.title}>
                    <b>{language[item.title]}</b>
                    {item.content === '' && changeInfo[item.title] ? (
                      <AddText
                        {...this.props}
                        handleClickChange={this.handleClickChange}
                        title={item.title}
                        language={language}
                        index={index}
                      />
                    ) : changeInfo[item.title] ? (
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
                  /* eslint-enable */
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Information);
