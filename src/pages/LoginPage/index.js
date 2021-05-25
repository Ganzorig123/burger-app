import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import Spinner from "../../components/General/Spinner";
import * as actions from "../../redux/actions/loginActions";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    setEmail(email);
    setPassword(password);

    props.loginUser(email, password);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);
  };

  const changePassword = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className={css.Login}>
      {props.userId && <Redirect to="/" />}

      {/* Email : {state.email} | {state.password} */}
      <div style={{ color: "red" }}>
        {props.firebaseError &&
          `Нэвтрэх үеийн алдаа : #${props.firebaseErrorCode} - ${props.firebaseError} `}
      </div>
      {props.logginIn ? (
        <Spinner />
      ) : (
        <div>
          <input onChange={changeEmail} type="text" placeholder="Email хаяг" />
          <input
            onChange={changePassword}
            type="password"
            placeholder="Нууц үг"
          />
          <Button clicked={login} text="НЭВТРЭХ" btnType="Success" />
        </div>
      )}
    </div>
  );
};

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
