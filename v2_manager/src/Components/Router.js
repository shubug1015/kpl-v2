import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import History from 'Components/History';
import ScrollToTop from 'Components/ScrollToTop';
import Header from 'Components/Header/Header';
import GoHome from 'Components/GoHome';
import Controller from 'Components/Controller';
import LogIn from 'Routes/LogIn';
import Home from 'Routes/Home';
import MyProduct from 'Routes/MyProduct';
import Search from 'Routes/Search';
import QnA from 'Routes/QnA';
import Register from 'Routes/Register';
import Modify from 'Routes/Modify';
import Purchase from 'Routes/Purchase';
import Sold from 'Routes/Sold';
import store from 'store';

export default () => {
  const [logged, setLogged] = store.getState()?.user.logged
    ? useState(true)
    : useState(false);

  store.subscribe(() => {
    if (
      store.getState()?.location[store.getState()?.location.length - 1]
        .location !== '/login'
    ) {
      if (store.getState()?.user.logged) {
        setLogged(true);
      } else {
        setLogged(false);
      }
    }
  });

  const OnLogOutRoute = (props) => {
    if (store.getState()?.user.logged) {
      return <Redirect from='*' to='/' />;
    }
    return <Route {...props} />;
  };

  const OnLogInRoute = (props) => {
    if (store.getState()?.user.logged) {
      return <Route {...props} />;
    }
    return <Redirect from='*' to='/login' />;
  };

  const LogRedirect = () => {
    if (store.getState()?.user.logged) {
      return <Redirect from='*' to='/' />;
    }
    return <Redirect from='*' to='/login' />;
  };

  return (
    <Router>
      <History />
      <ScrollToTop />
      {logged ? null : <Header />}
      {logged ? (
        <>
          <Controller />
          <GoHome />
        </>
      ) : null}
      <Switch>
        <OnLogOutRoute path='/login' exact component={LogIn} />
        <OnLogInRoute path='/' exact component={Home} />
        <OnLogInRoute path='/myproduct' exact component={MyProduct} />
        <OnLogInRoute path='/products/search' exact component={Search} />
        <OnLogInRoute path='/register' exact component={Register} />
        <OnLogInRoute path='/modify' exact component={Modify} />
        <OnLogInRoute path='/qna' exact component={QnA} />
        <OnLogInRoute path='/purchase' exact component={Purchase} />
        <OnLogInRoute path='/sold' exact component={Sold} />
        <LogRedirect />
      </Switch>
    </Router>
  );
};
