import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';

import useForm from './hook';

test('should change keyword', () => {
  const { result } = renderHook(() => useForm());
  act(() => {
    result.current.updateKeyword('batman');
  });
  expect(result.current.keyword).toBe('batman');
});
test('should use initialvalues', () => {
  const { result } = renderHook(() =>
    useForm({
      initialKeyword: 'matrix',
    })
  );
  expect(result.current.keyword).toBe('matrix');
});
test('should use initialvalues and changes it', () => {
  const { result } = renderHook(() =>
    useForm({
      initialKeyword: 'matrix',
    })
  );
  act(() => {
    result.current.updateKeyword('bat');
    result.current.updateKeyword('batman');
  });
  expect(result.current.keyword).toBe('batman');
  expect(result.current.times).toBe(2);
});
