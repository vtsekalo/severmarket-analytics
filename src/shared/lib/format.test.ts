import { describe, expect, it } from 'vitest';
import { formatMoney } from './format';
describe('formatMoney', () => {
  it('formats RUB', () => expect(formatMoney(4280)).toContain('4\u00a0280'));
});
