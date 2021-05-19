import React from "react";
import css from "./style.module.css";

const Order = ({ order }) => {
  return (
    <div className={css.Order}>
      <p>
        Орц : Гахайн мах - {order.orts.bacon}, Салад - {order.orts.salad},
        Үхрийн мах -{order.orts.meat}, Бяслаг -{order.orts.cheese}
      </p>
      <p>
        Хаяг : {order.hayag.name} | {order.hayag.street} | {order.hayag.city}
      </p>
      <p>
        Үнийн дүн : <strong>{order.dun}₮</strong>
      </p>
    </div>
  );
};
export default Order;
