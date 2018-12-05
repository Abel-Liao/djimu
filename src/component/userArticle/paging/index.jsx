import React from "react";
import { connect } from "react-redux";

class Paging extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageArr: Array.from(
        { length: props.pageLength ? props.pageLength : 1 },
        (v, k) => k
      )
    };
  }
  render() {
    return (
      <div className="djm-index-paging clearfloat">
        {this.state.pageArr.map(index => (
          <span key={index}>{index + 1}</span>
        ))}
      </div>
    );
  }
}

function mapStateToprops(state, ownProps) {
  return state;
}

export default connect(mapStateToprops)(Paging);
