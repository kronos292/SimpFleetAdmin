import { combineReducers } from "redux";
import fetchReducer from "./fetchReducer";
import errorReducer from "./errorReducer";
export default combineReducers({
  auth: fetchReducer,
  errors: errorReducer
});
