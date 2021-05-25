import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Button from "../../components/General/Button";
import css from "./style.module.css";
import Spinner from "../../components/General/Spinner";
import * as actions from "../../redux/actions/signupActions";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isError, setIsError] = useState(false);

  const signup = () => {
    if (password1 === password2) {
      setIsError(false);
      props.signupUser(email, password1);
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={css.Signup}>
      {props.userId && <Redirect to="/" />}
      {/* Email : {email} | {password1} |{" "}
        {password2} */}
      <h1>Бүртгэлийн форм</h1>
      <div>Та өөрийн мэдээлэлээ оруулна уу</div>
      {props.saving ? (
        <Spinner />
      ) : (
        <div>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email хаяг"
          />
          <input
            onChange={(e) => setPassword1(e.target.value)}
            type="password"
            placeholder="Нууц үгээ оруулна уу"
          />
          <input
            onChange={(e) => setPassword2(e.target.value)}
            type="password"
            placeholder="Нууц үгээ давтан оруулна уу"
          />
          {isError && (
            <div style={{ color: "red" }}>
              Нууц үгүүд хоорондоо тарахгүй байна
            </div>
          )}
          <div style={{ color: "red" }}>
            {props.firebaseError &&
              `Бүртгэх үйлдэлд алдаа гарлаа : #${props.firebaseErrorCode} - ${props.firebaseError} `}
          </div>
          <Button clicked={signup} text="БҮРТГҮҮЛЭХ" btnType="Success" />
        </div>
      )}
    </div>
  );
};

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
