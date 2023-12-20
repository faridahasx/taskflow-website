import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Stats from "../../pages/Stats";
import mockInitialState, { mockStore } from "../mocks/mockReduxState";

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
