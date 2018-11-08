import React from "react";
import { Route } from "react-router-dom";

import Index from "../component/index";
import Login from "../component/login";

const routeArr = [
  {
    path: "/",
    exact: true,
    component: Index
  },
  {
    path: "/login",
    exact: false,
    component: Login
  }
];

function routeFun(arr) {
  return arr.map((route, index) => (
    <Route
      key={index}
      exact={route.exact}
      path={route.path}
      component={route.component}
    />
  ));
}

const Router = () => <React.Fragment>{routeFun(routeArr)}</React.Fragment>;

export default Router;
