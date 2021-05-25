import React, { useState } from "react";

const BurgerContext = React.createContext();

export const BurgerStore = (props) => {
  const [ingredients, setIngredients] = useState({
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
  });

  const addIngredient = (orts) => {
    setIngredients({ ...ingredients, [orts]: ingredients[orts] + 1 });
  };

  const removeIngredient = (orts) => {
    if (ingredients[orts] > 0)
      setIngredients({ ...ingredients, [orts]: ingredients[orts] - 1 });
  };

  return (
    <BurgerContext.Provider
      value={{ ingredients, addIngredient, removeIngredient }}
    >
      {props.children}
    </BurgerContext.Provider>
  );
};

export default BurgerContext;
