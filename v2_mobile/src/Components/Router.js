import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import ScrollToTop from "Components/ScrollToTop";
import History from "Components/History";
import HomeController from "Components/HomeController/HomeController.js";
import Home from "Routes/Home";
import Header from "Components/Header/Header";
import Footer from "Components/Footer";
// Header Components
import LogIn from "Routes/LogIn";
import SignUp from "Routes/SignUp";
import SignUpByEmail from "Routes/SignUpByEmail";
import Basket from "Routes/Basket";
import Favorite from "Routes/Favorite";
import Purchase from "Routes/Purchase";
import MyPage from "Routes/MyPage";
import EditProfile from "Routes/EditProfile/index";
import Entering from "Routes/Entering";
import Search from "Routes/Search";
// Footer Components
import AboutDorus from "Routes/AboutDorus";
import TermsOfUse from "Routes/TermsOfUse";
import PrivacyPolicy from "Routes/PrivacyPolicy";
import Notice from "Routes/Notice/Notice";
import Question from "Routes/Question";
import Event from "Routes/Event";
// Content Routes
import PageFrame from "Routes/PageFrame";
import Detail from "Routes/Detail";
import Donating from "Routes/Donating";
import QnA from "Routes/QnA";
import Review from "Routes/Review";
import store from "store";

var Logged = store.getState()?.user.logged;

store.subscribe(() => {
  if (store.getState()?.user.logged === true) {
    Logged = true;
  } else {
    Logged = false;
  }
});

const OnLogOutRoute = (props) => {
  if (Logged === true) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

const OnLogInRoute = (props) => {
  if (Logged === true) {
    return <Route {...props} />;
  }
  return <Redirect to="/" />;
};

const MyPageRoute = () => {
  if (Logged === true) {
    return <Route path="/mypage" exact component={MyPage} />;
  }
  return <Route path="/mypage" exact component={LogIn} />;
};

export default () => (
  <Router>
    <History />
    <ScrollToTop />
    <Header />
    <Route
      render={(props) =>
        props.location.pathname === "/" ? <HomeController /> : null
      }
    />
    <Switch>
      <Route path="/" exact component={Home} />
      <OnLogOutRoute path="/login" exact component={LogIn} />
      <OnLogOutRoute path="/signup" exact component={SignUp} />
      <OnLogOutRoute path="/signup_by_email" exact component={SignUpByEmail} />
      <OnLogInRoute path="/basket" exact component={Basket} />
      <OnLogInRoute path="/like" exact component={Favorite} />
      <OnLogInRoute path="/purchase" exact component={Purchase} />
      <MyPageRoute path="/mypage" exact component={MyPage} />
      <OnLogInRoute path="/mypage/edit_profile" exact component={EditProfile} />
      <Route path="/entering" exact component={Entering} />
      <Route path="/products/search" exact component={Search} />
      <Route path="/donating" exact component={Donating} />
      {/* Footer Routes */}
      <Route path="/about_dorus" component={AboutDorus} />
      <Route path="/terms_of_use" component={TermsOfUse} />
      <Route path="/privacy_policy" component={PrivacyPolicy} />
      <Route path="/notice" component={Notice} />
      <Route path="/question" component={Question} />
      <Route path="/event" component={Event} />
      <Route path="/qna" component={QnA} />
      <Route path="/review" component={Review} />
      {/* Other Routes */}
      {/* <Route path="/test" component={PageFrame}></Route> */}
      <Route key="cloth" path="/wear/clothes" exact component={PageFrame} />
      <Route
        key="accesory"
        path="/wear/accesories"
        exact
        component={PageFrame}
      />
      <Route
        key="harness"
        path="/outside/harnesses"
        exact
        component={PageFrame}
      />
      <Route key="leader" path="/outside/leaders" exact component={PageFrame} />
      <Route
        key="autoleader"
        path="/outside/autoleaders"
        exact
        component={PageFrame}
      />
      <Route
        key="carrier"
        path="/outside/carriers"
        exact
        component={PageFrame}
      />
      <Route
        key="envelope"
        path="/outside/envelopes"
        exact
        component={PageFrame}
      />
      <Route key="home" path="/house/homes" exact component={PageFrame} />
      <Route key="cushion" path="/house/cushion" exact component={PageFrame} />
      <Route key="fence" path="/house/fences" exact component={PageFrame} />
      <Route key="stare" path="/life/stares" exact component={PageFrame} />
      <Route key="toilet" path="/life/toilets" exact component={PageFrame} />
      <Route key="diaper" path="/life/diapers" exact component={PageFrame} />
      <Route key="bath" path="/life/bathes" exact component={PageFrame} />
      <Route key="brush" path="/life/brushes" exact component={PageFrame} />
      <Route key="dish" path="/life/dishes" exact component={PageFrame} />
      <Route
        key="waterpot"
        path="/life/waterpots"
        exact
        component={PageFrame}
      />
      <Route key="toys" path="/toy/toys" exact component={PageFrame} />
      <Route key="nosework" path="/toy/noseworks" exact component={PageFrame} />
      <Route key="training" path="/toy/trainings" exact component={PageFrame} />
      <Route key="foods" path="/food/foods" exact component={PageFrame} />
      <Route key="snack" path="/food/snacks" exact component={PageFrame} />
      <Route
        key="healthfood"
        path="/health/healthfood"
        exact
        component={PageFrame}
      />
      <Route key="dental" path="/health/dental" exact component={PageFrame} />
      <Route
        key="supplement"
        path="/health/supplements"
        exact
        component={PageFrame}
      />
      <Route path="/products/:id" exact component={Detail} />
      <Redirect from="*" to="/" />
    </Switch>
    <Footer />
  </Router>
);
