import React from "react";
import css from "./style.module.css";
import Button from "../General/Button";

const OrderSummary = (props) => {
  return (
    <div className={css.OrderSummary}>
      <h3>Таны захиалга</h3>
      <p>Таны сонгосон орцууд:</p>
      <ul>
        {Object.keys(props.ingredients).map((el) => (
          <li key={el}>
            {props.ingredientsNames[el]} : {props.ingredients[el]} ш
          </li>
        ))}
      </ul>
      <p>
        <strong>Захиалгын дүн : {props.totalPrice} ₮</strong>
      </p>

      <p>Цаашаа үргэлжлүүлэх үү</p>
      <Button text="ТАТГАЛЗАХ" btnType="Danger" clicked={props.onCancel} />
      <Button
        text="ҮРГЭЛЖЛҮҮЛЭХ"
        btnType="Success"
        clicked={props.onContinue}
      />
    </div>
  );
};

export default OrderSummary;
