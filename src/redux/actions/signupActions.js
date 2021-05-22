import axios from "axios";

export const signupUser = (email, password) => {
  return function (dispatch) {
    dispatch(signupUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAa6dROc8mD9D3gAToK4UGflnyzAKgReII",
        data
      )
      .then((result) => {
        console.log(result);
        const userId = result.data.localId;
        const token = result.data.idToken;

        dispatch(signupUserSuccess(userId, token));

        //Local Storage ruu hadgalna
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
      })
      .catch((error) => {
        console.log(error.response.data.error);

        dispatch(signupUserError(error.response.data.error));
      });
  };
};

export const signupUserStart = () => {
  return {
    type: "SIGNUP_USER_START",
  };
};

export const signupUserSuccess = (userId, token) => {
  return {
    type: "SIGNUP_USER_SUCCESS",
    userId,
    token,
  };
};

export const signupUserError = (error) => {
  return {
    type: "SIGNUP_USER_ERROR",
    error,
  };
};
