'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Stack, Typography, IconButton, Avatar, Divider, Tooltip } from '@mui/material';
import {
  Dashboard,
  Analytics,
  ShoppingCart,
  Inventory2,
  People,
  Settings,
  LightMode,
  DarkMode,
} from '@mui/icons-material';
import { useUiStore } from '@/features/theme-switcher/store';
const nav = [
  ['/dashboard', 'Обзор', Dashboard],
  ['/analytics', 'Аналитика', Analytics],
  ['/orders', 'Заказы', ShoppingCart],
  ['/products', 'Товары', Inventory2],
  ['/customers', 'Клиенты', People],
  ['/settings', 'Настройки', Settings],
] as const;
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { mode, toggleMode } = useUiStore();
  return (
    <>
      <aside className="sidebar">
        <Stack spacing={3}>
          <Typography variant="h6" color="white" sx={{ px: 1, fontWeight: 800 }}>
            S<span className="brand-text">everMarket</span>
          </Typography>
          <Divider sx={{ borderColor: '#2d3854' }} />
          <Box>
            {nav.map(([href, label, Icon]) => (
              <Link href={href} key={href}>
                <Box className={`nav-item ${pathname.startsWith(href) ? 'active' : ''}`}>
                  <Icon fontSize="small" />
                  <span className="nav-label">{label}</span>
                </Box>
              </Link>
            ))}
          </Box>
        </Stack>
      </aside>
      <main className="app-main">
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Панель управления / {nav.find((x) => pathname.startsWith(x[0]))?.[1] ?? 'Страница'}
            </Typography>
            <Typography variant="h4" fontWeight={800}>
              {nav.find((x) => pathname.startsWith(x[0]))?.[1] ?? 'Страница'}
            </Typography>
          </Box>
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Переключить тему">
              <IconButton onClick={toggleMode}>
                {mode === 'light' ? <DarkMode /> : <LightMode />}
              </IconButton>
            </Tooltip>
            <Avatar sx={{ bgcolor: '#5b6cff' }}>А</Avatar>
          </Stack>
        </Stack>
        {children}
      </main>
    </>
  );
}
