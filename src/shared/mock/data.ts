import type {
  AnalyticsPoint,
  Customer,
  DashboardData,
  Order,
  OrderStatus,
  PaymentMethod,
  Product,
  RegionStat,
} from '@/shared/types';
const cities = [
  'Москва',
  'Санкт-Петербург',
  'Казань',
  'Екатеринбург',
  'Новосибирск',
  'Краснодар',
  'Нижний Новгород',
  'Ростов-на-Дону',
  'Самара',
  'Уфа',
  'Воронеж',
  'Челябинск',
  'Пермь',
  'Омск',
  'Красноярск',
  'Тюмень',
  'Минск',
  'Алматы',
  'Астана',
];
const first = [
  'Александр',
  'Максим',
  'Анна',
  'Екатерина',
  'Михаил',
  'Мария',
  'Дмитрий',
  'Ольга',
  'Сергей',
  'Наталья',
  'Иван',
  'Алина',
];
const last = [
  'Иванов',
  'Петров',
  'Смирнов',
  'Волкова',
  'Соколов',
  'Кузнецова',
  'Попов',
  'Морозова',
  'Лебедев',
  'Новикова',
];
const categories = [
  'Электроника',
  'Бытовая техника',
  'Дом',
  'Красота',
  'Спорт',
  'Одежда',
  'Аксессуары',
];
const nouns = [
  'Умная колонка',
  'Робот-пылесос',
  'Кофемашина',
  'Настольная лампа',
  'Фитнес-браслет',
  'Электрочайник',
  'Рюкзак',
  'Наушники',
  'Увлажнитель',
  'Термокружка',
];
const rnd = (n: number, min: number, max: number) =>
  Math.floor(((Math.sin(n * 999) + 1) / 2) * (max - min + 1)) + min;
export const products: Product[] = Array.from({ length: 64 }, (_, i) => {
  const sales = rnd(i + 1, 28, 910);
  const price = rnd(i + 2, 790, 89990);
  return {
    id: `PRD-${String(i + 1).padStart(4, '0')}`,
    name: `${nouns[i % nouns.length]} ${['Север', 'Нева', 'Тайга', 'Волга'][i % 4]} ${i + 1}`,
    category: categories[i % categories.length],
    price,
    sales,
    revenue: price * sales,
    stock: rnd(i + 4, 0, 340),
    rating: Number((3.8 + rnd(i + 5, 0, 12) / 10).toFixed(1)),
    description:
      'Практичный товар для повседневного использования. Характеристики и комплектация представлены в демонстрационных целях.',
    history: ['Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август'].map((month, j) => ({
      month,
      sales: rnd(i * 7 + j, 12, 150),
    })),
  };
});
export const customers: Customer[] = Array.from({ length: 138 }, (_, i) => {
  const name = `${first[i % first.length]} ${last[(i * 3) % last.length]}`;
  const count = rnd(i + 8, 1, 34);
  const total = rnd(i + 9, 3500, 286000);
  return {
    id: `CUS-${String(i + 1).padStart(4, '0')}`,
    name,
    email: `client${i + 1}@example.ru`,
    phone: `+7 (9${rnd(i, 10, 99)}) ${rnd(i + 1, 100, 999)}-${rnd(i + 2, 10, 99)}-${rnd(i + 3, 10, 99)}`,
    city: cities[i % cities.length],
    ordersCount: count,
    total,
    average: Math.round(total / count),
    lastOrder: new Date(2026, 7, rnd(i, 1, 28)).toISOString(),
    status: i % 13 === 0 ? 'risk' : i % 3 === 0 ? 'regular' : 'active',
  };
});
const statuses: OrderStatus[] = [
  'new',
  'processing',
  'shipped',
  'delivered',
  'delivered',
  'delivered',
  'cancelled',
  'returned',
];
const payments: PaymentMethod[] = ['card', 'sbp', 'cash'];
export const orders: Order[] = Array.from({ length: 184 }, (_, i) => {
  const c = customers[(i * 7) % customers.length];
  const items = Array.from({ length: rnd(i, 1, 3) }, (_, j) => {
    const p = products[(i * 3 + j) % products.length];
    return { productId: p.id, name: p.name, quantity: rnd(i + j, 1, 3), price: p.price };
  });
  const amount = items.reduce((s, x) => s + x.price * x.quantity, 0);
  const date = new Date(2026, 7 - (i % 7), rnd(i, 1, 28)).toISOString();
  return {
    id: `SM-${String(10482 + i).padStart(6, '0')}`,
    customerId: c.id,
    customer: c.name,
    city: c.city,
    amount,
    status: statuses[i % statuses.length],
    date,
    deliveryDate: i % 4 ? new Date(new Date(date).getTime() + 4 * 86400000).toISOString() : null,
    payment: payments[i % 3],
    address: `${c.city}, ул. Центральная, д. ${rnd(i, 2, 96)}, кв. ${rnd(i + 2, 1, 180)}`,
    items,
  };
});
const months = [
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
];
export const analytics: AnalyticsPoint[] = months.map((label, i) => ({
  label,
  revenue: rnd(i + 40, 58000000, 94000000),
  orders: rnd(i + 50, 13500, 21800),
  average: rnd(i + 60, 3900, 5100),
}));
export const regions: RegionStat[] = cities
  .slice(0, 16)
  .map((city, i) => {
    const count = rnd(i + 20, 250, 4800);
    const revenue = rnd(i + 30, 2400000, 22400000);
    return { city, orders: count, revenue, average: Math.round(revenue / count) };
  })
  .sort((a, b) => b.revenue - a.revenue);
export const dashboard: DashboardData = {
  kpis: {
    revenue: 84520000,
    orders: 19742,
    customers: 124820,
    average: 4280,
    changes: { revenue: 12.4, orders: 8.1, customers: 5.7, average: -1.3 },
  },
  revenue: analytics,
  orderStats: [
    { name: 'Выполненные', value: 14820 },
    { name: 'Отменённые', value: 1034 },
    { name: 'Возвращённые', value: 624 },
    { name: 'В работе', value: 3264 },
  ],
  regions,
};
