import { configureStore } from '@reduxjs/toolkit'
import { coinsApi } from 'services/coins-api'
import { pvwattsApi } from 'services/pvwatts-api'
import { weatherApi } from 'services/weather-api'

export const store = configureStore({
  reducer: {
    [coinsApi.reducerPath]: coinsApi.reducer,
    [pvwattsApi.reducerPath]: pvwattsApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(coinsApi.middleware)
    .concat(pvwattsApi.middleware)
    .concat(weatherApi.middleware)
    
})
