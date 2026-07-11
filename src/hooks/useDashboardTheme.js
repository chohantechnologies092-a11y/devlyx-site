import { useState, useEffect } from 'react';

const THEME_KEY = 'devlyx_dashboard_theme';

export const useDashboardTheme = () => {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem(THEME_KEY) === 'dark';
  });

  useEffect(() => {
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
  }, [dark]);

  const toggle = () => setDark(d => !d);

  // Theme tokens
  const t = dark ? {
    bg: '#0f0f14',
    sidebar: '#16161e',
    card: '#1e1e2a',
    cardBorder: '#2a2a3a',
    text: '#f1f1f5',
    textMuted: '#6b7280',
    textSub: '#9ca3af',
    hover: '#ffffff12',
    active: '#6a35ff',
    input: '#1e1e2a',
    inputBorder: '#2a2a3a',
  } : {
    bg: '#f8f9fc',
    sidebar: '#ffffff',
    card: '#ffffff',
    cardBorder: '#f3f4f6',
    text: '#111827',
    textMuted: '#9ca3af',
    textSub: '#6b7280',
    hover: '#00000006',
    active: '#6a35ff',
    input: '#f9fafb',
    inputBorder: '#f3f4f6',
  };

  return { dark, toggle, t };
};
