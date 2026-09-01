import { baseApi } from '@/shared/api/base-api';
import type { Order, OrderStatus, PagedResponse } from '@/shared/types';
export interface OrderParams {
  search?: string;
  status?: string;
  city?: string;
  sort?: string;
  page?: number;
}
export const ordersApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getOrders: b.query<PagedResponse<Order>, OrderParams>({
      query: (params) => ({ url: 'orders', params }),
      providesTags: ['Orders'],
    }),
    getOrder: b.query<Order, string>({
      query: (id) => `orders/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Orders', id }],
    }),
    updateOrder: b.mutation<Order, { id: string; status: OrderStatus }>({
      query: ({ id, ...body }) => ({ url: `orders/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['Orders'],
    }),
  }),
});
export const { useGetOrdersQuery, useGetOrderQuery, useUpdateOrderMutation } = ordersApi;
