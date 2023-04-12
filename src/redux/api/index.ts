import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../types/api';

export const BASE_URL = 'https://mock-server-api-hcqxe00fv-jik789.vercel.app';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}`,
  }),
  endpoints: (builder) => ({
    searchProduct: builder.query<Product[], string>({
      query(q) {
        return {
          url: '/catalog',
          params: { q },
        };
      },
    }),
    getProductById: builder.query<Product, number>({
      query(id) {
        return {
          url: `/catalog/${id}`,
        };
      },
    }),
  }),
});

export const { useSearchProductQuery, useGetProductByIdQuery } = api;
