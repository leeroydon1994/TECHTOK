import axios from "axios";

export const SIGNUP_SUCCESS_ACTION = "SIGNUP_SUCCESS_ACTION";
export const SIGNUP_FAILURE_ACTION = "SIGNUP_FAILURE_ACTION";

export function signupSuccessActionCreator(user) {
  return {
    type: SIGNUP_SUCCESS_ACTION,
    payload: user,
  };
}

export function signupFailureActionCreator(message) {
  return {
    type: SIGNUP_FAILURE_ACTION,
    message: message,
  };
}

export function signupUserThunk(user) {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_SERVER}/api/signup`, user)
      .then((res) => {
        dispatch(signupSuccessActionCreator(user));
      });
  };
}
