import React from "react";
import { Route } from "react-router-dom";

import Index from "../component/index";
import Login from "../component/login";
import Register from "../component/register";
import Header from "../component/header";
import Footer from "../component/footer";

const routeArr = [
  {
    path: "/",
    exact: true,
    component: [Header, Index, Footer]
  },
  {
    path: "/login",
    exact: false,
    component: [Login]
  },
  {
    path: "/register",
    exact: false,
    component: [Register]
  }
];

function routeFun(arr) {
  return arr.map((route, index) => (
    <Route
      key={index}
      exact={route.exact}
      path={route.path}
      // component={route.component}
      render={props =>
        route.component.map((Routeree, index) => (
          <Routeree key={index} {...props} />
        ))
      }
    />
  ));
}

const Router = () => <React.Fragment>{routeFun(routeArr)}</React.Fragment>;

export default Router;
