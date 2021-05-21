const initialState = {
  //Load order
  orders: [],
  loading: false,

  //Save new Order
  newOrder: {
    saving: false,
    finished: false,
    error: null,
  },
};

const reducer = (state = initialState, action) => {
  if (action.type === "LOAD_ORDERS") {
    return {
      ...state,
      loading: true,
    };
  }
  switch (action.type) {
    case "LOAD_ORDERS_START":
      return {
        ...state,
        loading: true,
      };

    case "LOAD_ORDERS_SUCCESS":
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case "LOAD_ORDERS_ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "SAVE_ORDER_START":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: true,
        },
      };

    case "SAVE_ORDER_SUCCESS":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: false,
          finished: true,
          error: null,
        },
      };
    case "SAVE_ORDER_ERROR":
      return {
        ...state,
        newOrder: {
          ...state.newOrder,
          saving: false,
          finished: true,
          error: action.error,
        },
      };
    default:
      return state;
  }
};

export default reducer;
