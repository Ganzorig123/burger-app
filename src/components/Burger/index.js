import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BurgerIngredent from "../BurgerIngredient";
import css from "./style.module.css";

const Burger = ({ ingredients }) => {
  const items = Object.entries(ingredients);
  let content = [];

  items.map((el, j) => {
    for (let i = 0; i < el[1]; i++)
      content.push(<BurgerIngredent key={`${j}${i + 1}`} type={el[0]} />);
    return content;
  });

  if (content.length === 0)
    content = <p>Хачиртай талханыхаа орцыг сонгоно уу...</p>;

  return (
    <div className={css.Burger}>
      <BurgerIngredent type="bread-top" />
      {content}
      <BurgerIngredent type="bread-bottom" />
    </div>
  );
};

const a = (state) => {
  return { ingredients: state.ingredients };
};
export default connect(a)(withRouter(Burger));
