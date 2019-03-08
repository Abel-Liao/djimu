import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import Header from '../component/header';
import Footer from '../component/footer';
import Index from '../component/index';
import Login from '../component/login';
import { Register, ChangePaw, ForgetPaw } from '../component/regChaForget';
import Information from '../component/information';
import ReadArticle from '../component/readArticle';
import MyArticle from '../component/myArticle';
import Edit from '../component/edit';

const routeArr = [
  {
    path: '/',
    component: [Header, Index, Footer],
  },
  {
    path: '/login',
    component: [Login],
  },
  {
    path: '/register',
    component: [Register],
  },
  {
    path: '/forget',
    component: [ForgetPaw],
  },
  {
    path: '/change',
    component: [ChangePaw],
  },
  {
    path: '/readArticle',
    component: [Header, ReadArticle, Footer],
  },
];

const routeArrLogin = [
  {
    path: '/information',
    component: [Header, Information],
  },
  {
    path: '/myarticle',
    component: [Header, MyArticle, Footer],
  },
  {
    path: '/edit',
    component: [Header, Edit, Footer],
  },
];

// ???? 可以用redux实现
/* eslint-disable */
let temporary = [];
function lastRouter(props) {
  temporary.push(props.location.pathname.split('/')[1]);
  if (temporary.length > 2) {
    temporary.splice(0, 1);
  }
  sessionStorage.setItem('router', JSON.stringify(temporary));
}

function routeFun(arr, needLoginBool = false) {
  const isLogin = sessionStorage.getItem('isLogin');
  return arr.map(route => (
    <Route
      key={route}
      exact={route.path === '/' ? true : false}
      path={route.path}
      // component={route.component}
      render={props => (
        lastRouter(props),
        route.component.map((RouteLink, index) =>
          !needLoginBool ? (
            <RouteLink key={index} {...props} />
          ) : isLogin === 'true' ? (
            <RouteLink key={index} {...props} />
          ) : (
            <Redirect
              key={index}
              to={{
                pathname: '/login',
                state: { from: props.location },
              }}
            />
          ),
        )
      )}
    />
    /* eslint-enable */
  ));
}

const Router = () => (
  <React.Fragment>
    <Switch>
      {routeFun(routeArr)}
      {routeFun(routeArrLogin, true)}
      <Route
        /* eslint-disable */
        render={
          props =>
            [Header, Index, Footer].map(RouteLink => <RouteLink key={RouteLink} {...props} />)
          /* eslint-enable */
        }
      />
    </Switch>
  </React.Fragment>
);

export default Router;
