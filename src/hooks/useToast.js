import { use } from 'react';
import { ToastContext } from '@/context/toast-context.js';

export function useToast() {
  const context = use(ToastContext);
  if (!context) throw new Error('useToast must be used inside <ToastProvider>');
  return context;
}
