import { Providers } from './providers/providers';
import type { Metadata } from 'next';
import { AppShell } from '@/widgets/app-shell/app-shell';
import './styles.css';
export const metadata: Metadata = {
  title: 'SeverMarket Analytics',
  description: 'Демонстрационная аналитическая платформа SeverMarket',
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
