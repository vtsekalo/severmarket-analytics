'use client';
import { Card, CardContent, Typography, Box, Stack, Chip } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { useGetDashboardQuery } from '@/entities/analytics/api/analytics-api';
import { formatMoney } from '@/shared/lib/format';
import { LoadingState, ErrorState } from '@/shared/ui/states';
export default function DashboardPage() {
  const { data, isLoading, isError } = useGetDashboardQuery();
  if (isLoading) return <LoadingState />;
  if (isError || !data) return <ErrorState />;
  const cards = [
    ['Выручка', formatMoney(data.kpis.revenue), 'revenue'],
    ['Заказы', data.kpis.orders.toLocaleString('ru-RU'), 'orders'],
    ['Клиенты', data.kpis.customers.toLocaleString('ru-RU'), 'customers'],
    ['Средний чек', formatMoney(data.kpis.average), 'average'],
  ] as const;
  return (
    <>
      <Box className="kpi-grid">
        {cards.map(([label, value, key]) => (
          <Card key={label}>
            <CardContent>
              <Typography color="text.secondary">{label}</Typography>
              <Typography variant="h5" fontWeight={800} sx={{ my: 1 }}>
                {value}
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Chip
                  size="small"
                  color={data.kpis.changes[key] >= 0 ? 'success' : 'error'}
                  icon={data.kpis.changes[key] >= 0 ? <TrendingUp /> : <TrendingDown />}
                  label={`${data.kpis.changes[key] > 0 ? '+' : ''}${data.kpis.changes[key]}%`}
                />
                <Typography variant="caption" color="text.secondary">
                  к прошлому месяцу
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Box className="content-grid">
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={700}>
              Динамика выручки
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Последние 12 месяцев
            </Typography>
            <ResponsiveContainer width="100%" height={310}>
              <LineChart data={data.revenue}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" />
                <YAxis tickFormatter={(v: number) => `${Math.round(v / 1000000)}м`} />
                <Tooltip formatter={(v) => formatMoney(Number(v))} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#5b6cff"
                  strokeWidth={3}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h6" fontWeight={700}>
              Статусы заказов
            </Typography>
            <ResponsiveContainer width="100%" height={310}>
              <LineChart data={data.orderStats}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#20b486" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Продажи по регионам
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
              gap: 1,
              mt: 2,
            }}
          >
            {data.regions.slice(0, 8).map((r) => (
              <Box key={r.city} sx={{ p: 1.5, bgcolor: 'action.hover', borderRadius: 2 }}>
                <Typography fontWeight={600}>{r.city}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {r.orders.toLocaleString('ru-RU')} заказов
                </Typography>
                <Typography fontWeight={700}>{formatMoney(r.revenue)}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
}
