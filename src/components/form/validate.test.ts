import { validateDob } from './validate';

describe('Validators', () => {
  it('should validate dob', () => {
    const underDate = new Date(Date.now() - 18 * 365 * 24 * 3600000 + 24 * 3600000)
      .toISOString()
      .slice(0, 10);
    const overDate = new Date(Date.now() - 120 * 365 * 24 * 3600000 - 24 * 3600000)
      .toISOString()
      .slice(0, 10);
    const properDate = new Date(Date.now() - 20 * 365 * 24 * 3600000).toISOString().slice(0, 10);
    expect(validateDob('')).toBeFalsy();
    expect(validateDob('some wrong date')).toBeFalsy();
    expect(validateDob(underDate)).toBeFalsy();
    expect(validateDob(overDate)).toBeFalsy();
    expect(validateDob(properDate)).toBeTruthy();
  });
});
