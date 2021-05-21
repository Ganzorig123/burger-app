import React from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import Burger from "../../components/Burger";
import ContactData from "../../components/ContactData";
import Button from "../../components/General/Button";
import css from "./style.module.css";

const ShippingPage = (props) => {
  const cancelOrder = () => {
    props.history.goBack();
  };

  const showContactData = () => {
    props.history.replace("/shipping/contact");
  };

  return (
    <div className={css.ShippingPage}>
      <p style={{ fontSize: "24px" }}>
        <strong>Таны захиалга амттай байх болно гэж найдаж байна.</strong>
      </p>
      <p style={{ fontSize: "24px" }}>
        <strong>Дүн: {props.totalPrice}₮</strong>
      </p>
      <Burger />
      <Button text="ЗАХИАЛГЫГ ЦУЦЛАХ" btnType="Danger" clicked={cancelOrder} />
      <Button
        text="ХҮРГЭЛТИЙН МЭДЭЭЛЭЛ ОРУУЛАХ"
        btnType="Success"
        clicked={showContactData}
      />
      <Route path="/shipping/contact">
        <ContactData />
      </Route>
    </div>
  );
};

const mapStateToProps = ({ burgerReducer }) => {
  return { totalPrice: burgerReducer.totalPrice };
};

export default connect(mapStateToProps)(ShippingPage);
