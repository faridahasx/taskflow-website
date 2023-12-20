import { render } from "@testing-library/react";
import Filters from "../../components/Filters/Filters";
import { categoriesSample } from "../../constants/sampleData";

const mockFn = jest.fn();

test("Filters snapshot", () => {
  const { asFragment } = render(
    <Filters
      handleClose={mockFn}
      handleSubmit={mockFn}
      setSelectedCategories={mockFn}
      setStartgte={mockFn}
      setStartlte={mockFn}
      setFinishgte={mockFn}
      setFinishlte={mockFn}
      handleRadioGroupChange={mockFn}
      handleClear={mockFn}
      categories={categoriesSample}
    />
  );
  expect(asFragment()).toMatchSnapshot("Filters");
});
