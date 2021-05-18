import React from "react";
import css from "./style.module.css";
import BuildControl from "../BuildControl";

const BuildControls = (props) => {
  return (
    <div className={css.BuildControls}>
      <p>
        Бургерийн үнэ : <strong>{props.totalPrice} ₮</strong>
      </p>

      {Object.keys(props.ingredientsNames).map((el) => (
        <BuildControl
          key={el}
          ortsNemeh={props.ortsNemeh}
          ortsHasah={props.ortsHasah}
          disabledIngredients={props.disabledIngredients}
          type={el}
          orts={props.ingredientsNames[el]}
        />
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

export default BuildControls;
