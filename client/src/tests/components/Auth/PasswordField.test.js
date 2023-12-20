import { fireEvent, render, screen } from "@testing-library/react";
import PasswordField from "../../../components/Auth/PasswordField";

test("PasswordField: handles toggle password visibility", () => {
  render(<PasswordField handleInputChange={jest.fn()} />);
  const inputField = screen.getByLabelText("Password:");
  const toggleButton = screen.getByRole("button");

  expect(inputField).toHaveAttribute("type", "password");
  fireEvent.click(toggleButton);
  expect(inputField).toHaveAttribute("type", "text");
  fireEvent.click(toggleButton);
  expect(inputField).toHaveAttribute("type", "password");
});
