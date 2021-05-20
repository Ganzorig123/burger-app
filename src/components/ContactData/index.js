import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../General/Button";
import axios from "../../axios";
import css from "./style.module.css";
import Spinner from "../General/Spinner";
import { withRouter } from "react-router-dom";

class ContactData extends Component {
  state = {
    name: null,
    city: null,
    street: null,
    loading: false,
  };

  saveOrder = () => {
    this.setState({ loading: true });
    const order = {
      orts: this.props.ingredients,
      dun: this.props.totalPrice,
      hayag: {
        name: this.state.name,
        city: this.state.city,
        street: this.state.street,
      },
    };
    axios
      .post("/orders.json", order)
      .then((res) => {
        console.log("Firebase ruu amjilttai hadgallaa");
      })
      .finally(() => {
        this.setState({ loading: false });
        this.props.history.replace("/orders");
      });
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
        {this.state.loading ? (
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
  return { totalPrice: state.totalPrice, ingredients: state.ingredients };
};

export default connect(mapStateToProps)(withRouter(ContactData));
