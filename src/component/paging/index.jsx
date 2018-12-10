import React from "react";
import { connect } from "react-redux";

import "./paging.css";

class Paging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageArr: Array.from(
        { length: props.pageLength ? props.pageLength : 1 },
        (v, k) => k
      ),
      choosePage: 0
    };
    this.handleClickPage = this.handleClickPage.bind(this);
  }
  handleClickPage(indexNum) {
    this.setState({ choosePage: indexNum });
  }
  render() {
    return (
      <div className="djm-paging clearfloat">
        {this.state.pageArr.map(index => (
          <span
            className={
              index === this.state.choosePage ? "dji-paging-choose" : null
            }
            key={index}
            onClick={event => this.handleClickPage(index, event)}
          >
            {index + 1}
          </span>
        ))}
      </div>
    );
  }
}

function mapStateToprops(state, ownProps) {
  return state;
}

export default connect(mapStateToprops)(Paging);
