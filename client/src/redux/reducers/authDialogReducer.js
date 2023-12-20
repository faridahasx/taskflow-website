import ACTIONS from "../actions";

const authDialog = {
  displayAuthDialog: null,
};

const authDialogReducer = (state = authDialog, action) => {
  switch (action.type) {
    case ACTIONS.AUTH_DIALOG:
      return {
        ...state,
        displayAuthDialog: action.payload,
      };
    default:
      return state;
  }
};

export default authDialogReducer;
