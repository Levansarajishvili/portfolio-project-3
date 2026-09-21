import { profile } from '@/data/profile.js';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || '';

/** 'endpoint' when a form service is configured, otherwise the visitor's email app. */
export const DELIVERY = ENDPOINT ? 'endpoint' : 'mailto';

export async function sendMessage({ name, email, message }, { timeoutMs = 15000 } = {}) {
  const subject = `Portfolio message from ${name}`;

  if (!ENDPOINT) {
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return { via: 'mailto' };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ name, email, message, _replyto: email, _subject: subject }),
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Contact endpoint responded with ${response.status}`);
    return { via: 'endpoint' };
  } finally {
    clearTimeout(timer);
  }
}
