import React, { useContext } from "react";
import BurgerIngredent from "../BurgerIngredient";
import css from "./style.module.css";
import BurgerContext from "../../context/BurgerContext";

const Burger = (props) => {
  const burgerContext = useContext(BurgerContext);
  const items = Object.entries(burgerContext.ingredients);
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

export default Burger;
