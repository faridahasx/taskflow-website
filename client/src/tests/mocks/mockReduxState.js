import createMockStore from "redux-mock-store";

const mockStore = createMockStore([]);

const mockInitialState = {
  auth: { isLogged: false },
  authDialog: { displayAuthDialog: null },
  displayAuthDialog: null,
  alert: { message: "" },
  categories: [{ title: "All", _id: "All", tasks: 0 }],
};

const mockAuthState = {
  ...mockInitialState,
  auth: { isLogged: true },
};

export { mockAuthState, mockStore };

export default mockInitialState;
