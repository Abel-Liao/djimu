import React from "react";
import { connect } from "react-redux";

const Footer = props => {
  return (
    <footer>
      <h2>This is footer page!</h2>
    </footer>
  );
};

function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(
  mapStateToProps
  // mapDispatchToProps
)(Footer);
