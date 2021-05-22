import axios from "axios";

export const loginUser = (email, password) => {
  return function (dispatch) {
    dispatch(loginUserStart());

    const data = {
      email,
      password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAa6dROc8mD9D3gAToK4UGflnyzAKgReII",
        data
      )
      .then((result) => {
        console.log(result);
        const userId = result.data.localId;
        const token = result.data.idToken;

        dispatch(loginUserSuccess(userId, token));

        //Local Storage ruu hadgalna
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        dispatch(loginUserError(error.response.data.error));
      });
  };
};

export const loginUserStart = () => {
  return {
    type: "LOGIN_USER_START",
  };
};

export const loginUserSuccess = (userId, token) => {
  return {
    type: "LOGIN_USER_SUCCESS",
    userId,
    token,
  };
};

export const loginUserError = (error) => {
  return {
    type: "LOGIN_USER_ERROR",
    error,
  };
};

export const logout = () => {
  //Local Storage ruu hadgalna
  localStorage.removeItem("userId");
  localStorage.removeItem("token");

  return {
    type: "LOGOUT",
  };
};
