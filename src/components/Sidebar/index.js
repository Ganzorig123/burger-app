import React from "react";
import Logo from "../Logo";
import Menu from "../Menu";
import css from "./style.module.css";
import Shadow from "../General/Shadow";

const SideBar = (props) => {
  let classes = [css.SideBar, css.Close];

  if (props.showSideBar) {
    classes = [css.SideBar, css.Open];
  }

  return (
    <>
      <Shadow show={props.showSideBar} darahad={props.toggleSideBar} />

      <div className={classes.join(" ")}>
        <div className={css.LogoLayout}>
          <Logo />
        </div>
        <Menu />
      </div>
    </>
  );
};

export default SideBar;
