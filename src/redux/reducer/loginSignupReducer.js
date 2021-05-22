const initialState = {
  saving: false,
  logginIn: false,
  firebaseError: null,
  firebaseErrorCode: null,
  token: null,
  userId: null,
};

const loginSignupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGNUP_USER_START":
      return { ...state, saving: true };

    case "SIGNUP_USER_SUCCESS":
      return {
        ...state,
        saving: false,
        firebaseError: null,
        firebaseErrorCode: null,
        token: action.token,
        userId: action.userId,
      };

    case "SIGNUP_USER_ERROR":
      return {
        ...state,
        saving: false,
        firebaseError: action.error.message,
        firebaseErrorCode: action.error.code,
      };

    case "LOGIN_USER_START":
      return { ...state, logginIn: true };

    case "LOGIN_USER_SUCCESS":
      return {
        ...state,
        logginIn: false,
        firebaseError: null,
        firebaseErrorCode: null,
        token: action.token,
        userId: action.userId,
      };

    case "LOGIN_USER_ERROR":
      return {
        ...state,
        logginIn: false,
        firebaseError: action.error.message,
        firebaseErrorCode: action.error.code,
      };

    case "LOGOUT":
      return {
        ...state,
        saving: false,
        logginIn: false,
        firebaseError: null,
        firebaseErrorCode: null,
        token: null,
        userId: null,
      };
    default:
      return state;
  }
};

export default loginSignupReducer;
