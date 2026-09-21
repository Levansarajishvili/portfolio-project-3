import { useCallback, useMemo, useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { ToastContext } from '@/context/toast-context.js';
import { usePreferences } from '@/hooks/usePreferences.js';
import { cn } from '@/lib/utils.js';

let nextId = 0;

/** Accessible toasts (Radix): announced by screen readers, swipe or Esc to dismiss. */
export function ToastProvider({ children }) {
  const { copy } = usePreferences();
  const [toasts, setToasts] = useState([]);

  const notify = useCallback(({ title, description, variant = 'success' }) => {
    nextId += 1;
    const id = nextId;
    setToasts((list) => [...list, { id, title, description, variant }]);
  }, []);

  const dismiss = useCallback((id) => setToasts((list) => list.filter((toast) => toast.id !== id)), []);
  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext value={value}>
      <Toast.Provider swipeDirection="right" duration={7000} label={copy.toast.region}>
        {children}
        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            type={toast.variant === 'error' ? 'foreground' : 'background'}
            onOpenChange={(open) => {
              if (!open) dismiss(toast.id);
            }}
            className={cn(
              'relative border-[1.5px] border-l-[5px] border-ink bg-land py-3.5 pl-4 pr-10 text-ink shadow-[6px_6px_0_-1.5px_var(--color-sea),6px_6px_0_0_var(--color-ink)]',
              toast.variant === 'error' ? 'border-l-danger' : 'border-l-route-end',
            )}
          >
            <Toast.Title className="font-semibold leading-snug">{toast.title}</Toast.Title>
            {toast.description && (
              <Toast.Description className="mt-1 text-[15px] leading-normal text-ink-2">
                {toast.description}
              </Toast.Description>
            )}
            <Toast.Close
              aria-label={copy.toast.close}
              className="absolute right-2.5 top-2.5 grid size-7 place-items-center rounded-md text-ink-2 hover:bg-ink/10 hover:text-ink"
            >
              <X size={16} aria-hidden="true" />
            </Toast.Close>
          </Toast.Root>
        ))}
        <Toast.Viewport className="fixed bottom-0 right-0 z-[100] m-0 flex w-full max-w-[420px] list-none flex-col gap-3 p-5 outline-none" />
      </Toast.Provider>
    </ToastContext>
  );
}
