import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import OrderPage from "../OrderPage";
import ShippingPage from "../ShippingPage";
import LoginPage from "../../pages/LoginPage";
import SignupPage from "../../pages/SignupPage";
import Logout from "../../components/Logout";
import SideBar from "../../components/Sidebar";
import * as actions from "../../redux/actions/loginActions";
import css from "./style.module.css";

class App extends Component {
  state = {
    showSideBar: false,
  };

  toggleSideBar = () => {
    this.setState((prevState) => {
      return { showSideBar: !prevState.showSideBar };
    });
  };

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const expireDate = new Date(localStorage.getItem("expireDate"));
    const refreshToken = localStorage.getItem("refreshToken");

    if (userId && token) {
      if (expireDate > new Date()) {
        //Hugatsaa duusaagui Token baigaa tul auto login hiine
        this.props.autoLogin(userId, token);

        //Token huchingui bolgohod uldej baigaa hugsy=tsaag tootsoolj ter hugstsaanii daraa autologout hiine
        const ms = expireDate.getTime() - new Date().getTime();
        this.props.autoLogoutAfterMillSec(ms);
      } else {
        //Token hugatsaa duussan bainaa
        this.props.logout();
      }
    }
  }

  render() {
    return (
      <div>
        <Toolbar
          showSideBar={this.state.showSideBar}
          toggleSideBar={this.toggleSideBar}
        />

        <SideBar
          showSideBar={this.state.showSideBar}
          toggleSideBar={this.toggleSideBar}
        />

        <main className={css.Content}>
          USER_ID : {this.props.userId}
          {this.props.userId ? (
            <Switch>
              <Route path="/orders" component={OrderPage} />
              <Route path="/shipping" component={ShippingPage} />
              <Route path="/logout" component={Logout} />
              <Route path="/" exact component={BurgerPage} />
            </Switch>
          ) : (
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignupPage} />
              <Redirect to="/login" />
            </Switch>
          )}
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.loginSignupReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLogin: (userId, token) =>
      dispatch(actions.loginUserSuccess(userId, token)),
    logout: () => dispatch(actions.logout()),
    autoLogoutAfterMillSec: (ms) =>
      dispatch(actions.autoLogoutAfterMillSec(ms)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
