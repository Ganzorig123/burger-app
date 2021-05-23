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
        const expiresIn = result.data.expiresIn;
        const expireDate = new Date(new Date().getTime() + expiresIn * 1000);
        const refreshToken = result.data.refreshToken;

        //Local Storage ruu hadgalna
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        localStorage.setItem("expireDate", expireDate);
        localStorage.setItem("refreshToken", refreshToken);

        dispatch(loginUserSuccess(userId, token));
        dispatch(autoLogoutAfterMillSec(expiresIn * 1000));
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
  localStorage.removeItem("expireDate");
  localStorage.removeItem("refreshToken");

  return {
    type: "LOGOUT",
  };
};

export const autoLogoutAfterMillSec = (ms) => {
  return function (dispatch) {
    // Token shinechleh
    // const data = {
    //   grant_type: "refresh_token",
    //   refresh_token: localStorage.getItem("refreshToken"),
    // };
    // axios
    //   .post(
    //     "https://securetoken.googleapis.com/v1/token?key=AIzaSyAa6dROc8mD9D3gAToK4UGflnyzAKgReII",
    //     data
    //   )
    //   .then((result) => {
    //     console.log(result);
    //     const userId = result.data.localId;
    //     const token = result.data.idToken;
    //     const expiresIn = result.data.expiresIn;
    //     const expireDate = new Date(new Date().getTime() + expiresIn * 1000);

    //     //Local Storage ruu hadgalna
    //     localStorage.setItem("userId", userId);
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("expireDate", expireDate);

    //     dispatch(loginUserSuccess(userId, token));
    //   })
    //   .catch((error) => {
    //     console.log(error.response.data.error);
    //     dispatch(loginUserError(error.response.data.error));
    //   });

    //automat Log out
    setTimeout(() => {
      dispatch(logout);
    }, ms);
  };
};
