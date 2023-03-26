export const validateName = (name: string) => !/[A-Z][a-z]{2,}/.test(name);

export const validateDob = (date: string) => {
  try {
    if (date === '') return true;
    const dateDiff = Date.now() - new Date(date).getTime();
    return dateDiff < 18 * 365 * 24 * 3600000 || dateDiff > 120 * 365 * 24 * 3600000;
  } catch {
    return true;
  }
};

export const validateGender = (gender: string) => !['Male', 'Female'].includes(gender);

export const validateLang = (lang: string) => !['Russian', 'English'].includes(lang);
