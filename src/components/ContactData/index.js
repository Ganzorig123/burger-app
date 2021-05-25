import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Button from "../General/Button";
import css from "./style.module.css";
import Spinner from "../General/Spinner";
import { withRouter } from "react-router-dom";
import * as actions from "../../redux/actions/orderActions";

const ContactData = (props) => {
  const [name, setName] = useState(null);
  const [city, setCity] = useState(null);
  const [street, setStreet] = useState(null);

  useEffect(() => {
    if (props.newOrderStatus.finished && !props.newOrderStatus.error)
      props.history.replace("/orders");

    return () => {
      //Цэвэрлэгч функц : Захиалгыг буцаагаад хоосолж анхны төлөвт оруулна. Дараагийн захиалгад бэлдэнэ.
      if (props.newOrderStatus.finished && !props.newOrderStatus.error)
        props.clearOrder();
    };
  }, [props.newOrderStatus.finished]);

  const saveOrder = () => {
    const newOrder = {
      orts: props.ingredients,
      dun: props.totalPrice,
      hayag: {
        name,
        city,
        street,
      },
      userId: props.userId,
    };

    props.saveOrderAction(newOrder);
  };

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changeCity = (event) => {
    setCity(event.target.value);
  };

  const changeStreet = (event) => {
    setStreet(event.target.value);
  };

  return (
    <div className={css.ContactData}>
      Дүн : {props.totalPrice}₮
      <div style={{ color: "red" }}>
        {props.newOrderStatus.error &&
          `Захиалгыг хадгалах явцад алдаа гарлаа : ${props.newOrderStatus.error}`}
      </div>
      {props.newOrderStatus.saving ? (
        <Spinner />
      ) : (
        <div>
          <input
            onChange={changeName}
            type="text"
            name="name"
            placeholder="Таны нэр"
          />
          <input
            onChange={changeStreet}
            type="text"
            name="street"
            placeholder="Таны гэрийн хаяг"
          />
          <input
            onChange={changeCity}
            type="text"
            name="city"
            placeholder="Таны хот"
          />
          <Button clicked={saveOrder} text="ИЛГЭЭХ" btnType="Success" />
        </div>
      )}
    </div>
  );
};

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
    clearOrder: () => dispatch(actions.clearOrder()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ContactData));
