import React from "react";
import { connect } from "react-redux";
import css from "./style.module.css";
import * as actions from "../../redux/actions/burgerActions";

const BuildControl = (props) => (
  <div className={css.BuildControl}>
    <div className={css.Label}>{props.orts}</div>
    <button
      disabled={props.ingredients[props.type] <= 0}
      onClick={() => props.ortsHasah(props.type)}
      className={css.Less}
    >
      Хасах
    </button>
    <button onClick={() => props.ortsNemeh(props.type)} className={css.More}>
      Нэмэх
    </button>
  </div>
);

const mapStateToProps = (state) => {
  return { totalPrice: state.totalPrice, ingredients: state.ingredients };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ortsNemeh: (ortsNer) => dispatch(actions.addIngredient(ortsNer)),
    ortsHasah: (ortsNer) => dispatch(actions.removeIngredient(ortsNer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildControl);
