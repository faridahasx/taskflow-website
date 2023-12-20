import ACTIONS from "../actions";

const auth = {
  isLogged: null,
};

const authReducer = (state = auth, action) => {
  switch (action.type) {
    case ACTIONS.IS_LOGGED:
      return {
        ...state,
        isLogged: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
