import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrls, WEATHER_API_KEY } from 'app/api'


export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: apiUrls.weather,
    prepareHeaders(headers) {
      headers.set('Accept', 'Application/Json')
      headers.set('Content-Type', 'Application/Json')
      headers.set('X-Api-Key', `${WEATHER_API_KEY}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getWeather: builder.query({
      query: (query="Manila") => `?key=${WEATHER_API_KEY}&q=${query}`,
    }),
  }),
})


export const {
  useGetWeatherQuery,
} = weatherApi
