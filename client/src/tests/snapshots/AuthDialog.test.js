import { render } from "test-utilities/test-utils";
import mockInitialState, {
  mockStore,
} from "test-utilities/mocks/mockReduxState";
import AuthDialog from "components/Auth/AuthDialog";

test("AuthDialog snapshot", () => {
  const { asFragment } = render(
    <AuthDialog handleCloseAuthDialog={jest.fn()} />,
    {
      props: { store: mockStore(mockInitialState) },
    }
  );

  expect(asFragment()).toMatchSnapshot("AuthDialog");
});
