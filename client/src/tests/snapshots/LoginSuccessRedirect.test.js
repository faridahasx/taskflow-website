import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import mockInitialState, { mockStore } from "../mocks/mockReduxState";
import LoginSuccessRedirect from "../../pages/LoginSuccessRedirect";

test("LoginSuccessRedirect snapshot", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <Provider store={mockStore(mockInitialState)}>
        <LoginSuccessRedirect />
      </Provider>
    </BrowserRouter>
  );
  expect(asFragment()).toMatchSnapshot("LoginSuccessRedirect");
});
