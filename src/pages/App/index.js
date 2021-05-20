import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Toolbar from "../../components/Toolbar";
import BurgerPage from "../BurgerPage";
import OrderPage from "../OrderPage";
import ShippingPage from "../ShippingPage";
import SideBar from "../../components/Sidebar";
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
          <Switch>
            <Route path="/orders" component={OrderPage} />
            <Route path="/shipping" component={ShippingPage} />
            <Route path="/" exact component={BurgerPage} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
