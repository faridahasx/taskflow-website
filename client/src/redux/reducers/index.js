import { combineReducers } from "redux";
import alert from "./alertReducer";
import auth from "./authReducer";
import authDialog from "./authDialogReducer";
import categories from "./categoryReducer";

export default combineReducers({
  alert,
  auth,
  authDialog,
  categories,
});
