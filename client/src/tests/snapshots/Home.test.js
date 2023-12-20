import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Home from "../../pages/Home";
import mockInitialState, { mockStore } from "../mocks/mockReduxState";


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
