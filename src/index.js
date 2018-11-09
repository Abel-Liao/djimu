import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import configureStore from "./redux";

import Web from "./Web";
import Header from "./component/header";
import Footer from "./component/footer";

import "./index.css";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Header />
      <Web />
      <Footer />
    </React.Fragment>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
