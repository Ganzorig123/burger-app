import React from "react";
import MenuItem from "../MenuItem";
import css from "./style.module.css";

const Menu = () => (
  <div className={css.Menu}>
    <MenuItem exact link="/">
      ШИНЭ ЗАХИАЛГА
    </MenuItem>
    <MenuItem link="/orders">ЗАХИАЛГУУД</MenuItem>
    <MenuItem link="/login">НЭВТРЭХ</MenuItem>
  </div>
);

export default Menu;
