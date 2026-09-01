'use client';
import { useParams } from 'next/navigation';
import { Card, CardContent, Typography, Stack, Divider } from '@mui/material';
import { useGetCustomerQuery } from '@/entities/customer/api/customers-api';
import { formatMoney, formatDate } from '@/shared/lib/format';
import { LoadingState, ErrorState } from '@/shared/ui/states';
export default function CustomerPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetCustomerQuery(id);
  if (isLoading) return <LoadingState />;
  if (isError || !data) return <ErrorState />;
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={800}>
          {data.name}
        </Typography>
        <Typography color="text.secondary">
          {data.email} · {data.phone}
        </Typography>
        <Stack spacing={1} sx={{ my: 3 }}>
          <Typography>Город: {data.city}</Typography>
          <Typography>Заказов: {data.ordersCount}</Typography>
          <Typography>Общая сумма: {formatMoney(data.total)}</Typography>
          <Typography>Средний чек: {formatMoney(data.average)}</Typography>
          <Typography>Последний заказ: {formatDate(data.lastOrder)}</Typography>
        </Stack>
        <Divider />
        <Typography sx={{ mt: 2 }} fontWeight={700}>
          История заказов
        </Typography>
        <Typography color="text.secondary">Детали заказов доступны в разделе «Заказы».</Typography>
      </CardContent>
    </Card>
  );
}
