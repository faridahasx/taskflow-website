import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockInitialState, { mockStore } from "../mocks/mockReduxState";
import Home from "../../pages/Home";

test("Home snapshot", () => {
  const { asFragment } = render(
    <Provider store={mockStore(mockInitialState)}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot("Home");
});
