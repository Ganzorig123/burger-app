import React from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import Button from "../General/Button";
import { withRouter } from "react-router-dom";

const OrderSummary = (props) => {
  const continueOrder = () => {
    props.onCancel();
    props.history.push("/shipping");
  };

  return (
    <div className={css.OrderSummary}>
      <h3>Таны захиалга</h3>
      <p>Таны сонгосон орцууд:</p>
      <ul>
        {Object.keys(props.ingredients).map((el) => (
          <li key={el}>
            {props.ingredientNames[el]} : {props.ingredients[el]} ш
          </li>
        ))}
      </ul>
      <p>
        <strong>Захиалгын дүн : {props.totalPrice} ₮</strong>
      </p>

      <p>Цаашаа үргэлжлүүлэх үү</p>
      <Button text="ТАТГАЛЗАХ" btnType="Danger" clicked={props.onCancel} />
      <Button text="ҮРГЭЛЖЛҮҮЛЭХ" btnType="Success" clicked={continueOrder} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    totalPrice: state.totalPrice,
    ingredients: state.ingredients,
    ingredientNames: state.ingredientNames,
  };
};

export default connect(mapStateToProps)(withRouter(OrderSummary));
