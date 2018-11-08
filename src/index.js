import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";

import Web from "./Web";
import Header from "./component/header";
import Footer from "./component/footer";

import "./index.css";

ReactDOM.render(
  <React.Fragment>
    <Header />
    <Web />
    <Footer />
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
