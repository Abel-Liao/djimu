import React from 'react';
import { connect } from 'react-redux';

import './search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chooseSearch: {
        destination: true,
        strategy: false,
        group: false,
      },
      displayName: 'destinationDis',
    };
    this.onClickSearch = this.onClickSearch.bind(this);
  }

  onClickSearch(searchName) {
    this.setState({ displayName: `${searchName}Dis` });
    const { chooseSearch } = this.state;
    /* eslint-disable */
    for (const key in chooseSearch) {
      if (key === searchName) {
        this.setState(
          Object.assign(chooseSearch, chooseSearch, {
            [searchName]: true,
          }),
        );
      } else {
        this.setState(
          Object.assign(chooseSearch, chooseSearch, {
            [key]: false,
          }),
        );
      }
    }
    /* eslint-enable */
  }

  render() {
    const { displayName, chooseSearch } = this.state;
    const propsObj = this.props;
    const language = propsObj.languageStore.language.indexSearch;
    return (
      <div className="djm-index-search">
        <ul className="djm-index-search-choose clearfloat">
          <li
            /* eslint-disable */
            className={chooseSearch.destination ? 'choose-search' : null}
            onClick={event => this.onClickSearch('destination', event)}
            onKeyDown={event => this.onClickSearch('destination', event)}
            role="button"
            tabIndex={0}
          >
            <span className="choose-search-round">
              <i />
            </span>
            {language.destination}
          </li>
          <li
            className={chooseSearch.strategy ? 'choose-search' : null}
            onClick={event => this.onClickSearch('strategy', event)}
            onKeyDown={event => this.onClickSearch('strategy', event)}
            role="button"
            tabIndex={0}
          >
            <span className="choose-search-round">
              <i />
            </span>
            {language.strategy}
          </li>
          <li
            className={chooseSearch.group ? 'choose-search' : null}
            onClick={event => this.onClickSearch('group', event)}
            onKeyDown={event => this.onClickSearch('group', event)}
            role="button"
            tabIndex={0}
            /* eslint-enable */
          >
            <span className="choose-search-round">
              <i />
            </span>
            {language.group}
          </li>
        </ul>
        <div className="djm-index-search-input">
          <input type="text" placeholder={language[displayName]} />
          <i className="iconfont icon-search" />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(Search);
