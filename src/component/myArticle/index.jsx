import React from "react";
import { connect } from "react-redux";

import dataFun from "../../public/date";

import "./myArticle.css";

class MyArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redactBool: false,
      chooseArticle: [],
      chooseNumber: 0,
      allChooseBool: true
    };
    this.onHandleClickArticle = this.onHandleClickArticle.bind(this);
    this.handleChooseArticle = this.handleChooseArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.redactArticle = this.redactArticle.bind(this);
    this.chooseAllArticle = this.chooseAllArticle.bind(this);
    this.deleteChoose = this.deleteChoose.bind(this);
  }
  onHandleClickArticle(idNumber, indexNumber) {
    this.props.history.push(`/readArticle?id=${idNumber}&index=${indexNumber}`);
  }
  deleteArticle(idNumber) {
    sessionStorage.removeItem("pageNum");
    this.props.dispatch({ type: "DELETE_ARTICLE", articleId: idNumber });
  }
  deleteChoose() {
    sessionStorage.removeItem("pageNum");
    const temporary = this.state.chooseArticle;
    for (let i = temporary.length; i >= 0; i--) {
      if (temporary[i]) {
        this.deleteArticle(this.props.articleStore[i].id);
      }
    }
  }
  redactArticle() {
    this.setState(state => ({ redactBool: !state.redactBool }));
  }
  handleChooseArticle(indexNumber) {
    this.setState(
      Object.assign(this.state.chooseArticle, this.state.chooseArticle, {
        [indexNumber]: !this.state.chooseArticle[indexNumber]
      }),
      () => {
        const temporary = this.state.chooseArticle;
        let number = 0;
        for (let i = 0; i < temporary.length; i++) {
          if (temporary[i]) {
            number++;
          }
        }
        if (number === temporary.length) {
          this.setState({ allChooseBool: false });
        } else {
          this.setState({ allChooseBool: true });
        }
        this.setState({ chooseNumber: number });
      }
    );
  }
  chooseAllArticle(clickName = true) {
    const temporary = this.state.chooseArticle;
    for (let i = 0; i < temporary.length; i++) {
      this.setState(
        Object.assign(this.state.chooseArticle, this.state.chooseArticle, {
          [i]: !clickName ? false : true
        })
      );
    }
    if (!clickName) {
      this.setState({ chooseNumber: 0 });
      this.setState({ allChooseBool: true });
    } else {
      this.setState({ chooseNumber: temporary.length });
      this.setState({ allChooseBool: false });
    }
  }
  // componentDidMount() {
  //   console.log(this.props.articleStore.length);
  // }
  static getDerivedStateFromProps(nextProps, prevState) {
    const temporary = nextProps.articleStore.length;
    if (prevState.chooseArticle.length !== temporary) {
      let temporaryBool = [];
      for (let i = 0; i < temporary; i++) {
        temporaryBool.push(false);
      }
      return { chooseArticle: temporaryBool };
    }
    return null;
  }
  render() {
    return (
      <div className="djm-myArticle">
        <p className="djm-myArticle-header">
          {this.state.redactBool ? (
            <React.Fragment>
              {this.state.allChooseBool ? (
                <span
                  className="djm-myArticle-header-all"
                  onClick={this.chooseAllArticle}
                >
                  全选
                </span>
              ) : (
                <span
                  className="djm-myArticle-header-all"
                  onClick={event => this.chooseAllArticle(false, event)}
                >
                  取消全选
                </span>
              )}
              <span
                onClick={event => {
                  this.redactArticle(event);
                  this.chooseAllArticle(false, event);
                }}
                className="djm-myArticle-header-cancel"
              >
                取消
              </span>
              {this.state.chooseNumber > 1 ? (
                <span
                  onClick={event => {
                    this.deleteChoose(event);
                    this.redactArticle(event);
                  }}
                  className="djm-myArticle-header-delete"
                >
                  删除选择
                </span>
              ) : null}
            </React.Fragment>
          ) : (
            <span onClick={this.redactArticle}>编辑</span>
          )}
        </p>
        <ul className="djm-myArticle-main">
          {this.props.articleStore.map((item, index) => (
            <li key={index}>
              {this.state.redactBool ? (
                <span
                  onClick={event => this.handleChooseArticle(index, event)}
                  className={`choose-input ${
                    this.state.chooseArticle[index] ? "iconfont icon-tick" : ""
                  }`}
                />
              ) : null}
              <span className="djm-myArticle-main-time">
                {dataFun(item.writeTime)}
              </span>
              <span
                onClick={event =>
                  this.onHandleClickArticle(item.id, index, event)
                }
                className="djm-myArticle-main-title"
              >
                {item.title}
              </span>
              {this.state.redactBool ? (
                <span
                  className="djm-myArticle-main-delete"
                  onClick={event => this.deleteArticle(item.id, event)}
                >
                  DELETE
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

export default connect(mapStateToProps)(MyArticle);
