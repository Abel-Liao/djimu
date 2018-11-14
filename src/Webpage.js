import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { connect } from "react-redux";

import Routers from "./router";

class Webpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: props.languageStore.language
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.language !== nextProps.languageStore.language) {
      return { language: nextProps.languageStore.language };
    }
    return null;
  }
  render() {
    return (
      <React.Fragment>
        <Router>
          <Routers />
        </Router>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

export default connect(mapStateToProps)(Webpage);
