const initialState = {
  ingredients: {
    bacon: 0,
    cheese: 0,
    meat: 0,
    salad: 0,
  },
  totalPrice: 1000,
  ingredientNames: {
    bacon: "Гахайн мах",
    cheese: "Баяслаг",
    meat: "Үхрийн мах",
    salad: "Салад",
  },
};

const INGREDIENTS_PRICE = { salad: 150, cheese: 250, bacon: 800, meat: 1500 };

const burgerReducer = (state = initialState, action) => {
  if (action.type === "ADD_INGREDIENT") {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ortsNer]: state.ingredients[action.ortsNer] + 1,
      },
      totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ortsNer],
    };
  } else if (action.type === "REMOVE_INGREDIENT") {
    if (state.ingredients[action.ortsNer] > 0)
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ortsNer]: state.ingredients[action.ortsNer] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ortsNer],
      };
  }
  return state;
};

export default burgerReducer;
