import React from "react";
import { connect } from "react-redux";

import Banner from "../banner";
import UserArticle from "../userArticle";

import "./index.css";

function Index(props) {
  return (
    <div className="djm-index">
      <div className="djm-index-main">
        <Banner {...props} />
        <UserArticle {...props} />
      </div>
    </div>
  );
}
function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(Index);
