'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { makeStore, AppStore } from '@/store';
import { useUiStore } from '@/features/theme-switcher/store';
function Theme({ children }: { children: React.ReactNode }) {
  const mode = useUiStore((s) => s.mode);
  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode,
          primary: { main: '#5b6cff' },
          background: {
            default: mode === 'dark' ? '#0b1020' : '#f5f7fb',
            paper: mode === 'dark' ? '#12192b' : '#fff',
          },
        },
        shape: { borderRadius: 12 },
        typography: { fontFamily: 'Inter,Arial,sans-serif' },
      })}
    >
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
export function Providers({ children }: { children: React.ReactNode }) {
  const store = useRef<AppStore | null>(null);
  if (!store.current) store.current = makeStore();
  return (
    <Provider store={store.current}>
      <Theme>{children}</Theme>
    </Provider>
  );
}
