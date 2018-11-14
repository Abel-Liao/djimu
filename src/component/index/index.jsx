import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Index = props => {
  return (
    <div>
      <h2>This is index page!</h2>
      <Link to="/login">Go to login page!</Link>
    </div>
  );
};
function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(Index);
