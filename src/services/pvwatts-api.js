import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrls, PVWATTS_API_KEY } from 'app/api'

export const pvwattsApi = createApi({
  reducerPath: 'pvwattsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: baseUrls.pvwatts,
    prepareHeaders(headers) {
      headers.set('Accept', 'Application/Json')
      headers.set('Content-Type', 'Application/Json')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getFuels: builder.query({
      query: (limit=20) => `/v1.json?limit=${limit}&api_key=${PVWATTS_API_KEY}`,
    }),
  }),
})

export const {
  useGetFuelsQuery,
} = pvwattsApi