import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../General/Button";
import css from "./style.module.css";
import Spinner from "../General/Spinner";
import { withRouter } from "react-router-dom";
import * as actions from "../../redux/actions/orderActions";

class ContactData extends Component {
  state = {
    name: null,
    city: null,
    street: null,
  };

  componentDidUpdate() {
    if (this.props.newOrderStatus.finished && !this.props.newOrderStatus.error)
      this.props.history.replace("/orders");
  }
  saveOrder = () => {
    const newOrder = {
      orts: this.props.ingredients,
      dun: this.props.totalPrice,
      hayag: {
        name: this.state.name,
        city: this.state.city,
        street: this.state.street,
      },
      userId: this.props.userId,
    };

    this.props.saveOrderAction(newOrder);
  };

  changeName = (event) => {
    console.log("changeName ", event);
    this.setState({ name: event.target.value });
  };

  changeCity = (event) => {
    this.setState({ city: event.target.value });
  };

  changeStreet = (event) => {
    this.setState({ street: event.target.value });
  };

  render() {
    return (
      <div className={css.ContactData}>
        Дүн : {this.props.totalPrice}₮
        <div style={{ color: "red" }}>
          {this.props.newOrderStatus.error &&
            `Захиалгыг хадгалах явцад алдаа гарлаа : ${this.props.newOrderStatus.error}`}
        </div>
        {this.props.newOrderStatus.saving ? (
          <Spinner />
        ) : (
          <div>
            <input
              onChange={this.changeName}
              type="text"
              name="name"
              placeholder="Таны нэр"
            />
            <input
              onChange={this.changeStreet}
              type="text"
              name="street"
              placeholder="Таны гэрийн хаяг"
            />
            <input
              onChange={this.changeCity}
              type="text"
              name="city"
              placeholder="Таны хот"
            />
            <Button clicked={this.saveOrder} text="ИЛГЭЭХ" btnType="Success" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    totalPrice: state.burgerReducer.totalPrice,
    ingredients: state.burgerReducer.ingredients,
    newOrderStatus: state.orderReducer.newOrder,
    userId: state.loginSignupReducer.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveOrderAction: (newOrder) => dispatch(actions.saveOrder(newOrder)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
