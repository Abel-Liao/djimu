import React from 'react';
import { connect } from 'react-redux';

import dataFun from '../../public/date';

import './myArticle.css';

class MyArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redactBool: false,
      chooseArticle: [],
      chooseNumber: 0,
      allChooseBool: true,
    };
    this.onHandleClickArticle = this.onHandleClickArticle.bind(this);
    this.handleChooseArticle = this.handleChooseArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.redactArticle = this.redactArticle.bind(this);
    this.chooseAllArticle = this.chooseAllArticle.bind(this);
    this.deleteChoose = this.deleteChoose.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const temporary = nextProps.articleStore.length;
    if (prevState.chooseArticle.length !== temporary) {
      const temporaryBool = [];
      for (let i = 0; i < temporary; i += 1) {
        temporaryBool.push(false);
      }
      return { chooseArticle: temporaryBool };
    }
    return null;
  }

  onHandleClickArticle(idNumber, indexNumber) {
    const propsObj = this.props;
    propsObj.history.push(`/readArticle?id=${idNumber}&index=${indexNumber}`);
  }

  deleteArticle(idNumber) {
    const propsObj = this.props;
    sessionStorage.removeItem('pageNum');
    propsObj.dispatch({ type: 'DELETE_ARTICLE', articleId: idNumber });
  }

  deleteChoose() {
    sessionStorage.removeItem('pageNum');
    const { chooseArticle } = this.state;
    const propsObj = this.props;
    const temporary = chooseArticle;
    for (let i = temporary.length; i >= 0; i -= 1) {
      if (temporary[i]) {
        this.deleteArticle(propsObj.articleStore[i].id);
      }
    }
  }

  redactArticle() {
    this.setState(state => ({ redactBool: !state.redactBool }));
  }

  handleChooseArticle(indexNumber) {
    const { chooseArticle } = this.state;
    this.setState(
      Object.assign(chooseArticle, chooseArticle, {
        [indexNumber]: !chooseArticle[indexNumber],
      }),
      () => {
        /* eslint-disable */
        const temporary = this.state.chooseArticle;
        /* eslint-enable */
        let number = 0;
        for (let i = 0; i < temporary.length; i += 1) {
          if (temporary[i]) {
            number += 1;
          }
        }
        if (number === temporary.length) {
          this.setState({ allChooseBool: false });
        } else {
          this.setState({ allChooseBool: true });
        }
        this.setState({ chooseNumber: number });
      },
    );
  }

  chooseAllArticle(clickName = true) {
    const { chooseArticle } = this.state;
    for (let i = 0; i < chooseArticle.length; i += 1) {
      this.setState(
        Object.assign(chooseArticle, chooseArticle, {
          [i]: !!clickName,
        }),
      );
    }
    if (!clickName) {
      this.setState({ chooseNumber: 0 });
      this.setState({ allChooseBool: true });
    } else {
      this.setState({ chooseNumber: chooseArticle.length });
      this.setState({ allChooseBool: false });
    }
  }

  // componentDidMount() {
  //   console.log(this.props.articleStore.length);
  // }

  render() {
    const {
      redactBool, allChooseBool, chooseNumber, chooseArticle,
    } = this.state;
    const propsObj = this.props;
    return (
      <div className="djm-myArticle">
        <p className="djm-myArticle-header">
          {redactBool ? (
            <React.Fragment>
              {allChooseBool ? (
                <span
                  className="djm-myArticle-header-all"
                  onClick={this.chooseAllArticle}
                  onKeyDown={this.chooseAllArticle}
                  role="button"
                  /* eslint-disable */
                  tabIndex={0}
                >
                  全选
                </span>
              ) : (
                <span
                  className="djm-myArticle-header-all"
                  onClick={event => this.chooseAllArticle(false, event)}
                  onKeyDown={event => this.chooseAllArticle(false, event)}
                  role="button"
                  tabIndex={0}
                >
                  取消全选
                </span>
              )}
              <span
                onClick={event => {
                  this.redactArticle(event);
                  this.chooseAllArticle(false, event);
                }}
                onKeyDown={event => {
                  this.redactArticle(event);
                  this.chooseAllArticle(false, event);
                }}
                role="button"
                tabIndex={0}
                className="djm-myArticle-header-cancel"
              >
                取消
              </span>
              {chooseNumber > 1 ? (
                <span
                  onClick={event => {
                    this.deleteChoose(event);
                    this.redactArticle(event);
                  }}
                  onKeyDown={event => {
                    this.deleteChoose(event);
                    this.redactArticle(event);
                  }}
                  role="button"
                  tabIndex={0}
                  className="djm-myArticle-header-delete"
                >
                  删除选择
                </span>
              ) : null}
            </React.Fragment>
          ) : (
            <span
              onClick={this.redactArticle}
              onKeyDown={this.redactArticle}
              role="button"
              tabIndex={0}
            >
              编辑
            </span>
          )}
        </p>
        <ul className="djm-myArticle-main">
          {propsObj.articleStore.map((item, index) => (
            <li key={item.id}>
              {redactBool ? (
                <span
                  onClick={event => this.handleChooseArticle(index, event)}
                  onKeyDown={event => this.handleChooseArticle(index, event)}
                  role="button"
                  tabIndex={0}
                  className={`choose-input ${chooseArticle[index] ? 'iconfont icon-tick' : ''}`}
                />
              ) : null}
              <span className="djm-myArticle-main-time">{dataFun(item.writeTime)}</span>
              <span
                onClick={event => this.onHandleClickArticle(item.id, index, event)}
                onKeyDown={event => this.onHandleClickArticle(item.id, index, event)}
                role="button"
                tabIndex={0}
                className="djm-myArticle-main-title"
              >
                {item.title}
              </span>
              {redactBool ? (
                <span
                  className="djm-myArticle-main-delete"
                  onClick={event => this.deleteArticle(item.id, event)}
                  onKeyDown={event => this.deleteArticle(item.id, event)}
                  role="button"
                  tabIndex={0}
                >
                  DELETE
                </span>
              ) : /* eslint-disable */
              null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(MyArticle);
