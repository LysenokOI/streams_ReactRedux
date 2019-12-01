import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form"; // 227
import authReducer from "./authReducer";
import streamReducer from "./streamReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer, // required form
  streams: streamReducer
});
