import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import createStore from "./redux";

import Web from "./Web";
import Header from "./component/header";
import Footer from "./component/footer";

import language from "./public/language";

import "./index.css";

const store = createStore();

// 获取浏览器语言
// let lang = navigator.language || navigator.userLanguage;
let lang = "zh-CN";

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Header language={language[lang]} />
      <Web language={language[lang]} />
      <Footer />
    </React.Fragment>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
