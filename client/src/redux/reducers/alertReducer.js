import ACTIONS from "../actions";

const alert = {
  message: "",
};

const alertReducer = (state = alert, action) => {
  switch (action.type) {
    case ACTIONS.ALERT:
      return {
        ...state,
        message: action.payload,
      };
    case ACTIONS.CLEAR_ALERT:
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
};

export default alertReducer;
