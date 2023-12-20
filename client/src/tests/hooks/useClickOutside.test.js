import { renderHook } from "@testing-library/react-hooks";
import useClickOutside from '../../hooks/useClickOutside';

test('useClickOutside calls the callback when clicking outside the element', () => {
  const callback = jest.fn();
  const { result } = renderHook(() => useClickOutside(callback));

  // Create a DOM element and attach it to the ref
  const element = document.createElement('div');
  document.body.appendChild(element);
  result.current.current = element;

  // Trigger a click event on an element outside the ref
  const outsideElement = document.createElement('div');
  document.body.appendChild(outsideElement);

  const event = new MouseEvent('mousedown', { bubbles: true });
  outsideElement.dispatchEvent(event);

  // Assert that the callback was called
  expect(callback).toHaveBeenCalled();

  // Clean up
  document.body.removeChild(element);
  document.body.removeChild(outsideElement);
});