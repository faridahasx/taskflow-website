import { fireEvent, screen } from "@testing-library/react";

const { getByText, getByLabelText, getByTitle } = screen;

const clickByText = (text) => fireEvent.click(getByText(text));
const clickByTitle = (title) => fireEvent.click(getByTitle(title));
const clickByTestId = (title) => fireEvent.click(getByTitle(title));

const changeByLabelText = (label, value) => {
  const input = getByLabelText(label);
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
  changeByLabelText,
  pressEnter,
  pressEscape,
};
