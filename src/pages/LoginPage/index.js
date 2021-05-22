import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import Spinner from "../../components/General/Spinner";
import * as actions from "../../redux/actions/loginActions";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  login = () => {
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(this.state.email, this.state.password);
  };

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  changePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className={css.Login}>
        {this.props.userId && <Redirect to="/" />}

        {/* Email : {this.state.email} | {this.state.password} */}
        <div style={{ color: "red" }}>
          {this.props.firebaseError &&
            `Нэвтрэх үеийн алдаа : #${this.props.firebaseErrorCode} - ${this.props.firebaseError} `}
        </div>
        {this.props.logginIn ? (
          <Spinner />
        ) : (
          <div>
            <input
              onChange={this.changeEmail}
              type="text"
              placeholder="Email хаяг"
            />
            <input
              onChange={this.changePassword}
              type="password"
              placeholder="Нууц үг"
            />
            <Button clicked={this.login} text="НЭВТРЭХ" btnType="Success" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    logginIn: state.loginSignupReducer.logginIn,
    userId: state.loginSignupReducer.userId,
    firebaseError: state.loginSignupReducer.firebaseError,
    firebaseErrorCode: state.loginSignupReducer.firebaseErrorCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (email, password) =>
      dispatch(actions.loginUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
