import React from "react";
import { connect } from "react-redux";

import SmallPage from "./smallPage";
import BigPage from "./bigPage";

import "./paging.css";

class Paging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageArr: Array.from(
        { length: props.pageLength ? props.pageLength : 1 },
        (v, k) => k
      ),
      choosePage: sessionStorage.getItem("pageNum")
        ? sessionStorage.getItem("pageNum")
        : 0,
      midPage: 4
    };
    this.handleClickPage = this.handleClickPage.bind(this);
    this.handleClickNextPrevious = this.handleClickNextPrevious.bind(this);
    this.nextPreviousFun = this.nextPreviousFun.bind(this);
  }
  handleClickPage(indexNum) {
    this.setState({ choosePage: indexNum }, () => {
      this.props.changePage(this.state.choosePage);
    });
    if (indexNum < 5) {
      this.setState({ midPage: 4 });
    } else if (indexNum > this.state.pageArr.length - 6) {
      this.setState({ midPage: this.state.pageArr.length - 3 });
    } else {
      this.setState({ midPage: indexNum + 1 });
    }
  }
  handleClickNextPrevious(isNext) {
    const temporary = this.state.choosePage;
    if (isNext && temporary !== this.state.pageArr.length - 1) {
      this.nextPreviousFun(isNext);
    } else if (!isNext && temporary !== 0) {
      this.nextPreviousFun(isNext);
    }
  }
  nextPreviousFun(isNext) {
    this.setState(
      state => ({
        choosePage: state.choosePage + (1 * isNext ? 1 : -1)
      }),
      () => {
        const temporary = this.state.choosePage;
        if (temporary >= 5 && temporary < this.state.pageArr.length - 5) {
          this.setState(state => ({ midPage: temporary + 1 }));
        } else if (temporary < 5) {
          this.setState({ midPage: 4 });
        } else if (temporary >= this.state.pageArr.length - 5) {
          this.setState(state => ({
            midPage: state.pageArr.length - 3
          }));
        }
        this.props.changePage(temporary);
      }
    );
  }
  render() {
    const temporary = this.state.pageArr;
    const temporaryChoos = parseInt(this.state.choosePage);
    return (
      <div className="djm-paging clearfloat">
        {temporary.length === 1 ? null : (
          <span
            className={temporaryChoos === 0 ? "donot-choose" : ""}
            onClick={event => this.handleClickNextPrevious(false, event)}
          >
            &lt;
          </span>
        )}
        {temporary.length > 10 ? (
          <BigPage
            page={temporary}
            midPage={this.state.midPage}
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
            className={
              temporaryChoos === temporary.length - 1 ? "donot-choose" : ""
            }
            onClick={event => this.handleClickNextPrevious(true, event)}
          >
            &gt;
          </span>
        )}
      </div>
    );
  }
}

function mapStateToprops(state, ownProps) {
  return state;
}

export default connect(mapStateToprops)(Paging);
