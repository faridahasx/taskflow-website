import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import App from "../../App";
import { MockIntersectionObserver } from "../mocks/mockClasses";
import mockInitialState, { mockStore } from "../mocks/mockReduxState";

test("App snapshot", () => {
  global.IntersectionObserver = MockIntersectionObserver;
  const { asFragment } = render(
    <Provider store={mockStore(mockInitialState)}>
      <App />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot("App");
});
