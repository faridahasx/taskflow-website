import { renderHook } from "test-utilities/test-utils";
import useBodyOverflowHidden from "hooks/useBodyOverflowHidden";

test('useBodyOverflowHidden: should add and remove the class "overflow-hidden" from body element', () => {
  const { unmount } = renderHook(() => useBodyOverflowHidden());

  // Assert that the class "overflow-hidden" is added to the body
  expect(document.body.classList.contains("overflow-hidden")).toBe(true);

  // Unmount the hook
  unmount();

  // Assert that the class "overflow-hidden" is removed from the body
  expect(document.body.classList.contains("overflow-hidden")).toBe(false);
});
