import {
    SIGNUP_SUCCESS_ACTION,
    SIGNUP_FAILURE_ACTION,
    // SIGNUP_FETCH_USER_ACTION,
  } from "./actions";

  const initialState = {
    user: [],
  };

export function signupReducer(state = initialState, action) {
    switch(action.type) {
        case SIGNUP_SUCCESS_ACTION:
            return {
                payload: action.payload,
            };
        case SIGNUP_FAILURE_ACTION:
            return {            
            };
        default:
            return {
                state
            };
    }
}