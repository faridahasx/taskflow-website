import { render } from "@testing-library/react";
import Sort from "../../components/Sort/Sort";

const mockFn = jest.fn();

test("Sort snapshot", () => {
  const { asFragment } = render(
    <Sort handleClose={mockFn} handleSorting={mockFn} sortValue={""} />
  );
  expect(asFragment()).toMatchSnapshot("Sort");
});
