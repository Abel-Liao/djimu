import React from "react";
import { connect } from "react-redux";

import "./search.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseSearch: {
        destination: true,
        strategy: false,
        group: false
      },
      displayName: "destinationDis"
    };
    this.onClickSearch = this.onClickSearch.bind(this);
  }
  onClickSearch(searchName) {
    this.setState({ displayName: searchName + "Dis" });
    for (const key in this.state.chooseSearch) {
      if (key === searchName) {
        this.setState(
          Object.assign(this.state.chooseSearch, this.state.chooseSearch, {
            [searchName]: true
          })
        );
      } else {
        this.setState(
          Object.assign(this.state.chooseSearch, this.state.chooseSearch, {
            [key]: false
          })
        );
      }
    }
  }
  render() {
    const language = this.props.languageStore.language.indexSearch;
    return (
      <div className="djm-index-search">
        <ul className="djm-index-search-choose clearfloat">
          <li
            className={
              this.state.chooseSearch.destination ? "choose-search" : null
            }
            onClick={event => this.onClickSearch("destination", event)}
          >
            <span className="choose-search-round">
              <i />
            </span>
            {language.destination}
          </li>
          <li
            className={
              this.state.chooseSearch.strategy ? "choose-search" : null
            }
            onClick={event => this.onClickSearch("strategy", event)}
          >
            <span className="choose-search-round">
              <i />
            </span>
            {language.strategy}
          </li>
          <li
            className={this.state.chooseSearch.group ? "choose-search" : null}
            onClick={event => this.onClickSearch("group", event)}
          >
            <span className="choose-search-round">
              <i />
            </span>
            {language.group}
          </li>
        </ul>
        <div className="djm-index-search-input">
          <input type="text" placeholder={language[this.state.displayName]} />
          <i className="iconfont icon-search" />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(Search);
