import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import logger from "redux-logger";
import thunk from "redux-thunk";

import { authReducer } from "./Auth/reducers";
import { blogReducer } from "./Blog/reducers";
import { signupReducer } from "./Signup/reducers";

/* sign up */

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  authStore: authReducer,
  blogStore: blogReducer,
  signupStore: signupReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);
