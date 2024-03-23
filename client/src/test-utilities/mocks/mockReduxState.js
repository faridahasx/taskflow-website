import createMockStore from "redux-mock-store";

const mockStore = createMockStore([]);

const mockInitialState = {
  auth: { isLogged: null },
  alert: { message: "" },
  categories: [],
};

const mockAuthState = {
  ...mockInitialState,
  auth: { isLogged: true },
};

export { mockAuthState, mockStore };

export default mockInitialState;
