import alertReducer from "../../redux/reducers/alertReducer";

describe("alertReducer", () => {
  it("should return initial state ", () => {
    const initialState = {
      message: "",
    };
    const action = {};
    const nextState = alertReducer(initialState, action);
    expect(nextState.message).toEqual("");
  });

  it("should return new alert message", () => {
    const initialState = {
      message: "",
    };
    const action = { type: "ALERT", payload: "NEW ALERT" };
    const nextState = alertReducer(initialState, action);
    expect(nextState.message).toEqual("NEW ALERT");
  });

  it("should clear alert message", () => {
    const initialState = {
      message: "ALERT",
    };
    const action = { type: "CLEAR_ALERT" };
    const nextState = alertReducer(initialState, action);
    expect(nextState.message).toEqual("");
  });
});
