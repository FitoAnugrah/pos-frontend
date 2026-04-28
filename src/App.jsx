import React from 'react';
import AppLayout from './components/layout/AppLayout';
import AppRoutes from './routes/AppRoutes';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      </LanguageProvider>
    </ThemeProvider>
  );
}
