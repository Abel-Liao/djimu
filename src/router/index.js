import React from "react";
import { Route, Redirect } from "react-router-dom";

import Index from "../component/index";
import Login from "../component/login";
import Register from "../component/register";
import Header from "../component/header";
import Footer from "../component/footer";
import Information from "../component/information";

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

const routeArrLogin = [
  {
    path: "/information",
    exact: false,
    component: [Header, Information]
  }
];

function routeFun(arr, needLoginBool = false) {
  const isLogin = sessionStorage.getItem("isLogin");
  return arr.map((route, index) => (
    <Route
      key={index}
      exact={route.exact}
      path={route.path}
      // component={route.component}
      render={props =>
        route.component.map((RouteLink, index) =>
          !needLoginBool ? (
            <RouteLink key={index} {...props} />
          ) : isLogin === "true" ? (
            <RouteLink key={index} {...props} />
          ) : (
            <Redirect
              key={index}
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        )
      }
    />
  ));
}

const Router = () => (
  <React.Fragment>
    {routeFun(routeArr)}
    {routeFun(routeArrLogin, true)}
  </React.Fragment>
);

export default Router;
