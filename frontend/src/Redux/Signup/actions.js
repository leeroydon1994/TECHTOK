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

//   body.JSON.stringify(email, password, name)

  export function signupUserThunk(user) {
    console.log("link before backend");
    return (dispatch) => {
      return axios
        .post(`http://localhost:8080/api/signup`, user)
        //`${process.env.REACT_APP_API_SERVER}/api/signup`
        .then((res) => {
          console.log("coming from the backend");
            console.log(res);
            dispatch(signupSuccessActionCreator(user));
        });
    };
}