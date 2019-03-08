import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { connect } from 'react-redux';

import Routers from './router';

function Webpage() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     language: props.languageStore.language
  //   };
  // }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (prevState.language !== nextProps.languageStore.language) {
  //     return { language: nextProps.languageStore.language };
  //   }
  //   return null;
  // }
  return (
    <React.Fragment>
      <Router>
        <Routers />
      </Router>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Webpage);
