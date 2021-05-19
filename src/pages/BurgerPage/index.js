import React, { Component } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import OrderSummary from "../../components/OrderSummary";
import Modal from "../../components/General/Modal";
import axios from "../../axios";

const INGREDIENTS_PRICE = { salad: 150, cheese: 250, bacon: 800, meat: 1500 };

const INGREDIENTS_NAMES = {
  bacon: "Гахайн мах",
  cheese: "Баяслаг",
  meat: "Үхрийн мах",
  salad: "Салад",
};
class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      cheese: 0,
      meat: 0,
      salad: 0,
    },
    totalPrice: 1000,
    confirmOrder: false,
  };

  componentDidMount = () => {};

  continueOrder = () => {
    this.closeConfirmModal();

    const params = [];
    for (const key in this.state.ingredients) {
      params.push(key + "=" + this.state.ingredients[key]);
    }
    const query = params.join("&");

    this.props.history.push({
      pathname: "/shipping",
      search: query,
    });

    // this.setState({ loading: true });
    // const order = {
    //   orts: this.state.ingredients,
    //   dun: this.state.totalPrice,
    //   hayag: {
    //     name: "Болормаа",
    //     city: "Дархан",
    //     street: "HUD, 8-r horoolol",
    //   },
    // };
    // axios
    //   .post("/orders.json", order)
    //   .then((res) => {
    //     console.log("Firebase ruu amjilttai hadgallaa");
    //   })
    //   .finally(() => this.setState({ loading: false }));
  };

  showConfirmModal = () => {
    this.setState({ confirmOrder: true });
  };

  closeConfirmModal = () => {
    this.setState({ confirmOrder: false });
  };

  ortsNemeh = (type) => {
    console.log("========== Нэмэх " + type);
    const newIngredients = { ...this.state.ingredients };
    newIngredients[type]++;

    const newPrice = this.state.totalPrice + INGREDIENTS_PRICE[type];
    this.setState({ ingredients: newIngredients, totalPrice: newPrice });
  };

  ortsHasah = (type) => {
    console.log("========== Хасах " + type);
    if (this.state.ingredients[type] > 0) {
      const newIngredients = { ...this.state.ingredients };
      newIngredients[type]--;

      const newPrice = this.state.totalPrice - INGREDIENTS_PRICE[type];
      this.setState({ ingredients: newIngredients, totalPrice: newPrice });
    }
  };

  render() {
    const disabledIngredients = { ...this.state.ingredients };
    for (let key in disabledIngredients) {
      disabledIngredients[key] = disabledIngredients[key] <= 0;
    }

    return (
      <div>
        <Modal
          show={this.state.confirmOrder}
          closeConfirmModal={this.closeConfirmModal}
        >
          <OrderSummary
            onCancel={this.closeConfirmModal}
            onContinue={this.continueOrder}
            ingredientsNames={INGREDIENTS_NAMES}
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
          />
        </Modal>

        <Burger orts={this.state.ingredients} />
        <BuildControls
          ingredientsNames={INGREDIENTS_NAMES}
          totalPrice={this.state.totalPrice}
          disabledIngredients={disabledIngredients}
          ortsNemeh={this.ortsNemeh}
          ortsHasah={this.ortsHasah}
          showConfirmModal={this.showConfirmModal}
        />
      </div>
    );
  }
}

export default BurgerBuilder;
