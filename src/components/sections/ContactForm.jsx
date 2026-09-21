import { useReducer, useRef } from 'react';
import { Button } from '@/components/ui/Button.jsx';
import { FormField } from '@/components/ui/FormField.jsx';
import { profile } from '@/data/profile.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { useToast } from '@/hooks/useToast.js';
import { DELIVERY, sendMessage } from '@/lib/send-message.js';
import { FORM_FIELDS, LIMITS, validateField, validateForm } from '@/lib/validation.js';
import { cn } from '@/lib/utils.js';

const EMPTY = { name: '', email: '', message: '', company: '' };
const INITIAL_STATE = { values: EMPTY, errors: {}, touched: {}, status: 'idle' };

/**
 * status: idle -> submitting -> idle. Errors are stored as codes and translated
 * at render time, so switching the language also translates visible errors.
 */
function formReducer(state, action) {
  switch (action.type) {
    case 'change': {
      const values = { ...state.values, [action.field]: action.value };
      const errors = state.touched[action.field]
        ? { ...state.errors, [action.field]: validateField(action.field, action.value) }
        : state.errors;
      return { ...state, values, errors };
    }
    case 'blur': {
      // Don't nag about empty fields on blur; "required" is reported on submit.
      const value = state.values[action.field];
      return {
        ...state,
        touched: { ...state.touched, [action.field]: true },
        errors: { ...state.errors, [action.field]: value.trim() ? validateField(action.field, value) : null },
      };
    }
    case 'invalid':
      return { ...state, errors: action.errors, touched: { name: true, email: true, message: true } };
    case 'submitting':
      return { ...state, status: 'submitting' };
    case 'sent':
      return INITIAL_STATE;
    case 'handed-off':
    case 'failed':
      return { ...state, status: 'idle' };
    default:
      return state;
  }
}

const fieldClass =
  'w-full rounded-[4px] border-[1.5px] border-field-line bg-field px-3.5 py-3 text-base text-ink placeholder:text-ink-2/70 transition-colors focus:border-ink aria-[invalid=true]:border-danger';

export function ContactForm() {
  const { copy } = usePreferences();
  const { notify } = useToast();
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);
  const formRef = useRef(null);
  const text = copy.contact.form;
  const { values, errors, status } = state;
  const submitting = status === 'submitting';

  const bind = (field) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange: (event) => dispatch({ type: 'change', field, value: event.target.value }),
    onBlur: () => dispatch({ type: 'blur', field }),
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': errors[field] ? `contact-${field}-error` : undefined,
  });

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    // Honeypot: real people never see this field, bots fill it in.
    if (values.company) {
      dispatch({ type: 'sent' });
      return;
    }

    const found = validateForm(values);
    if (Object.keys(found).length) {
      dispatch({ type: 'invalid', errors: found });
      const first = FORM_FIELDS.find((field) => found[field]);
      formRef.current?.elements.namedItem(first)?.focus();
      return;
    }

    dispatch({ type: 'submitting' });
    const payload = { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() };
    try {
      const { via } = await sendMessage(payload);
      if (via === 'mailto') {
        dispatch({ type: 'handed-off' });
        notify({ title: text.toast.mailtoTitle, description: text.toast.mailtoBody(profile.email) });
      } else {
        dispatch({ type: 'sent' });
        notify({ title: text.toast.successTitle, description: text.toast.successBody(payload.email) });
      }
    } catch {
      dispatch({ type: 'failed' });
      notify({ variant: 'error', title: text.toast.errorTitle, description: text.toast.errorBody(profile.email) });
    }
  }

  const messageLength = values.message.trim().length;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-label={text.label}
      className="flex flex-col gap-[18px] border-[1.5px] border-ink bg-land px-[18px] py-5 shadow-[5px_5px_0_-1.5px_var(--color-sea),5px_5px_0_0_var(--color-ink)] md:px-[30px] md:pb-[26px] md:pt-7 md:shadow-[8px_8px_0_-1.5px_var(--color-sea),8px_8px_0_0_var(--color-ink)]"
    >
      <div className="grid gap-[18px] md:grid-cols-2">
        <FormField id="contact-name" label={text.name} error={errors.name && text.errors[errors.name]}>
          <input {...bind('name')} type="text" autoComplete="name" placeholder={text.placeholders.name} className={fieldClass} />
        </FormField>
        <FormField id="contact-email" label={text.email} error={errors.email && text.errors[errors.email]}>
          <input
            {...bind('email')}
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder={text.placeholders.email}
            className={fieldClass}
          />
        </FormField>
      </div>

      <FormField
        id="contact-message"
        label={text.message}
        error={errors.message && text.errors[errors.message]}
        meta={messageLength > 0 ? `${messageLength}/${LIMITS.messageMax}` : null}
      >
        <textarea {...bind('message')} rows={5} placeholder={text.placeholders.message} className={cn(fieldClass, 'resize-y')} />
      </FormField>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">{text.honeypot}</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => dispatch({ type: 'change', field: 'company', value: event.target.value })}
        />
      </div>

      <div className="mt-1 flex flex-col items-stretch gap-[18px] md:flex-row md:items-center">
        <Button type="submit" disabled={submitting} aria-busy={submitting}>
          {submitting ? text.sending : text.send}
        </Button>
        <span className="text-sm text-ink-2">{text.note[DELIVERY]}</span>
      </div>
    </form>
  );
}
