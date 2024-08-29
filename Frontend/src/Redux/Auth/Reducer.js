// Reducer.js
import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  REQUEST_RESET_PASSWORD_SUCCESS,
  REQUEST_RESET_PASSWORD_FAILURE,
} from "./ActionType";

const initialValue = {
  signup: null,
  signin: null,
  forgot: null,
  error: null,
};

export const AuthReducer = (store = initialValue, { type, payload }) => {
  switch (type) {
    case SIGN_IN_SUCCESS:
      return { ...store, signin: payload, error: null };
    case SIGN_IN_FAILURE:
      return { ...store, signin: null, error: payload };
    case SIGN_UP_SUCCESS:
      return { ...store, signup: payload, error: null };
    case SIGN_UP_FAILURE:
      return { ...store, signup: null, error: payload };
    case REQUEST_RESET_PASSWORD_SUCCESS:
      return { ...store, forgot: payload, error: null };
    case REQUEST_RESET_PASSWORD_FAILURE:
      return { ...store, forgot: null, error: payload };
    default:
      return store;
  }
};
