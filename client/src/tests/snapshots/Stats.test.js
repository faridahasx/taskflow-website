import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockInitialState, { mockStore } from "../mocks/mockReduxState";
import Stats from "../../pages/Stats";

test("Stats snapshot", () => {
  const { asFragment } = render(
    <Provider store={mockStore(mockInitialState)}>
      <BrowserRouter>
        <Stats />
      </BrowserRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot("Stats");
});
