/**
 * Email Validator - Shared Business Logic
 * Framework-agnostic validation functions
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateEmailInput = (email) => {
  const errors = [];

  if (!email || !email.trim()) {
    errors.push('Email address is required');
  } else if (!validateEmail(email)) {
    errors.push('Please enter a valid email address');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
