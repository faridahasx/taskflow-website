import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import categories from "./categoryReducer";

export default combineReducers({
  alert,
  auth,
  categories,
});
