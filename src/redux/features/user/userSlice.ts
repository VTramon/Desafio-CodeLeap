import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type userState = {
  username?: string
  id?: number
}

const initialState: userState = {
  username: undefined,
  id: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp(state, action: PayloadAction<userState>) {
      state.username = action.payload.username
      state.id = action.payload.id
    },
  },
})

export const { signUp } = userSlice.actions

export default userSlice.reducer
