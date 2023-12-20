import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import mockInitialState, { mockStore } from "../mocks/mockReduxState";
import AuthDialog from "../../components/Auth/AuthDialog";

test("AuthDialog snapshot", () => {
  const { asFragment } = render(
    <Provider store={mockStore(mockInitialState)}>
      <AuthDialog handleCloseAuthDialog={jest.fn()} />
    </Provider>
  );

  expect(asFragment()).toMatchSnapshot("AuthDialog");
});
