import { render } from "test-utilities/test-utils";
import mockInitialState, {
  mockStore,
} from "test-utilities/mocks/mockReduxState";
import Home from "pages/Home";

test("Home snapshot", () => {
  const { asFragment } = render(<Home />, {
    props: { store: mockStore(mockInitialState) },
  });
  expect(asFragment()).toMatchSnapshot("Home");
});
