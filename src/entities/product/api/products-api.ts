import { baseApi } from '@/shared/api/base-api';
import type { PagedResponse, Product } from '@/shared/types';
export const productsApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getProducts: b.query<PagedResponse<Product>, { page?: number; search?: string }>({
      query: (params) => ({ url: 'products', params }),
      providesTags: ['Products'],
    }),
    getProduct: b.query<Product, string>({
      query: (id) => `products/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Products', id }],
    }),
    updateProduct: b.mutation<Product, Partial<Product> & { id: string }>({
      query: ({ id, ...body }) => ({ url: `products/${id}`, method: 'PATCH', body }),
      invalidatesTags: ['Products'],
    }),
  }),
});
export const { useGetProductsQuery, useGetProductQuery, useUpdateProductMutation } = productsApi;
