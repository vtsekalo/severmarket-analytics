export type OrderStatus = 'new' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
export type PaymentMethod = 'card' | 'sbp' | 'cash';
export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}
export interface Order {
  id: string;
  customerId: string;
  customer: string;
  city: string;
  amount: number;
  status: OrderStatus;
  date: string;
  deliveryDate: string | null;
  payment: PaymentMethod;
  address: string;
  items: OrderItem[];
}
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sales: number;
  revenue: number;
  stock: number;
  rating: number;
  description: string;
  history: { month: string; sales: number }[];
}
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  total: number;
  average: number;
  lastOrder: string;
  status: 'active' | 'regular' | 'risk';
}
export interface RegionStat {
  city: string;
  orders: number;
  revenue: number;
  average: number;
}
export interface AnalyticsPoint {
  label: string;
  revenue: number;
  orders: number;
  average: number;
}
export interface DashboardData {
  kpis: {
    revenue: number;
    orders: number;
    customers: number;
    average: number;
    changes: Record<string, number>;
  };
  revenue: AnalyticsPoint[];
  orderStats: { name: string; value: number }[];
  regions: RegionStat[];
}
export interface PagedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}
