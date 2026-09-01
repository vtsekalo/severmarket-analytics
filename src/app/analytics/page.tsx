'use client';
import { Card, CardContent, Typography, Box } from '@mui/material';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
} from 'recharts';
import { useGetAnalyticsQuery } from '@/entities/analytics/api/analytics-api';
import { formatMoney } from '@/shared/lib/format';
import { LoadingState, ErrorState } from '@/shared/ui/states';
export default function AnalyticsPage() {
  const { data, isLoading, isError } = useGetAnalyticsQuery();
  if (isLoading) return <LoadingState />;
  if (isError || !data) return <ErrorState />;
  return (
    <Box className="content-grid">
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Выручка по месяцам
          </Typography>
          <ResponsiveContainer width="100%" height={330}>
            <LineChart data={data.series}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip formatter={(v) => formatMoney(Number(v))} />
              <Line dataKey="revenue" stroke="#5b6cff" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={700}>
            Продажи по категориям
          </Typography>
          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={data.categories}>
              <XAxis dataKey="name" angle={-25} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip formatter={(v) => formatMoney(Number(v))} />
              <Bar dataKey="value" fill="#20b486" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
