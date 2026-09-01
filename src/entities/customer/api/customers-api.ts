import { baseApi } from '@/shared/api/base-api';
import type { Customer, PagedResponse } from '@/shared/types';
export const customersApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getCustomers: b.query<PagedResponse<Customer>, { page?: number; search?: string }>({
      query: (params) => ({ url: 'customers', params }),
      providesTags: ['Customers'],
    }),
    getCustomer: b.query<Customer, string>({ query: (id) => `customers/${id}` }),
  }),
});
export const { useGetCustomersQuery, useGetCustomerQuery } = customersApi;
