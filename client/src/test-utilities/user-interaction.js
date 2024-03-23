import { fireEvent, screen } from "./test-utils";

const clickByText = (text) => fireEvent.click(screen.getByText(text));
const clickByTitle = (title) => fireEvent.click(screen.getByTitle(title));
const clickByTestId = (title) => fireEvent.click(screen.getByTestId(title));

const changeByLabelText = (label, value) => {
  const input = screen.getByLabelText(label);
  fireEvent.change(input, { target: { value } });
  return input;
};

const changeByTestId = (id, value) => {
  const input = screen.getByTestId(id);
  fireEvent.change(input, { target: { value } });
  return input;
};

const pressKeyboardButton = (container, buttonName) => {
  fireEvent.keyDown(container, { key: buttonName });
};

const pressEnter = (container) => {
  pressKeyboardButton(container, "Enter");
};

const pressEscape = (container) => {
  pressKeyboardButton(container, "Escape");
};

export {
  clickByText,
  clickByTitle,
  clickByTestId,
  changeByTestId,
  changeByLabelText,
  pressEnter,
  pressEscape,
};
