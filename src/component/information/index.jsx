import React from "react";
import { connect } from "react-redux";

class Information extends React.Component {
  render() {
    return <div>This is information page!</div>;
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(Information);
