import React from 'react';
import { connect } from 'react-redux';

import SmallPage from './smallPage';
import BigPage from './bigPage';

import './paging.css';

class Paging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageArr: Array.from({ length: props.pageLength ? props.pageLength : 1 }, (v, k) => k),
      choosePage: sessionStorage.getItem('pageNum') ? sessionStorage.getItem('pageNum') : 0,
      displayList: props.displayList ? props.displayList : null,
      midPage: 4,
    };
    this.handleClickPage = this.handleClickPage.bind(this);
    this.handleClickNextPrevious = this.handleClickNextPrevious.bind(this);
    this.nextPreviousFun = this.nextPreviousFun.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.displayList !== prevState.displayList) {
      return { displayList: nextProps.displayList, choosePage: 0 };
    }
    return null;
  }

  handleClickPage(indexNum) {
    const propsObj = this.props;
    const { choosePage, pageArr } = this.state;
    this.setState({ choosePage: indexNum }, () => {
      propsObj.changePage(choosePage);
    });
    if (indexNum < 5) {
      this.setState({ midPage: 4 });
    } else if (indexNum > pageArr.length - 6) {
      this.setState({ midPage: pageArr.length - 3 });
    } else {
      this.setState({ midPage: indexNum + 1 });
    }
  }

  handleClickNextPrevious(isNext) {
    const { choosePage, pageArr } = this.state;
    const temporary = choosePage;
    if (isNext && temporary !== pageArr.length - 1) {
      this.nextPreviousFun(isNext);
    } else if (!isNext && temporary !== 0) {
      this.nextPreviousFun(isNext);
    }
  }

  nextPreviousFun(isNext) {
    this.setState(
      state => ({
        choosePage: state.choosePage + (1 * isNext ? 1 : -1),
      }),
      () => {
        const { choosePage, pageArr } = this.state;
        const propsObj = this.props;
        if (choosePage >= 5 && choosePage < pageArr.length - 5) {
          this.setState(() => ({ midPage: choosePage + 1 }));
        } else if (choosePage < 5) {
          this.setState({ midPage: 4 });
        } else if (choosePage >= pageArr.length - 5) {
          this.setState(state => ({
            midPage: state.pageArr.length - 3,
          }));
        }
        propsObj.changePage(choosePage);
      },
    );
  }

  render() {
    // const temporary = this.state.pageArr;
    const { choosePage, midPage } = this.state;
    const { pageLength } = this.props;
    const temporary = Array.from({ length: pageLength || 1 }, (v, k) => k);
    const temporaryChoos = parseInt(choosePage, 10);
    return (
      <div className="djm-paging">
        {temporary.length === 1 ? null : (
          <span
            className={temporaryChoos === 0 ? 'donot-choose' : ''}
            onClick={event => this.handleClickNextPrevious(false, event)}
            onKeyDown={event => this.handleClickNextPrevious(false, event)}
            role="button"
            tabIndex={0}
            /* eslint-disable */
          >
            &lt;
          </span>
        )}
        {temporary.length > 10 ? (
          <BigPage
            page={temporary}
            midPage={midPage}
            handleClickPage={this.handleClickPage}
            choosePage={temporaryChoos}
            {...this.props}
          />
        ) : (
          <SmallPage
            page={temporary}
            {...this.props}
            choosePage={temporaryChoos}
            handleClickPage={this.handleClickPage}
          />
        )}
        {temporary.length === 1 ? null : (
          <span
            className={temporaryChoos === temporary.length - 1 ? 'donot-choose' : ''}
            onClick={event => this.handleClickNextPrevious(true, event)}
            onKeyDown={event => this.handleClickNextPrevious(true, event)}
            role="button"
            tabIndex={0}
          >
            &gt;
          </span>
          /* eslint-enable */
        )}
      </div>
    );
  }
}

function mapStateToprops(state) {
  return state;
}

export default connect(mapStateToprops)(Paging);
