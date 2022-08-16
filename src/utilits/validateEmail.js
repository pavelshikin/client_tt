export const validateEmail = email => {
  const re = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};
