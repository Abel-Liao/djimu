import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Routers from "./router";

class Webpage extends Component {
  render() {
    return (
      <Router>
        <Routers />
      </Router>
    );
  }
}

export default Webpage;
