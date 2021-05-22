import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../redux/actions/loginActions";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  render() {
    this.props.logout();
    return <Redirect to={"/login"} />;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};
export default connect(null, mapDispatchToProps)(Logout);
