import { validateDob, validateGender, validateLang, validateName } from './validate';

describe('Validators', () => {
  it('should validate lang', () => {
    expect(validateLang('English')).toBeFalsy();
    expect(validateLang('Russian')).toBeFalsy();
    expect(validateLang('Finnish')).toBeTruthy();
  });

  it('should validate dob', () => {
    const underDate = new Date(Date.now() - 18 * 365 * 24 * 3600000 + 24 * 3600000)
      .toISOString()
      .slice(0, 10);
    const overDate = new Date(Date.now() - 120 * 365 * 24 * 3600000 - 24 * 3600000)
      .toISOString()
      .slice(0, 10);
    const properDate = new Date(Date.now() - 20 * 365 * 24 * 3600000).toISOString().slice(0, 10);
    expect(validateDob('')).toBeTruthy();
    expect(validateDob('some wrong date')).toBeTruthy();
    expect(validateDob(underDate)).toBeTruthy();
    expect(validateDob(overDate)).toBeTruthy();
    expect(validateDob(properDate)).toBeFalsy();
  });

  it('should validate gender', () => {
    expect(validateGender('Male')).toBeFalsy();
    expect(validateGender('Female')).toBeFalsy();
    expect(validateGender('Other')).toBeTruthy();
  });

  it('should validate name', () => {
    expect(validateName('lowercase')).toBeTruthy();
    expect(validateName('Ken')).toBeFalsy();
  });
});
