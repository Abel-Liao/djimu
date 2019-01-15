import React from "react";
import { connect } from "react-redux";

import Animation from "../animation";

import "./footer.css";

const Footer = props => {
  return (
    <footer className="djm-footer">
      <Animation />
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
