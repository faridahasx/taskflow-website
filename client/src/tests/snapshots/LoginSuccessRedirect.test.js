import { render } from "test-utilities/test-utils";
import { useNavigate } from "react-router-dom";
import mockInitialState, {
  mockStore,
} from "test-utilities/mocks/mockReduxState";
import LoginSuccessRedirect from "pages/LoginSuccessRedirect";

test("LoginSuccessRedirect snapshot", () => {
  useNavigate.mockReturnValue(jest.fn());

  const { asFragment } = render(<LoginSuccessRedirect />, {
    props: { store: mockStore(mockInitialState) },
  });
  expect(asFragment()).toMatchSnapshot("LoginSuccessRedirect");
});
