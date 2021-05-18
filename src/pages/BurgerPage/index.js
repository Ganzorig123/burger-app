import React, { Component } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import OrderSummary from "../../components/OrderSummary";
import Modal from "../../components/General/Modal";

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

  continueOrder = () => {
    console.log("continue daragdlaa");
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
