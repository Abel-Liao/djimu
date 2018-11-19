import React from "react";
import { connect } from "react-redux";

// import Banner from "../banner";
import UserArticle from "../userArticle";

import "./index.css";

class Index extends React.Component {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   return null;
  // }
  render() {
    return (
      <div className="djm-index">
        <div className="djm-index-main">
          {/* <Banner /> */}
          <UserArticle />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state, ownProps) {
  return state;
}
export default connect(mapStateToProps)(Index);
