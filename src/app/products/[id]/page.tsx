'use client';
import { useParams } from 'next/navigation';
import { Card, CardContent, Typography, Stack, TextField, Button, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetProductQuery, useUpdateProductMutation } from '@/entities/product/api/products-api';
import { formatMoney } from '@/shared/lib/format';
import { LoadingState, ErrorState } from '@/shared/ui/states';
const schema = z.object({
  name: z.string().min(3, 'Минимум 3 символа'),
  price: z.number().positive('Цена должна быть больше 0'),
  stock: z.number().int().nonnegative(),
});
type FormValues = z.infer<typeof schema>;
export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useGetProductQuery(id);
  const [update, { isSuccess }] = useUpdateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    values: data ? { name: data.name, price: data.price, stock: data.stock } : undefined,
  });
  if (isLoading) return <LoadingState />;
  if (isError || !data) return <ErrorState />;
  return (
    <Card sx={{ maxWidth: 700 }}>
      <CardContent>
        <Typography variant="h5" fontWeight={800}>
          {data.name}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {data.category} · {formatMoney(data.price)}
        </Typography>
        <form onSubmit={handleSubmit((v) => update({ id, ...v }))}>
          <Stack spacing={2}>
            <TextField
              label="Название"
              {...register('name')}
              error={Boolean(errors.name)}
              helperText={errors.name?.message}
            />
            <TextField
              label="Цена, ₽"
              type="number"
              {...register('price', { valueAsNumber: true })}
              error={Boolean(errors.price)}
              helperText={errors.price?.message}
            />
            <TextField
              label="Остаток"
              type="number"
              {...register('stock', { valueAsNumber: true })}
              error={Boolean(errors.stock)}
              helperText={errors.stock?.message}
            />
            <Button type="submit" variant="contained">
              Сохранить товар
            </Button>
            {isSuccess && <Alert severity="success">Товар обновлён</Alert>}
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
