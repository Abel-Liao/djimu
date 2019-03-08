import React from 'react';
import { connect } from 'react-redux';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';

import dateFun from '../../public/date';

import './edit.css';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(null),
      infoArr: ['date', 'days', 'peoples', 'cost'],
      popDisplay: false,
      editImgUrl: null,
      content: {
        id: null,
        date: '',
        writeTime: '',
        days: '',
        peoples: '',
        cost: '',
        imgUrl: null,
        title: '',
        comments: 0,
        authorName: null,
        readNumber: 0,
        givelike: {
          number: 0,
          isChoose: false,
        },
        collection: {
          number: 0,
          isChoose: false,
        },
        content: null,
      },
    };
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleClickImgButton = this.handleClickImgButton.bind(this);
    this.changeEdit = this.changeEdit.bind(this);
    this.chooseImg = this.chooseImg.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.loginStore.userName !== prevState.content.authorName) {
      return {
        content: Object.assign(prevState.content, prevState.content, {
          authorName: nextProps.loginStore.userName,
          id: nextProps.articleStore.length,
        }),
      };
    }
    return null;
  }

  async componentDidMount() {
    // 假设此处从服务端获取html格式的编辑器内容
    // const htmlContent = await fetchEditorContent()
    // 使用BraftEditor.createEditorState将html字符串转换为编辑器需要的editorStat
    this.setState({
      // editorState: BraftEditor.createEditorState(htmlContent)
    });
  }

  submitContent = async () => {
    // 在编辑器获得焦点时按下ctrl+s会执行此方法
    // 编辑器内容提交到服务端之前，可直接调用editorState.toHTML()来获取HTML格式的内容
    // const htmlContent = this.state.editorState.toHTML();
    // const result = await saveEditorContent(htmlContent)
  };

  handleEditorChange = (editorState) => {
    this.setState({ editorState }, () => {
      const { content } = this.state;
      this.setState({
        content: Object.assign({}, content, {
          /* eslint-disable */
          content: this.state.editorState.toHTML(),
          /* eslint-enable */
        }),
      });
    });
  };

  handleClickImgButton() {
    this.setState(state => ({ popDisplay: !state.popDisplay }));
    this.setState({ editImgUrl: null });
  }

  changeInputVlaue(elementName, value) {
    const { content } = this.state;
    this.setState({
      content: Object.assign({}, content, {
        [elementName]: value,
      }),
    });
  }

  changeEdit(elementName, event) {
    if (elementName === 'title' || elementName === 'date') {
      this.changeInputVlaue(elementName, event.target.value);
      /* eslint-disable */
    } else if (!isNaN(event.target.value)) {
      /* eslint-enable */
      this.changeInputVlaue(elementName, event.target.value);
    } else {
      this.changeInputVlaue(elementName, '');
    }
  }

  chooseImg(event) {
    const fileReader = new FileReader();
    const temporary = event.target.files[0];
    if (
      (temporary.type === 'image/jpeg'
        || temporary.type === 'image/png'
        || temporary.type === 'image/jpg')
      && parseInt(temporary.size / 1024, 10) < 1024
    ) {
      fileReader.readAsDataURL(temporary);
      fileReader.onload = (e) => {
        this.setState({ editImgUrl: e.target.result });
      };
    } else {
      console.log('图片太大，或者格式不正确');
    }
  }

  handleClickSubmit() {
    const { content } = this.state;
    this.setState(
      {
        content: Object.assign({}, content, {
          writeTime: dateFun(new Date()),
        }),
      },
      () => {
        const propsObj = this.props;
        propsObj.dispatch({
          type: 'ADD_ARTICLE',
          content,
        });
      },
    );
  }

  render() {
    const {
      infoArr, content, popDisplay, editImgUrl, editorState,
    } = this.state;
    return (
      <div className="djm-edit">
        <div className="djm-edit-header">
          <p className="djm-edit-header-title">
            <span>标题</span>
            <input onChange={event => this.changeEdit('title', event)} type="text" />
          </p>
        </div>
        <ul className="djm-edit-info clearfloat">
          {infoArr.map(item => (
            <li key={item}>
              <span>{item}</span>
              <input
                onChange={event => this.changeEdit(item, event)}
                type="text"
                value={content[item]}
              />
            </li>
          ))}
        </ul>
        <div className="djm-edit-img">
          <span className="djm-edit-chooseImg">选择图片</span>
          <input type="button" value="选择图片" onClick={this.handleClickImgButton} />
          {popDisplay ? (
            <div className="djm-edit-img-pop">
              <div className="djm-edit-img-pop-content">
                <div>
                  <input onChange={this.chooseImg} type="file" accept="image/png, image/jpeg" />
                  <input type="button" value="选择文章已有图片" />
                </div>
                <img src={editImgUrl} alt="" className="edit-pop-img" />
                <input
                  type="submit"
                  className="edit-pop-cancel"
                  onClick={this.handleClickImgButton}
                  value="取消"
                />
              </div>
            </div>
          ) : null}
        </div>
        <BraftEditor
          value={editorState}
          onChange={(event) => {
            this.handleEditorChange(event);
            // this.changeEdit("content", event);
          }}
          onSave={this.submitContent}
        />
        <div className="djm-edit-submit">
          <button onClick={this.handleClickSubmit} type="button" onKeyDown={this.handleClickSubmit}>
            提交
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Edit);
