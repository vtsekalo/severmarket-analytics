export const formatMoney = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);
export const formatDate = (value: string) =>
  new Intl.DateTimeFormat('ru-RU').format(new Date(value));
export const statusLabels = {
  new: 'Новый',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
  returned: 'Возврат',
} as const;
export const paymentLabels = {
  card: 'Банковская карта',
  sbp: 'СБП',
  cash: 'При получении',
} as const;
