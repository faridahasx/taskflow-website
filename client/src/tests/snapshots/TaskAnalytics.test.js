import { render } from "test-utilities/test-utils";
import mockInitialState, {
  mockStore,
} from "test-utilities/mocks/mockReduxState";
import TaskAnalytics from "pages/TaskAnalytics";

test("TaskAnalytics snapshot", () => {
  const { asFragment } = render(<TaskAnalytics />, {
    props: { store: mockStore(mockInitialState) },
  });
  expect(asFragment()).toMatchSnapshot("TaskAnalytics");
});
