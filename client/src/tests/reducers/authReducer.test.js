import authReducer from "../../redux/reducers/authReducer";

describe("authReducer", () => {
  it("should return initial state ", () => {
    const initialState = {
      isLogged: null,
    };

    const action = {};
    const nextState = authReducer(initialState, action);
    expect(nextState.isLogged).toBeNull();
  });

  it("isLogged should be true", () => {
    const initialState = {
      isLogged: false,
    };

    const action = { type: "IS_LOGGED", payload: true };
    const nextState = authReducer(initialState, action);
    expect(nextState.isLogged).toBeTruthy();
  });
});
