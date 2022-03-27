import { configureStore } from '@reduxjs/toolkit'
import postReducer from '../features/post/postSlice'
import userReducer from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
})

export type appDispatch = typeof store.dispatch

export type rootState = ReturnType<typeof store.getState>
