export const LIMITS = { nameMin: 2, messageMin: 10, messageMax: 2000 };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returns an error code (translated in the i18n files) or null. */
export function validateField(field, rawValue) {
  const value = rawValue.trim();
  switch (field) {
    case 'name':
      if (!value) return 'nameRequired';
      if (value.length < LIMITS.nameMin) return 'nameShort';
      return null;
    case 'email':
      if (!value) return 'emailRequired';
      if (!EMAIL_PATTERN.test(value)) return 'emailInvalid';
      return null;
    case 'message':
      if (!value) return 'messageRequired';
      if (value.length < LIMITS.messageMin) return 'messageShort';
      if (value.length > LIMITS.messageMax) return 'messageLong';
      return null;
    default:
      return null;
  }
}

export const FORM_FIELDS = ['name', 'email', 'message'];

export function validateForm(values) {
  return FORM_FIELDS.reduce((errors, field) => {
    const error = validateField(field, values[field]);
    return error ? { ...errors, [field]: error } : errors;
  }, {});
}
