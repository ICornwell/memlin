
import { add } from '../add';

test('add two numbers', () => {
  const result = add(3, 5)
  expect(result).toBe(8);
});
