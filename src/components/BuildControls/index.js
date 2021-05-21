import React from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import BuildControl from "../BuildControl";

const BuildControls = (props) => {
  return (
    <div className={css.BuildControls}>
      <p>
        Бургерийн үнэ : <strong>{props.totalPrice} ₮</strong>
      </p>
      {Object.keys(props.ingredientNames).map((el) => (
        <BuildControl key={el} type={el} orts={props.ingredientNames[el]} />
      ))}
      <button
        disabled={props.totalPrice <= 1000}
        className={css.OrderButton}
        onClick={props.showConfirmModal}
      >
        ЗАХИАЛАХ
      </button>
    </div>
  );
};

const mapStateToProps = ({ burgerReducer }) => {
  return {
    totalPrice: burgerReducer.totalPrice,
    ingredientNames: burgerReducer.ingredientNames,
  };
};

export default connect(mapStateToProps)(BuildControls);
