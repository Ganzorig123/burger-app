import React, { Component } from "react";
import Burger from "../../components/Burger";
import Button from "../../components/General/Button";
import css from "./style.module.css";

class ShippingPage extends Component {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    },
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};

    for (const param of query.entries()) {
      ingredients[param[0]] = param[1];
    }

    this.setState({ ingredients });
  }

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div className={css.ShippingPage}>
        <Burger orts={this.state.ingredients} />
        <Button
          text="Захиалгыг цуцлах"
          btnType="Danger"
          clicked={this.goBack}
        />
      </div>
    );
  }
}

export default ShippingPage;
