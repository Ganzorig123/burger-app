import React, { Component } from "react";
import Burger from "../../components/Burger";
import BuildControls from "../../components/BuildControls";
import OrderSummary from "../../components/OrderSummary";
import Modal from "../../components/General/Modal";

class BurgerPage extends Component {
  state = {
    confirmOrder: false,
  };

  showConfirmModal = () => {
    this.setState({ confirmOrder: true });
  };

  closeConfirmModal = () => {
    this.setState({ confirmOrder: false });
  };

  render() {
    return (
      <div>
        <Modal
          show={this.state.confirmOrder}
          closeConfirmModal={this.closeConfirmModal}
        >
          <OrderSummary onCancel={this.closeConfirmModal} />
        </Modal>

        <Burger />
        <BuildControls showConfirmModal={this.showConfirmModal} />
      </div>
    );
  }
}

export default BurgerPage;
