import React, { Fragment } from "react";
import { connect } from "react-redux";
import MenuItem from "../MenuItem";
import css from "./style.module.css";

const Menu = (props) => (
  <div className={css.Menu}>
    {props.userId ? (
      <Fragment>
        <MenuItem exact link="/">
          ШИНЭ ЗАХИАЛГА
        </MenuItem>
        <MenuItem link="/orders">ЗАХИАЛГУУД</MenuItem>
        <MenuItem link="/logout">ГАРАХ</MenuItem>
      </Fragment>
    ) : (
      <Fragment>
        <MenuItem link="/login">НЭВТРЭХ</MenuItem>
        <MenuItem link="/signup">БҮРТГҮҮЛЭХ</MenuItem>
      </Fragment>
    )}
  </div>
);

const mapStateToProps = (state) => {
  return {
    userId: state.loginSignupReducer.userId,
  };
};

export default connect(mapStateToProps)(Menu);
