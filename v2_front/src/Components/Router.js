import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import History from 'Components/History';
import ScrollToTop from 'Components/ScrollToTop';
import HomeController from 'Components/HomeController/HomeController.js';
import Home from 'Routes/Home';
import Header from 'Components/Header/Header';
import Footer from 'Components/Footer';
// Header Components
import LogIn from 'Routes/LogIn';
import SignUp from 'Routes/SignUp';
import SignUpByEmail from 'Routes/SignUpByEmail';
import Basket from 'Routes/Basket';
import Favorite from 'Routes/Favorite';
import MyPage from 'Routes/MyPage';
import EditProfile from 'Routes/EditProfile/index';
import Entering from 'Routes/Entering';
import Search from 'Routes/Search';
// Footer Components
import AboutDorus from 'Routes/AboutDorus';
import TermsOfUse from 'Routes/TermsOfUse';
import PrivacyPolicy from 'Routes/PrivacyPolicy';
import Notice from 'Routes/Notice/Notice';
import Question from 'Routes/Question';
import Event from 'Routes/Event';
// Content Routes
import PageFrame from 'Routes/PageFrame';
import Detail from 'Routes/Detail';
import MyPurchased from 'Routes/MyPurchased';
import Purchase from 'Routes/Purchase';
import ExchangeOrRefund from 'Routes/ExchangeOrRefund';
import Donating from 'Routes/Donating';
import QnA from 'Routes/QnA';
import Review from 'Routes/Review';
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
      return <Redirect to='/' />;
    }
    return <Route {...props} />;
  };

  const OnLogInRoute = (props) => {
    if (store.getState()?.user.logged) {
      return <Route {...props} />;
    }
    return <Redirect to='/' />;
  };

  const MyPageRoute = () => {
    if (store.getState()?.user.logged) {
      return <Route path='/mypage' exact component={MyPage} />;
    }
    return <Route path='/mypage' exact component={LogIn} />;
  };

  const LikeRoute = () => {
    if (store.getState()?.user.logged) {
      return <Route path='/like' exact component={Favorite} />;
    }
    return <Route path='/like' exact component={LogIn} />;
  };

  return (
    <Router>
      <History />
      <ScrollToTop />
      <Header logged={logged} />
      <Route
        render={(props) =>
          props.location.pathname === '/' ? <HomeController /> : null
        }
      />
      <Switch>
        <Route path='/' exact component={Home} />
        <OnLogOutRoute path='/login' exact component={LogIn} />
        <OnLogOutRoute path='/signup' exact component={SignUp} />
        <OnLogOutRoute
          path='/signup_by_email'
          exact
          component={SignUpByEmail}
        />
        <OnLogInRoute path='/basket' exact component={Basket} />
        <OnLogInRoute path='/purchase' exact component={Purchase} />
        <LikeRoute path='/like' exact component={Favorite} />
        <OnLogInRoute path='/mypurchased' exact component={MyPurchased} />
        <OnLogInRoute
          path='/exchange_refund'
          exact
          component={ExchangeOrRefund}
        />
        <MyPageRoute path='/mypage' exact component={MyPage} />
        <OnLogInRoute
          path='/mypage/edit_profile'
          exact
          component={EditProfile}
        />
        <Route path='/entering' exact component={Entering} />
        <Route path='/products/search' exact component={Search} />
        <Route path='/donating' exact component={Donating} />
        {/* Footer Routes */}
        <Route path='/about_dorus' component={AboutDorus} />
        <Route path='/terms_of_use' component={TermsOfUse} />
        <Route path='/privacy_policy' component={PrivacyPolicy} />
        <Route path='/notice' component={Notice} />
        <Route path='/question' component={Question} />
        <Route path='/event' component={Event} />
        <Route path='/qna' component={QnA} />
        <Route path='/review' component={Review} />
        {/* Other Routes */}
        {/* <Route path="/test" component={PageFrame}></Route> */}
        <Route key='cloth' path='/snack/snacks' exact component={PageFrame} />
        <Route path='/products/:id' exact component={Detail} />
        <Redirect from='*' to='/' />
      </Switch>
      <Footer />
    </Router>
  );
};
