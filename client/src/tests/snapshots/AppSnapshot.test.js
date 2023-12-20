import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MockIntersectionObserver } from "../mocks/mockClasses";
import mockInitialState, { mockStore } from "../mocks/mockReduxState";
import App from "../../App";

test("App snapshot", () => {
  global.IntersectionObserver = MockIntersectionObserver;
  const { asFragment } = render(
    <Provider store={mockStore(mockInitialState)}>
      <App />
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot("App");
});
