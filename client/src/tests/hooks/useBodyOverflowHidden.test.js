import { renderHook } from '@testing-library/react-hooks';
import useBodyOverflowHidden from '../../hooks/useBodyOverflowHidden';

describe('useBodyOverflowHidden', () => {
  it('should add and remove the class "overflow-hidden" to the body', () => {
    const { result, unmount } = renderHook(() => useBodyOverflowHidden());

    // Assert that the class "overflow-hidden" is added to the body
    expect(document.body.classList.contains('overflow-hidden')).toBe(true);

    // Unmount the hook
    unmount();

    // Assert that the class "overflow-hidden" is removed from the body
    expect(document.body.classList.contains('overflow-hidden')).toBe(false);
  });
});