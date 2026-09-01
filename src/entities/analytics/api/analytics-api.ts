import { baseApi } from '@/shared/api/base-api';
import type { AnalyticsPoint, DashboardData, RegionStat } from '@/shared/types';
export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (b) => ({
    getDashboard: b.query<DashboardData, void>({
      query: () => 'dashboard',
      providesTags: ['Analytics'],
    }),
    getAnalytics: b.query<
      { series: AnalyticsPoint[]; categories: { name: string; value: number }[] },
      string | void
    >({ query: (range) => ({ url: 'analytics', params: { range } }) }),
    getRegions: b.query<RegionStat[], void>({ query: () => 'regions' }),
  }),
});
export const { useGetDashboardQuery, useGetAnalyticsQuery, useGetRegionsQuery } = analyticsApi;
