import { profile } from "@/data/profile.js";

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT?.trim() || "";

/** 'endpoint' when a form service is configured, otherwise the visitor's email app. */
export const DELIVERY = ENDPOINT ? "endpoint" : "mailto";

/** Reads the reason a form service (e.g. Formspree) gives for a failed submission, if any. */
async function readError(response) {
  try {
    const data = await response.json();
    const details = data?.errors
      ?.map((error) => error.message)
      .filter(Boolean)
      .join("; ");
    return details || data?.error || "";
  } catch {
    return "";
  }
}

export async function sendMessage(
  { name, email, message },
  { timeoutMs = 15000 } = {},
) {
  const subject = `Portfolio message from ${name}`;

  if (!ENDPOINT) {
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    return { via: "mailto" };
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _replyto: email,
        _subject: subject,
      }),
      signal: controller.signal,
    });
    if (!response.ok) {
      const reason = await readError(response);
      throw new Error(
        `Contact endpoint responded with ${response.status}${reason ? `: ${reason}` : ""}`,
      );
    }
    return { via: "endpoint" };
  } catch (error) {
    // The visitor sees a friendly toast; the real reason goes to the browser console (F12).
    console.error("[contact form]", error);
    throw error;
  } finally {
    clearTimeout(timer);
  }
}
