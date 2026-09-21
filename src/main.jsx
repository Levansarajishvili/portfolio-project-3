import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/standard.css';
import '@fontsource-variable/archivo/standard-italic.css';
import '@fontsource-variable/noto-sans-georgian/standard.css';
import './index.css';
import App from './App.jsx';
import { PreferencesProvider } from '@/context/PreferencesProvider.jsx';
import { ToastProvider } from '@/components/ui/ToastProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreferencesProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </PreferencesProvider>
  </StrictMode>,
);
