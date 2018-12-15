import React from "react";
import { connect } from "react-redux";
import BraftEditor from "braft-editor";
import "braft-editor/dist/index.css";

import dateFun from "../../public/date";

import "./edit.css";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: BraftEditor.createEditorState(null),
      infoArr: ["date", "days", "peoples", "cost"],
      content: {
        id: props.articleStore.length,
        date: "",
        writeTime: "",
        days: "",
        peoples: "",
        cost: "",
        imgUrl: null,
        title: "",
        comments: 0,
        authorName: props.loginStore.userName,
        readNumber: 0,
        givelike: {
          number: 0,
          isChoose: false
        },
        collection: {
          number: 0,
          isChoose: false
        },
        content: null
      }
    };
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.changeEdit = this.changeEdit.bind(this);
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
  handleEditorChange = editorState => {
    this.setState({ editorState }, () => {
      this.setState({
        content: Object.assign({}, this.state.content, {
          content: this.state.editorState.toHTML()
        })
      });
    });
  };
  changeInputVlaue(elementName, value) {
    this.setState({
      content: Object.assign({}, this.state.content, {
        [elementName]: value
      })
    });
  }
  changeEdit(elementName, event) {
    if (elementName === "title" || elementName === "date") {
      this.changeInputVlaue(elementName, event.target.value);
    } else {
      if (!isNaN(event.target.value)) {
        this.changeInputVlaue(elementName, event.target.value);
      } else {
        this.changeInputVlaue(elementName, "");
      }
    }
  }
  handleClickSubmit() {
    this.setState(
      {
        content: Object.assign({}, this.state.content, {
          writeTime: dateFun(new Date())
        })
      },
      () => {
        this.props.dispatch({
          type: "ADD_ARTICLE",
          content: this.state.content
        });
      }
    );
  }
  render() {
    return (
      <div className="djm-edit">
        <div className="djm-edit-header">
          <p className="djm-edit-header-title">
            <span>标题</span>
            <input
              onChange={event => this.changeEdit("title", event)}
              type="text"
            />
          </p>
        </div>
        <ul className="djm-edit-info clearfloat">
          {this.state.infoArr.map((item, index) => (
            <li key={index}>
              <span>{item}</span>
              <input
                onChange={event => this.changeEdit(item, event)}
                type="text"
                value={this.state.content[item]}
              />
            </li>
          ))}
        </ul>
        <BraftEditor
          value={this.state.editorState}
          onChange={event => {
            this.handleEditorChange(event);
            // this.changeEdit("content", event);
          }}
          onSave={this.submitContent}
        />
        <div className="djm-edit-submit">
          <button onClick={this.handleClickSubmit}>提交</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

export default connect(mapStateToProps)(Edit);
