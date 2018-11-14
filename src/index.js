import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";

import createStore from "./redux";

import Webpage from "./Webpage";
import Header from "./component/header";
import Footer from "./component/footer";

import language from "./public/language";

import "./index.css";

const store = createStore();

// 语言
// const lang = store.getState().headerStore.language;
function languageFun() {
  const lang = store.getState().headerStore.language;
  return lang;
}

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Header language={language[languageFun()]} languageFun={languageFun} />
      <Webpage language={language[languageFun()]} />
      <Footer />
    </React.Fragment>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
