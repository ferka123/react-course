export const validateDob = (date: string) => {
  if (isNaN(Date.parse(date))) return false;
  const dateDiff = Date.now() - new Date(date).getTime();
  return dateDiff > 18 * 365 * 24 * 3600000 && dateDiff < 120 * 365 * 24 * 3600000;
};
