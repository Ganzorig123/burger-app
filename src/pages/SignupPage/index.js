import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import Spinner from "../../components/General/Spinner";
import * as actions from "../../redux/actions/signupActions";

class Signup extends Component {
  state = {
    email: "",
    password1: "",
    password2: "",
    isError: false,
  };

  signup = () => {
    const data = {
      email: this.state.email,
      password: this.state.password1,
    };

    if (this.state.password1 === this.state.password2) {
      this.setState({ isError: false });
      this.props.signupUser(this.state.email, this.state.password1);
    } else {
      this.setState({ isError: true });
    }
  };

  changeEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  changePassword1 = (event) => {
    this.setState({ password1: event.target.value });
  };

  changePassword2 = (event) => {
    this.setState({ password2: event.target.value });
  };

  render() {
    return (
      <div className={css.Signup}>
        {this.props.userId && <Redirect to="/" />}
        {/* Email : {this.state.email} | {this.state.password1} |{" "}
        {this.state.password2} */}
        <h1>Бүртгэлийн форм</h1>
        <div>Та өөрийн мэдээлэлээ оруулна уу</div>
        {this.props.saving ? (
          <Spinner />
        ) : (
          <div>
            <input
              onChange={this.changeEmail}
              type="text"
              placeholder="Email хаяг"
            />
            <input
              onChange={this.changePassword1}
              type="password"
              placeholder="Нууц үгээ оруулна уу"
            />
            <input
              onChange={this.changePassword2}
              type="password"
              placeholder="Нууц үгээ давтан оруулна уу"
            />
            {this.state.isError && (
              <div style={{ color: "red" }}>
                Нууц үгүүд хоорондоо тарахгүй байна
              </div>
            )}
            <div style={{ color: "red" }}>
              {this.props.firebaseError &&
                `Бүртгэх үйлдэлд алдаа гарлаа : #${this.props.firebaseErrorCode} - ${this.props.firebaseError} `}
            </div>
            <Button clicked={this.signup} text="БҮРТГҮҮЛЭХ" btnType="Success" />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    saving: state.loginSignupReducer.saving,
    userId: state.loginSignupReducer.userId,
    firebaseError: state.loginSignupReducer.firebaseError,
    firebaseErrorCode: state.loginSignupReducer.firebaseErrorCode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signupUser: (email, password) =>
      dispatch(actions.signupUser(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
