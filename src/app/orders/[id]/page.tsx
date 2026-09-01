'use client';
import { useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  MenuItem,
  Select,
} from '@mui/material';
import { useGetOrderQuery, useUpdateOrderMutation } from '@/entities/order/api/orders-api';
import { formatMoney, formatDate, statusLabels, paymentLabels } from '@/shared/lib/format';
import { LoadingState, ErrorState } from '@/shared/ui/states';
export default function OrderPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetOrderQuery(id);
  const [update] = useUpdateOrderMutation();
  if (isLoading) return <LoadingState />;
  if (isError || !data) return <ErrorState />;
  return (
    <Card sx={{ maxWidth: 820 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={800}>
          {data.id}
        </Typography>
        <Typography color="text.secondary">Создан {formatDate(data.date)}</Typography>
        <Stack spacing={1.5} sx={{ my: 3 }}>
          <Typography>
            <b>Клиент:</b> {data.customer} · {data.city}
          </Typography>
          <Typography>
            <b>Адрес:</b> {data.address}
          </Typography>
          <Typography>
            <b>Оплата:</b> {paymentLabels[data.payment]}
          </Typography>
          {data.items.map((i) => (
            <Stack direction="row" justifyContent="space-between" key={i.productId}>
              <span>
                {i.name} × {i.quantity}
              </span>
              <b>{formatMoney(i.price * i.quantity)}</b>
            </Stack>
          ))}
          <Typography variant="h6">Итого: {formatMoney(data.amount)}</Typography>
          <Select
            size="small"
            value={data.status}
            onChange={(e) => update({ id: data.id, status: e.target.value as typeof data.status })}
          >
            {Object.entries(statusLabels).map(([v, l]) => (
              <MenuItem key={v} value={v}>
                {l}
              </MenuItem>
            ))}
          </Select>
          <Chip label={statusLabels[data.status]} />
        </Stack>
        <Button href="/orders">← К списку заказов</Button>
      </CardContent>
    </Card>
  );
}
