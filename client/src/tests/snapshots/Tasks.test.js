import { render } from "test-utilities/test-utils";
import { tasksSample } from "constants/sampleData";
import Tasks from "components/Tasks/Tasks";
import mockInitialState, {
  mockStore,
} from "test-utilities/mocks/mockReduxState";

const mockFn = jest.fn();

test("Tasks snapshot", () => {
  const { asFragment } = render(
    <Tasks
      errorDuringFetch={null}
      isTransitioning={false}
      loadMore={false}
      tasks={tasksSample}
      loadingRef={null}
      handleTryAgain={mockFn}
    />,
    {
      props: { store: mockStore(mockInitialState) },
    }
  );

  expect(asFragment()).toMatchSnapshot("Tasks");
});
