export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidNumber(number) {
  return !/[^.[0-9]]*/.test(number);
}
