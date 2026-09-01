'use client';
import Link from 'next/link';
import { useState } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Pagination,
  Stack,
  Typography,
  Chip,
} from '@mui/material';
import { useGetOrdersQuery } from '@/entities/order/api/orders-api';
import { useGetProductsQuery } from '@/entities/product/api/products-api';
import { useGetCustomersQuery } from '@/entities/customer/api/customers-api';
import { formatMoney, formatDate, statusLabels, paymentLabels } from '@/shared/lib/format';
import { LoadingState, ErrorState, EmptyState } from '@/shared/ui/states';
export function OrdersTable() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetOrdersQuery({ search, page });
  if (isLoading) return <LoadingState />;
  if (isError || !data) return <ErrorState />;
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Заказы
          </Typography>
          <TextField
            size="small"
            placeholder="Поиск заказа или клиента"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Stack>
        {!data.data.length ? (
          <EmptyState />
        ) : (
          <div className="table-wrap">
            <Table>
              <TableHead>
                <TableRow>
                  {['Номер', 'Клиент', 'Город', 'Сумма', 'Статус', 'Дата', 'Оплата'].map((x) => (
                    <TableCell key={x}>{x}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.data.map((o) => (
                  <TableRow hover key={o.id}>
                    <TableCell>
                      <Link href={`/orders/${o.id}`}>
                        <Typography color="primary" fontWeight={600}>
                          {o.id}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell>{o.customer}</TableCell>
                    <TableCell>{o.city}</TableCell>
                    <TableCell>{formatMoney(o.amount)}</TableCell>
                    <TableCell>
                      <Chip size="small" label={statusLabels[o.status]} />
                    </TableCell>
                    <TableCell>{formatDate(o.date)}</TableCell>
                    <TableCell>{paymentLabels[o.payment]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
        <Pagination
          sx={{ mt: 2 }}
          count={Math.ceil(data.total / data.pageSize)}
          page={page}
          onChange={(_, v) => setPage(v)}
        />
      </CardContent>
    </Card>
  );
}
export function ProductsTable() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetProductsQuery({ search, page });
  if (isLoading) return <LoadingState />;
  if (isError || !data) return <ErrorState />;
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Каталог товаров
          </Typography>
          <TextField
            size="small"
            placeholder="Поиск товара"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Stack>
        <div className="table-wrap">
          <Table>
            <TableHead>
              <TableRow>
                {['Название', 'Категория', 'Цена', 'Продажи', 'Выручка', 'Остаток', 'Рейтинг'].map(
                  (x) => (
                    <TableCell key={x}>{x}</TableCell>
                  ),
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((p) => (
                <TableRow hover key={p.id}>
                  <TableCell>
                    <Link href={`/products/${p.id}`}>
                      <Typography color="primary" fontWeight={600}>
                        {p.name}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{formatMoney(p.price)}</TableCell>
                  <TableCell>{p.sales.toLocaleString('ru-RU')}</TableCell>
                  <TableCell>{formatMoney(p.revenue)}</TableCell>
                  <TableCell>{p.stock}</TableCell>
                  <TableCell>★ {p.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          sx={{ mt: 2 }}
          count={Math.ceil(data.total / data.pageSize)}
          page={page}
          onChange={(_, v) => setPage(v)}
        />
      </CardContent>
    </Card>
  );
}
export function CustomersTable() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetCustomersQuery({ search, page });
  if (isLoading) return <LoadingState />;
  if (isError || !data) return <ErrorState />;
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Клиенты
          </Typography>
          <TextField
            size="small"
            placeholder="Поиск по имени или городу"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </Stack>
        <div className="table-wrap">
          <Table>
            <TableHead>
              <TableRow>
                {[
                  'Имя',
                  'Город',
                  'Заказов',
                  'Общая сумма',
                  'Средний чек',
                  'Последний заказ',
                  'Статус',
                ].map((x) => (
                  <TableCell key={x}>{x}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.data.map((c) => (
                <TableRow hover key={c.id}>
                  <TableCell>
                    <Link href={`/customers/${c.id}`}>
                      <Typography color="primary" fontWeight={600}>
                        {c.name}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>{c.city}</TableCell>
                  <TableCell>{c.ordersCount}</TableCell>
                  <TableCell>{formatMoney(c.total)}</TableCell>
                  <TableCell>{formatMoney(c.average)}</TableCell>
                  <TableCell>{formatDate(c.lastOrder)}</TableCell>
                  <TableCell>
                    <Chip
                      size="small"
                      label={
                        c.status === 'risk'
                          ? 'Требует внимания'
                          : c.status === 'regular'
                            ? 'Постоянный'
                            : 'Активный'
                      }
                      color={c.status === 'risk' ? 'warning' : 'success'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          sx={{ mt: 2 }}
          count={Math.ceil(data.total / data.pageSize)}
          page={page}
          onChange={(_, v) => setPage(v)}
        />
      </CardContent>
    </Card>
  );
}
