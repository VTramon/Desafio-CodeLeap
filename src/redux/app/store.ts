import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type appDispatch = typeof store.dispatch

export type rootState = ReturnType<typeof store.getState>
