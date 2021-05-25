import axios from "../../axios";

export const loadOrders = () => {
  return function (dispatch, getState) {
    //Захиалгыг татаж эхэллээ гэдгийг мэдэгдэнэ
    //Энийг хүлээж аваад Spinner ажиллаж эхэлнэ.
    dispatch(loadOrdersStart());

    const userId = getState().loginSignupReducer.userId;
    const token = getState().loginSignupReducer.token;

    axios
      .get(`/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)

      .then((response) => {
        const orders = Object.entries(response.data).reverse();
        dispatch(loadOrdersSuccess(orders));
      })
      .catch((err) => dispatch(loadOrdersError(err)));
  };
};

export const loadOrdersStart = () => {
  return {
    type: "LOAD_ORDERS_START",
  };
};

export const loadOrdersSuccess = (loadedOrders) => {
  return {
    type: "LOAD_ORDERS_SUCCESS",
    orders: loadedOrders,
  };
};

export const loadOrdersError = (error) => {
  return {
    type: "LOAD_ORDERS_ERROR",
    error,
  };
};

//Шинэ захиалгыг хадгалах
export const saveOrder = (newOrder) => {
  return function (dispatch, getState) {
    dispatch(saveOrderStart());

    //Firebase рүү хадгална
    const userId = getState().loginSignupReducer.userId;
    const token = getState().loginSignupReducer.token;
    axios
      .post(`/orders.json?auth=${token}`, newOrder)
      .then((res) => {
        dispatch(saveOrderSuccess());
      })
      .catch((err) => {
        dispatch(saveOrderError(err));
      });
  };
};

export const saveOrderStart = () => {
  return {
    type: "SAVE_ORDER_START",
  };
};

export const saveOrderSuccess = () => {
  return {
    type: "SAVE_ORDER_SUCCESS",
  };
};

export const saveOrderError = (error) => {
  return {
    type: "SAVE_ORDER_ERROR",
    error,
  };
};

export const clearOrder = () => {
  return {
    type: "CLEAR_ORDER",
  };
};
