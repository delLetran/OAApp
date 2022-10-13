import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { apiUrls, X_COINS_API_KEY } from 'app/api'

export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: apiUrls.coins,
    prepareHeaders(headers) {
      headers.set('Accept', 'Application/Json')
      headers.set('Content-Type', 'Application/Json')
      headers.set('X-CoinAPI-Key', `${X_COINS_API_KEY}`)
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCoinsAssets: builder.query({
      query: (filter_asset_id=['BTC', 'USD']) =>
        `/assets??filter_asset_id=${filter_asset_id}`,
    }),
    getCoinsAssetByID: builder.query({
      query: (filter_asset_id="USD") => `/assets?filter_asset_id=${filter_asset_id}`,
    }),
    getExchangerateUSD: builder.query({
      query: () => `/exchangerate/USD`,
    }),
    getQuotesLatest: builder.query({
      query: (limit=10, filter_symbol_id="BITSTAMP_SPOT_BTC_USD") =>
        `/quotes/latest?limit=${limit}&filter_symbol_id=${filter_symbol_id}`,
    }),
    getexchangerate: builder.query({
      query: (asset_id_base="USD", asset_id_quote="USD") =>
        `exchangerate/${asset_id_base}/${asset_id_quote}/history`,
    }),
  }),
})

export const { 
  useGetCoinsAssetsQuery,
  useGetCoinsAssetByIDQuery,
  useGetExchangerateUSDQuery,
  useGetQuotesLatestQuery,
  useGetexchangerateQuery
} = coinsApi