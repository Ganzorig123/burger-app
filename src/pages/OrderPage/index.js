import { connect } from "react-redux";
import React, { useEffect } from "react";
import Spinner from "../../components/General/Spinner";
import Order from "../../components/Order";
import * as actions from "../../redux/actions/orderActions";

const OrderPage = (props) => {
  useEffect(() => {
    props.loadOrders();
  }, []);

  // console.log(JSON.stringify(this.state.orders));
  return (
    <div>
      {props.loading ? (
        <Spinner />
      ) : (
        props.orders.map((el) => <Order key={el[0]} order={el[1]} />)
      )}
    </div>
  );
};

const mapStateToProps = ({ orderReducer }) => {
  return { orders: orderReducer.orders, loading: orderReducer.loading };
};

const mapDispatchToProps = (dispach) => {
  return {
    loadOrders: () => dispach(actions.loadOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
